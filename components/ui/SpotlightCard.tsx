// Card com efeito de spotlight - brilho que segue o mouse
// Uso em vários lugares: serviços, stats, planos de preço

"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

// função utilitária para juntar classes do Tailwind condicionalmente
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string; // cor do brilho - muda por contexto
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(6, 182, 212, 0.12)", // cyan padrão
}: SpotlightCardProps) {
  // rastreia a posição do mouse dentro do card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    // calcula posição relativa ao card, não à tela
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/5 bg-[#080808] overflow-hidden rounded-3xl",
        "transition-all duration-500 hover:border-white/10",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* gradiente radial que segue o mouse - só aparece no hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {/* conteúdo do card */}
      <div className="relative h-full">{children}</div>
    </div>
  );
}