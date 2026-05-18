"use client";
import { motion } from "framer-motion";

interface MarqueeStripProps {
  items: string[];
}

export default function MarqueeStrip({ items }: MarqueeStripProps) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden py-4 border-y border-white/[0.05]">
      {/* fade esquerda */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      {/* fade direita */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            {item}
            <span className="text-slate-800">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}