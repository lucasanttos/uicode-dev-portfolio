"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

// Reutiliza a mesma animação de contagem nos destaques e nas estatísticas.
export default function CountUp({ end, suffix = "", prefix = "", duration = 2000 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let currentStep = 0;
    const steps = 60;
    const step = end / steps;
    const timer = setInterval(() => {
      currentStep += 1;
      if (currentStep >= steps) {
        setCount(end);
        clearInterval(timer);
        return;
      }
      setCount(Math.floor(step * currentStep));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}
