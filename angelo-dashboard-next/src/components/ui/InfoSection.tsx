"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info, Terminal } from 'lucide-react';

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    setDisplayedText(""); 

    timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 20); 
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className="font-mono">
      {displayedText}
      <span className="animate-pulse border-r-2 border-cyan-500 ml-1">&nbsp;</span>
    </span>
  );
};

export const InfoSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 border-t border-slate-800/50 pt-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]"
      >
        <Info size={12} />
        {isOpen ? 'Hide System_Specs' : 'View System_Specs'}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={12} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 py-4 border-b border-slate-800/30">
              
              {/* How it works */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-500/50">
                  <Terminal size={10} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Protocol</span>
                </div>
                <div className="text-[11px] font-mono leading-relaxed text-slate-400 min-h-[40px]">
                  <TypewriterText 
                    text="Generate a unique ID by hashing your data. Share it, match it, and chat. When you disconnect, all traces vanish into the digital ether. A digital secret handshake."
                    delay={100}
                  />
                </div>
              </div>

              {/* Technical side */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-500/50">
                  <Terminal size={10} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Architecture</span>
                </div>
                <div className="text-[11px] font-mono leading-relaxed text-slate-400 min-h-[40px]">
                  <TypewriterText 
                    text="WebRTC P2P engine. Java signaling for handshakes. Zero-log policy: data flows between peers, never through our disks."
                    delay={800}
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};