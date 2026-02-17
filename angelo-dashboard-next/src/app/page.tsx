"use client";

import { Skill } from "../components/ui/Skill";
import { Avatar } from "../components/ui/Avatar";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Experience } from "../components/ui/Experience"; // New Component
import { Card } from "../components/ui/Card";
import angeloIcon from "../assets/images/angelo.jpg";
import { motion } from "framer-motion";
import { Award, Layers, Zap, Cloud, Server, Infinity, Globe } from "lucide-react";

export default function HomePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      
      {/* 1. HERO HEADER: Bigger Face, Memorable Impact */}
      <header className="flex flex-col md:flex-row items-center gap-8 py-10 border-b border-slate-800">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }}
        >
          <Avatar 
            src={angeloIcon.src} 
            alt="Angelo Araya Villanueva" 
            className="w-48 h-48 border-4 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.4)]" 
          />
        </motion.div>
        
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4">
            <h1 className="text-5xl font-extrabold tracking-tight">Angelo Araya Villanueva</h1>
            {/* 13+ Years Highlight */}
            <span className="text-2xl font-mono text-slate-500 font-light">13+ Yrs</span>
          </div>

          <p className="text-cyan-400 text-xl font-medium mt-2">Senior Lead Engineer · NJ & NY Areas</p>
          
          {/* Technical Stack Summary - Replacing the removed card info */}
          <p className="text-slate-400 mt-2 text-sm font-mono tracking-wide">
            Java <span className="text-cyan-500/50">/</span> .Net <span className="text-cyan-500/50">/</span> React <span className="text-cyan-500/50">/</span> Angular
          </p>

          <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
            <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-md text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(52,211,153,0.1)]">
              US Permanent Resident (Green Card)
            </span>

            <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
              Full Stack Expert
            </span>

            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
              Cloud Architect
            </span>

            <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-md text-[10px] font-bold uppercase tracking-wider">
              Global Talent: Chile ➔ UAE ➔ USA
            </span>
          </div>
        </div>
      </header>

      {/* 2. SKILLS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">    
        <Skill label="Leadership" value="Asst. Manager" trend="Team Lead" status="success" icon={<Award className="text-cyan-400" size={18} />}/>
        <Skill label="Architecture" value="Microservices" trend="Event-Driven / Serverless" status="success" icon={<Layers className="text-cyan-400" size={18}/>} />
        <Skill label="Event Streaming" value="Apache Kafka" trend="Pub/Sub & Batch" status="success" icon={<Zap className="text-cyan-400" size={18} />} />          
        <Skill label="Cloud" value="AWS/GCS/OCI" trend="Multi-region" status="success" icon={<Cloud className="text-cyan-400" size={18} />}/>
        <Skill label="Infrastructure" value="Terraform" trend="IaC" status="success" icon={<Server className="text-cyan-400" size={18} />}/>
        <Skill label="DevOps" value="CI/CD" trend="K8s/Docker" status="success" icon={<Infinity className="text-cyan-400" size={18} />}/>
      </div>

      {/* 3. INTERACTIVE HISTORY & PROJECTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Experience */}
        <div className="lg:col-span-2 space-y-6">
          <SectionHeader title="Professional Trajectory" />
          <Experience />
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          <SectionHeader title="GitHub & Resources" />
          
          {/* GitHub Card */}
          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <h3 className="font-bold text-lg mb-4 text-cyan-400">Featured Repo</h3>
            <p className="text-sm text-gray-400 mb-6">Explore the architecture of this dashboard and other projects.</p>
            <a 
              href="https://github.com/darkness666999" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full text-center py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              View GitHub Profile
            </a>
          </Card>
          
          {/* Languages Section */}
          <Card className="p-6 bg-slate-900/40 border-slate-800">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
              <Globe className="text-cyan-400" size={18} />
              <h3 className="font-bold text-white uppercase tracking-wider text-xs">Languages</h3>
            </div>
            
            <div className="space-y-4">
              {/* English */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">English</span>
                  <span className="text-cyan-500">Professional</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1 }}
                    className="bg-cyan-500 h-full shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                  />
                </div>
              </div>

              {/* Spanish */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Spanish</span>
                  <span className="text-emerald-500">Native</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1 }}
                    className="bg-emerald-500 h-full shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Primary Locations Card */}
          <Card className="p-6 bg-slate-900/50 border-slate-800">
            <h3 className="font-bold text-lg mb-2">Primary Locations</h3>
            <ul className="text-sm text-gray-400 space-y-2">
                <li>• New Jersey (Current)</li>
                <li>• New York Metro Area</li>
                <li>• Global Remote</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}