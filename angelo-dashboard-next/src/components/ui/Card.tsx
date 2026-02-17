"use client";

import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`
      bg-[#0f172a]/50 
      backdrop-blur-md 
      border border-slate-800 
      rounded-xl 
      p-6 
      shadow-lg 
      hover:border-cyan-500/50 transition-colors
      ${className}
    `}>
      {children}
    </div>
  );
};