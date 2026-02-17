"use client";
import React, { useState } from "react";
import { experiences, Project as ProjectType } from "../../data/experience"; 
import { Card } from "./Card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase, MapPin, Calendar, BookOpen, Plus, Minus } from "lucide-react";

// Sub-component for individual project cards to handle their own dropdown state
const ProjectCard = ({ proj }: { proj: ProjectType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-5 bg-slate-900/20 border-slate-800/50 hover:border-cyan-500/30 transition-colors group">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
              {proj.title}
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            <span className="text-cyan-500/80 font-medium">{proj.client}</span> • {proj.role}
          </p>
        </div>
        <div className="text-right">
            <span className="text-[10px] font-mono text-slate-500 block">{proj.duration}</span>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="mt-2 text-[10px] uppercase tracking-wider font-bold text-cyan-500 hover:text-white flex items-center gap-1 ml-auto"
            >
                {isOpen ? <><Minus size={12}/> Hide Tasks</> : <><Plus size={12}/> View Tasks</>}
            </button>
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-3 leading-relaxed">
        {proj.description}
      </p>

      {/* Nested Responsibilities Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-slate-800/50 space-y-2">
                <h5 className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Core Responsibilities</h5>
                <ul className="space-y-2">
                    {proj.responsibilities.map((resp, i) => (
                    <li key={i} className="text-xs text-slate-400 flex gap-2 leading-relaxed">
                        <span className="text-cyan-500 mt-1.5 w-1 h-1 rounded-full bg-cyan-500 shrink-0" />
                        {resp}
                    </li>
                    ))}
                </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {proj.environment.map((tech, i) => (
          <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            {tech}
          </span>
        ))}
      </div>
    </Card>
  );
};

export const Experience = () => {
  const [expandedEmp, setExpandedEmp] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      {experiences.map((emp, empIdx) => (
        <div key={empIdx} className="space-y-4">
          {/* Employer Header */}
          <div 
            onClick={() => setExpandedEmp(expandedEmp === empIdx ? null : empIdx)}
            className={`cursor-pointer p-5 rounded-xl border transition-all flex justify-between items-center ${
              emp.isCurrent ? 'bg-cyan-500/5 border-cyan-500/30' : 'bg-slate-900/40 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                emp.company.includes("Universidad") ? 'bg-purple-500/20 text-purple-400' :
                emp.isCurrent ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'
              }`}>
                {emp.company.includes("Universidad") ? <BookOpen size={20} /> : <Briefcase size={20} />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{emp.company}</h3>
                <div className="flex gap-4 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin size={12}/> {emp.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={12}/> {emp.totalPeriod}</span>
                </div>
              </div>
            </div>
            <motion.div animate={{ rotate: expandedEmp === empIdx ? 180 : 0 }}>
              <ChevronDown className="text-slate-500" />
            </motion.div>
          </div>

          {/* Expandable Project List */}
          <AnimatePresence>
            {expandedEmp === empIdx && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pl-6 md:pl-12 space-y-4 border-l border-slate-800 ml-6 md:ml-8"
              >
                {emp.projects.map((proj, pIdx) => (
                  <ProjectCard key={pIdx} proj={proj} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};