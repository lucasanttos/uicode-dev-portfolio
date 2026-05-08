// Botão com efeito de brilho passando - usado nos CTAs principais
// Tem 3 variantes: primary (cyan), white (branco), ghost (transparente)

"use client";

import { motion } from "framer-motion";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ElementType; // ícone opcional que aparece depois do texto
  variant?: "primary" | "white" | "ghost";
}

export default function ShinyButton({
  children,
  onClick,
  className = "",
  icon: Icon,
  variant = "primary",
}: ShinyButtonProps) {
  // estilos de cada variante
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_auto] hover:bg-right-bottom shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] text-white",
    white:   "bg-white text-black hover:bg-cyan-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    ghost:   "border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }} // sobe levemente no hover
      whileTap={{ scale: 0.97 }}           // encolhe um pouco ao clicar
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl px-8 py-4 font-bold transition-all duration-500",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {children}
        {Icon && <Icon size={18} />}
      </span>

      {/* efeito de brilho passando - só no botão primary */}
      {variant === "primary" && (
        <motion.div
          initial={{ x: "-100%", skewX: "-15deg" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      )}
    </motion.button>
  );
}