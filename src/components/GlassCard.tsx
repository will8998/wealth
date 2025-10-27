"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import React from "react";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlassCard({ className, children }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "glass neon-border glass-hover relative overflow-hidden",
        "p-4 sm:p-6 lg:p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;


