"use client";

import React from "react";

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return <h2 className="text-lg font-semibold mb-4">{title}</h2>;
};
