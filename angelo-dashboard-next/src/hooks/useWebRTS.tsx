import { useEffect, useRef, useState } from 'react';

export const useWebRTC = (myId: string | null) => {
  const socket = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [incomingSignal, setIncomingSignal] = useState<any | null>(null);
  const [chatReady, setChatReady] = useState(false);

  useEffect(() => {
    if (!myId) return;
    const WS_URL = process.env.WS_URL;
    setStatus('connecting');
    
    try {
      socket.current = new WebSocket(WS_URL);

      socket.current.onopen = () => {
        setStatus('connected');
        socket.current?.send(JSON.stringify({ type: 'join', myId: myId }));
      };

      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'error') {
          setError(message.message);
          setTimeout(() => setError(null), 4000);
        }
        
        // Ahora pasamos cualquier señal al componente para que WebRTC la procese
        if (message.type === 'signal' && message.from !== myId) {
          setIncomingSignal(message);
          
          // Mantenemos la lógica de aviso de aceptación
          if (message.data?.type === 'accept-chat') {
            setChatReady(true);
          }
        }
      };

      socket.current.onclose = () => setStatus('disconnected');
    } catch (e) {
      setStatus('disconnected');
    }

    return () => { socket.current?.close(); };
  }, [myId]);

  return { status, socket: socket.current, error, incomingSignal, setIncomingSignal, chatReady, setChatReady };
};