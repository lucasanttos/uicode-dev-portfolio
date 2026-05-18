"use client";
import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setGlow({ x, y, opacity: 1 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGlow((p) => ({ ...p, opacity: 0 }))}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "#080808",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* glow spot */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgba(6,182,212,0.08), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}