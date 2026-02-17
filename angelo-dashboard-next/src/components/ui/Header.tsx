"use client";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, Github, Linkedin } from "lucide-react";

export const Header = () => {
  return (
    <header className="relative w-full py-12 px-6 border-b border-border-slate overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/10 blur-[120px] rounded-full" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-48 h-48 rounded-full border-4 border-accent-cyan p-1 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <img 
              src="/assets/images/angelo.jpg" // Ensure this exists in your assets!
              alt="Angelo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-2 right-4 bg-accent-green p-1.5 rounded-full border-4 border-background">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        <div className="text-center md:text-left space-y-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white">Angelo [Last Name]</h1>
            <p className="text-2xl text-accent-cyan font-medium mt-1">Senior Full Stack Engineer</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={18}/> Austin, TX</span>
            <span className="bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-xs font-bold border border-accent-green/20">Verified Professional</span>
          </div>

          <div className="flex gap-4 pt-2 justify-center md:justify-start">
            <button className="bg-accent-cyan text-black px-6 py-2 rounded-lg font-bold hover:bg-white transition-colors">Contact Me</button>
            <div className="flex gap-2">
              <a href="#" className="p-2 border border-slate-700 rounded-lg hover:bg-slate-800"><Github size={20}/></a>
              <a href="#" className="p-2 border border-slate-700 rounded-lg hover:bg-slate-800"><Linkedin size={20}/></a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};