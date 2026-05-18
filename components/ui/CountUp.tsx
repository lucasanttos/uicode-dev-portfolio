"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({ end, suffix = "", duration = 2000 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); return; }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}