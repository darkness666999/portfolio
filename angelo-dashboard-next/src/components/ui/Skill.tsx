"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "./Card";

interface SkillProps {
  label: string;
  value: string | number;
  trend?: string;
  status?: "success" | "warning" | "danger";
  icon?: React.ReactNode; // Optional icon
}

const trendColors = {
  success: "text-cyan-400",
  warning: "text-orange-400",
  danger: "text-red-500",
};

export const Skill: React.FC<SkillProps> = ({ label, value, trend, status, icon }) => {
  return (
    <Card className="flex flex-col items-start justify-center group hover:border-cyan-500/50 transition-all duration-300">
      <div className="flex justify-between items-start w-full mb-1">
        <p className="text-sm text-gray-400 font-medium">{label}</p>
        
        {/* icon is now defined and will work! */}
        {icon && (
          <div className="text-gray-500 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all">
            {icon}
          </div>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-xl font-bold ${status ? trendColors[status] : "text-white"}`}
      >
        {value}
      </motion.p>

      {trend && (
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          {trend}
        </p>
      )}
    </Card>
  );
};
