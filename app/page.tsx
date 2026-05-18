
"use client"; 

import { useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import Header   from "@/components/sections/Header";
import Hero     from "@/components/sections/Hero";
import Stats    from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Pricing  from "@/components/sections/Pricing";
import CTA      from "@/components/sections/CTA";
import Footer   from "@/components/sections/Footer";
import type { PolicyKey } from "@/components/sections/Footer";

import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import PolicyModal     from "@/components/ui/PolicyModal";

import { policyContent } from "@/lib/data";

const policyTitles: Record<PolicyKey, string> = {
  terms:        "Termos de Uso",
  privacy:      "Política de Privacidade",
  cancellation: "Política de Cancelamento",
};

export default function Home() {
  // controla qual modal de política está aberto (null = nenhum)
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  // barra de progresso de scroll no topo da página
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // função de scroll suave para cada seção
  // uso useCallback para não recriar a função a cada render
  const scrollToSection = useCallback((id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // pequeno delay para fechar o menu mobile antes de scrollar
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030303] text-slate-200 font-sans overflow-x-hidden">

      {/* Barrinha de progresso de leitura no topo */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left z-[200]"
        style={{ scaleX }}
      />

      {/* Efeitos de fundo - gradientes e grid - ficam fixos enquanto scrolla */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Textura de ruído sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Brilho cyan no canto superior esquerdo */}
        <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] bg-cyan-600/10 rounded-full blur-[200px]" />

        {/* Brilho roxo no canto inferior direito */}
        <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] bg-purple-600/[0.08] rounded-full blur-[180px]" />

        {/* Brilho azul no meio direito */}
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[120px]" />

        {/* Grid de linhas finas */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <Header onNavigate={scrollToSection} />

      <main>
        <Hero       onNavigate={scrollToSection} /> {/* seção inicial com headline */}
        <InfiniteMarquee />                          {/* faixa rolante de serviços */}
        <Stats />                                    {/* 4 números animados */}
        <Services   onNavigate={scrollToSection} /> {/* cards de serviços */}
        <Projects />                                 {/* cases de sucesso */}
        <TechStack />                                {/* skills e tech stack */}
        <Pricing />                                  {/* planos e preços */}
        <CTA        onNavigate={scrollToSection} /> {/* call to action final */}
      </main>

      <Footer
        onNavigate={scrollToSection}
        onOpenPolicy={(key) => setActivePolicy(key)} 
      />

      <PolicyModal
        isOpen={!!activePolicy}
        onClose={() => setActivePolicy(null)}
        title={activePolicy ? policyTitles[activePolicy] : ""}
        content={activePolicy ? policyContent[activePolicy] : null}
      />
    </div>
  );
}