// Item individual do FAQ - abre e fecha com animação suave
// Uso na seção de perguntas frequentes abaixo dos planos

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface FAQItemProps {
  question: string;
  answer: string;
  index: number; // usado para delay escalonado na animação de entrada
}

export default function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false); // controla se está aberto ou fechado

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }} // cada item entra com um pequeno delay
      className="border-b border-white/5 last:border-0" // sem borda no último
    >
      {/* cabeçalho clicável da pergunta */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={cn(
          "font-semibold text-base transition-colors pr-8",
          isOpen ? "text-cyan-400" : "text-slate-200 group-hover:text-white"
        )}>
          {question}
        </span>

        {/* ícone que rotaciona quando abre */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors",
            isOpen ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 bg-white/5"
          )}
        >
          <ChevronRight size={14} className={isOpen ? "text-cyan-400" : "text-slate-400"} />
        </motion.div>
      </button>

      {/* resposta - aparece e desaparece com animação de altura */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 text-sm leading-relaxed pr-10">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}