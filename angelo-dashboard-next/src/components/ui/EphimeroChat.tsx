'use client';

import { useState, useEffect, useRef } from 'react';
import { useWebRTC } from '../../hooks/useWebRTS';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Lock, Smartphone, User, AlertCircle, Send, X } from 'lucide-react';

export const EphimeroChat: React.FC = () => {
  // ... (Tus estados actuales se mantienen igual)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [myId, setMyId] = useState<string | null>(null);
  const [targetName, setTargetName] = useState('');
  const [targetPhone, setTargetPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [inChat, setInChat] = useState(false);
  const [activePeerId, setActivePeerId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [newMessage, setNewMessage] = useState('');


  const pc = useRef<RTCPeerConnection | null>(null);
  const dc = useRef<RTCDataChannel | null>(null);
  const { status, socket, error, incomingSignal, setIncomingSignal, chatReady, setChatReady } = useWebRTC(myId);

  const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },    // Google 1
    { urls: 'stun:stun1.l.google.com:19302' },   // Google 2
    { urls: 'stun:stun.cloudflare.com:3478' },   // Cloudflare
    { urls: 'stun:stun.services.mozilla.com' }   // Mozilla
  ]
};
  const setupDataChannel = (channel: RTCDataChannel) => {
    dc.current = channel;
    channel.onmessage = (e) => {
      setMessages(prev => [...prev, { sender: 'peer', text: e.data }]);
    };
    channel.onopen = () => setInChat(true);
    channel.onclose = () => setInChat(false);
  };

  const initPeerConnection = (remoteId: string) => {
    pc.current = new RTCPeerConnection(configuration);

    pc.current.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.send(JSON.stringify({
          type: 'signal', targetId: remoteId, from: myId,
          data: { type: 'ice-candidate', candidate: event.candidate }
        }));
      }
    };

    return pc.current;
  };

  useEffect(() => {
    if (!incomingSignal || !incomingSignal.data) return;
    const { type, sdp, candidate } = incomingSignal.data;

    const handleSignal = async () => {
      if (type === 'request') {
        // Al recibir request, no hacemos nada hasta que el usuario de click en "Accept"
        return; 
      }
      
      if (type === 'offer') {
        const conn = initPeerConnection(incomingSignal.from);
        setActivePeerId(incomingSignal.from);
        conn.ondatachannel = (e) => setupDataChannel(e.channel);
        await conn.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await conn.createAnswer();
        await conn.setLocalDescription(answer);
        socket?.send(JSON.stringify({
          type: 'signal', targetId: incomingSignal.from, from: myId,
          data: { type: 'answer', sdp: answer }
        }));
      } else if (type === 'answer') {
        await pc.current?.setRemoteDescription(new RTCSessionDescription(sdp));
      } else if (type === 'ice-candidate') {
        await pc.current?.addIceCandidate(new RTCIceCandidate(candidate));
      }
    };

    handleSignal();
  }, [incomingSignal]);

  const generateIdentity = async () => {
    if (!name || !phone) return;
    const cleanPhone = phone.replace(/\D/g, '');
    const cleanName = name.trim().toLowerCase();
    const identityString = `${cleanPhone}:${cleanName}`;
    const msgUint8 = new TextEncoder().encode(identityString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    setMyId(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
  };

  const startConnection = async () => {
    if (!targetName || !targetPhone || !socket) return;
    setIsSearching(true);
    
    const cleanPhone = targetPhone.replace(/\D/g, '');
    const cleanName = targetName.trim().toLowerCase();
    const identityString = `${cleanPhone}:${cleanName}`;
    const msgUint8 = new TextEncoder().encode(identityString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const peerId = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    setActivePeerId(peerId);

    const conn = initPeerConnection(peerId);
    setupDataChannel(conn.createDataChannel("chat"));
    
    const offer = await conn.createOffer();
    await conn.setLocalDescription(offer);

    socket.send(JSON.stringify({
      type: 'signal', from: myId, targetId: peerId,
      data: { type: 'offer', sdp: offer }
    }));
    
    setTimeout(() => setIsSearching(false), 1500);
  };

  const acceptConnection = async () => {
    if (!socket || !incomingSignal) return;
    const { from, data } = incomingSignal;
    if (data.type === 'request') {
        socket.send(JSON.stringify({
            type: 'signal', targetId: from, from: myId,
            data: { type: 'accept-chat' } 
        }));
    }
  };

  const sendMessage = () => {
    if (dc.current?.readyState === 'open' && newMessage.trim()) {
      dc.current.send(newMessage); // ENVÍO DIRECTO P2P
      setMessages(prev => [...prev, { sender: 'me', text: newMessage }]);
      setNewMessage('');
    }
  };

  const terminateChat = () => {
    pc.current?.close();
    setInChat(false);
    setMessages([]);
    setActivePeerId(null);
  };

  return (
    <div className="w-full text-slate-200">
      <AnimatePresence mode="wait">
        {!myId ? (
          <motion.div key="login" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-500" size={16} />
                <input type="text" placeholder="Alias" className="w-full pl-10 pr-4 py-2 bg-slate-950/50 border border-slate-800 rounded-lg focus:border-cyan-500/50 outline-none text-sm transition-all font-mono" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="relative flex items-center group">
                <Smartphone className="absolute left-3 text-slate-500 group-focus-within:text-cyan-500 transition-colors" size={16} />
                <span className="absolute left-9 text-cyan-500 font-mono font-bold select-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>+</span>
                <input type="tel" placeholder="Phone Number" className="w-full pl-14 pr-4 py-2 bg-slate-950/50 border border-slate-800 rounded-lg focus:border-cyan-500/50 outline-none text-sm font-mono transition-all" value={phone} onChange={(e) => {const onlyNums = e.target.value.replace(/\D/g, ''); setPhone(onlyNums); }}/>
              </div>
            </div>
            <button onClick={generateIdentity} className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-lg hover:bg-cyan-400 transition-all">
              <Lock size={14} /> Initialize Secure Tunnel
            </button>
          </motion.div>
        ) : (
          <motion.div key="active" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            {/* Status Bar */}
            <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-lg border border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'connected' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  {status === 'connected' ? 'Signal Active' : 'Connecting...'}
                </span>
              </div>
              <ShieldCheck className="text-cyan-500" size={16} />
            </div>

            <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-lg">
              <span className="text-[9px] text-slate-500 uppercase font-mono">My Fingerprint (SHA-256)</span>
              <p className="text-[10px] font-mono text-cyan-300 break-all leading-tight mt-1 opacity-80">{myId}</p>
            </div>

            <AnimatePresence mode="wait">
             {inChat ? (
                <motion.div 
                    key="chat-box" 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }}
                    className="h-[400px] flex flex-col bg-slate-950/60 border border-slate-800 rounded-lg p-4 backdrop-blur-sm"
                >
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-4">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">Secure_Channel_Active</span>
                    <button onClick={terminateChat} className="text-slate-500 hover:text-red-400 transition-colors">
                        <X size={14}/>
                    </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-3 pr-2 custom-scrollbar">
                    <p className="text-center text-[9px] opacity-50 italic text-slate-500 mb-4">
                        End-to-End Encryption Enabled. No logs stored.
                    </p>

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-3 py-1.5 rounded-lg border ${
                            msg.sender === 'me' 
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-100' 
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}>
                            {msg.text}
                        </div>
                        </div>
                    ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type encrypted message..." 
                        className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs font-mono outline-none focus:border-cyan-500/50 text-slate-200" 
                    />
                    <button 
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-cyan-500 text-black p-2 rounded hover:bg-white transition-colors disabled:opacity-50"
                    >
                        <Send size={14}/>
                    </button>
                    </div>
                </motion.div>
                ) : (
                <motion.div key="radar-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  {status === 'connected' ? (
                    <div className="space-y-4 border-t border-slate-800 pt-6">
                      <AnimatePresence>
                        {incomingSignal && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg mb-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="text-cyan-400 animate-pulse" size={14} />
                              <h4 className="text-[10px] font-mono font-bold uppercase text-white">Incoming Peer Request</h4>
                            </div>
                            <p className="text-[9px] font-mono text-slate-500 break-all mb-3">Origin: {incomingSignal.from}</p>
                            <div className="flex gap-2">
                              <button onClick={acceptConnection} className="flex-1 py-1.5 bg-cyan-500 text-black text-[10px] font-bold uppercase rounded hover:bg-white transition-all">Accept</button>
                              <button onClick={() => setIncomingSignal(null)} className="flex-1 py-1.5 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase rounded hover:bg-red-500/10">Decline</button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="text-cyan-400" size={14} />
                        <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Establish Connection</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="relative flex items-center group">
                            <User className="absolute left-3 text-slate-500 group-focus-within:text-cyan-500/50 transition-colors" size={14} />
                            <input type="text" placeholder="Peer Alias" className="w-full pl-9 pr-3 py-2 bg-slate-950/30 border border-slate-800 rounded focus:border-cyan-500/30 outline-none text-xs font-mono text-slate-300 transition-all" onChange={(e) => setTargetName(e.target.value)} />
                        </div>

                        <div className="relative flex items-center group">
                            <Smartphone className="absolute left-3 text-slate-500 group-focus-within:text-cyan-500/50 transition-colors" size={14} />
                            <span className="absolute left-9 text-cyan-500 font-mono font-bold select-none pointer-events-none text-xs"style={{ top: '50%', transform: 'translateY(-50%)' }}>+</span>
                            <input type="tel" placeholder="Peer Phone" className="w-full pr-3 py-2 bg-slate-950/30 border border-slate-800 rounded focus:border-cyan-500/30 outline-none text-xs font-mono text-slate-300 transition-all" style={{ paddingLeft: '2.75rem' }} value={targetPhone} onChange={(e) => setTargetPhone(e.target.value.replace(/\D/g, ''))} />
                        </div>
                      </div>
                      <AnimatePresence>
                        {error && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-2 rounded">
                            <AlertCircle className="text-red-500" size={12} />
                            <p className="text-[10px] text-red-400 font-mono font-bold uppercase">{error}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button onClick={startConnection} disabled={isSearching} className={`w-full py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all border ${isSearching ? 'border-slate-800 text-slate-600' : 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10'}`}>
                        {isSearching ? 'Scanning Network...' : 'Search & Connect'}
                      </button>
                    </div>
                  ) : (
                    <div className="h-24 flex items-center justify-center border border-dashed border-slate-800 rounded-lg">
                      <p className="text-[10px] text-slate-600 font-mono animate-pulse">Synchronizing with Secure Server...</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};