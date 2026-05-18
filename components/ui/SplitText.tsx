"use client";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom center", perspective: 600 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}