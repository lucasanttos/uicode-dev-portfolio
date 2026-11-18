"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Code, Menu, Sparkles } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

// Função simples para juntar classes Tailwind de forma condicional.
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Itens do menu principal.
// Para adicionar/remover links, edite apenas este array.
const navItems = [
  { label: "Especialidades", id: "services" },
  { label: "Cases", id: "projects" },
  { label: "Planos", id: "pricing" },
  { label: "Contato", id: "contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detecta scroll de forma performática usando requestAnimationFrame.
  // Isso evita muitos updates pesados durante o scroll em celulares.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        setIsScrolled(currentScroll > 50);

        ticking = false;
      });

      ticking = true;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavigate(id: string) {
    const target = document.getElementById(id);
    target?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "py-3 md:py-3"
            : "py-5 md:py-6"
        )}
      >
        {/* Glow superior discreto, deixando o header mais premium. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-24 transition-opacity duration-500",
            isScrolled ? "opacity-100" : "opacity-50"
          )}
        >
          <div className="mx-auto h-full max-w-5xl bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className={cn(
              "relative flex items-center justify-between rounded-2xl border transition-all duration-500",
              isScrolled
                ? "border-white/[0.08] bg-[#030303]/72 px-3 py-2 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:px-4"
                : "border-transparent bg-transparent px-0 py-0"
            )}
          >
            {/* Borda luminosa sutil quando scrolla. */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/15 via-transparent to-violet-400/15 opacity-0 transition-opacity duration-500",
                isScrolled && "opacity-100"
              )}
            />

            {/* Logo - clique volta ao topo. */}
          <a
            href="#home"
            aria-label="Voltar para o início"
            className={cn("relative z-10 flex items-center gap-2 rounded-xl outline-none transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-cyan-300/70", !isScrolled && "hover:scale-[1.03]")}
            >
              <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-600 shadow-[0_0_28px_rgba(34,211,238,0.32)]">
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 hover:translate-x-[120%]" />
                <Code size={17} className="relative z-10 text-white" />
              </span>

              <span className="flex items-baseline font-mono text-xl font-black tracking-tighter">
                <span className="text-white">Ui</span>
                <span className="text-cyan-300">Code</span>
                <span className="text-white/35">.site</span>
              </span>
          </a>

            {/* Navegação desktop. */}
            <nav
              aria-label="Navegação principal"
              className="relative z-10 hidden items-center gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-1 backdrop-blur-xl md:flex"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className="group relative overflow-hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-400 transition-all duration-300 hover:bg-white/[0.055] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Glow no hover do item. */}
                  <span className="pointer-events-none absolute inset-x-3 bottom-1 h-px scale-x-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="absolute left-1/2 top-1/2 h-8 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-xl" />
                  </span>
                </button>
              ))}
            </nav>

            <div className="relative z-10 flex items-center gap-2 sm:gap-3">
              {/* CTA desktop. */}
              <button
                type="button"
                onClick={() => handleNavigate("contact")}
                className="group relative hidden items-center gap-2 overflow-hidden rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-black shadow-[0_0_30px_rgba(255,255,255,0.10)] transition-all hover:bg-cyan-50 md:flex"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={15} className="text-cyan-600" />
                  Iniciar Projeto
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>

                {/* Efeito shimmer no botão. */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              {/* Botão mobile. */}
              <button
                type="button"
                aria-label="Abrir menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-2xl border text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 md:hidden",
                  isScrolled
                    ? "border-white/[0.08] bg-white/[0.06] backdrop-blur-xl"
                    : "border-white/[0.08] bg-white/[0.045]"
                )}
              >
                <Menu size={21} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu mobile separado para ficar acima de toda a página. */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        onNavigate={(id: string) => {
          setMobileMenuOpen(false);
          handleNavigate(id);
        }}
      />
    </>
  );
}
