"use client";

import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string; // Add this prop
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "md", className = "" }) => {
  const baseClasses = "rounded-full object-cover object-center flex-shrink-0";
  const finalClass = className ? className : sizes[size];
  
  return (
    <div className={`overflow-hidden rounded-full ${finalClass.split(' ').filter(c => c.startsWith('w-') || c.startsWith('h-')).join(' ')}`}>
      <img 
        src={src} 
        alt={alt} 
        className={`${baseClasses} w-full h-full`} 
      />
    </div>
  );
};