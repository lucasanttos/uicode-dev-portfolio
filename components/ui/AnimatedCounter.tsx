// Contador animado - os números contam do zero até o valor final
// Só começa a animar quando o elemento entra na tela (useInView)

"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;   // número final
  suffix?: string; // o que vem depois ex: "+" ou "%"
  prefix?: string; // o que vem antes ex: "até "
}

export default function AnimatedCounter({ value, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true }); // dispara só uma vez

  useEffect(() => {
    if (!isInView) return; // espera entrar na tela

    const duration = 2000; // duração da animação em ms
    const steps = 60;      // quantos "passos" tem a animação
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);    // garante que termina no valor exato
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer); // limpa o interval quando o componente desmonta
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}