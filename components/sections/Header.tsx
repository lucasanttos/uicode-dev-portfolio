// Header fixo no topo - muda de aparência quando scrolla
// Transparente no topo, escurecido com blur quando scrolla

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, ArrowRight, Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// itens do menu de navegação - label é o texto, id é a seção que vai rolar até
const navItems = [
  { label: "Especialidades", id: "services" },
  { label: "Cases",          id: "projects" },
  { label: "Planos",         id: "pricing"  },
  { label: "Contato",        id: "contact"  },
];

interface HeaderProps {
  onNavigate: (id: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // detecta se o usuário scrollou para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}    // começa fora da tela
        animate={{ y: 0, opacity: 1 }}       // desliza para baixo
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          // quando scrolla: adiciona fundo escuro e borda
          isScrolled
            ? "bg-[#030303]/85 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl shadow-black/50"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">

          {/* Logo - clica para voltar ao topo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate("home")}
            className="text-xl font-bold font-mono tracking-tighter flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Code size={16} className="text-white" />
            </div>
            <span className="text-white">Ui</span>
            <span className="text-cyan-400">Code</span>
            <span className="text-white/30">.site</span>
          </motion.button>

          {/* Navegação desktop - some no mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 relative group"
              >
                {item.label}
                {/* lininha que aparece embaixo no hover */}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-cyan-400 transition-all group-hover:w-4" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* CTA no desktop */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("contact")}
              className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-cyan-50 transition-all"
            >
              Iniciar Projeto <ArrowRight size={15} />
            </motion.button>

            {/* Botão hamburguer - só aparece no mobile */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile - renderizado separado para ficar sobre tudo */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
onNavigate={(id: string) => {          setMobileMenuOpen(false);
          onNavigate(id);
        }}
      />
    </>
  );
}