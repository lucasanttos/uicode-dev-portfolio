// Seção "O que eu construo" - cards dos 4 serviços
// Os dados vêm de lib/data.tsx - services[]

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionLabel  from "@/components/ui/SectionLabel";
import GradientText  from "@/components/ui/GradientText";
import { services } from "@/lib/data";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface ServicesProps {
  onNavigate: (id: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  return (
    <section id="services" className="py-32 relative">
      <div className="container px-6 mx-auto max-w-7xl">

        {/* cabeçalho da seção */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <SectionLabel>Especialidades</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            O que eu <GradientText text="construo" />
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            De landing pages estratégicas a plataformas complexas. Cada projeto é
            desenvolvido com foco em{" "}
            <strong className="text-slate-300">
              performance, conversão e resultados mensuráveis.
            </strong>
          </p>
        </div>

        {/* grid de cards - 2 colunas no desktop */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard
                  className="p-8 h-full group cursor-default"
                  spotlightColor={service.glow} // cada serviço tem sua cor de brilho
                >
                  <div className="flex gap-5 items-start">
                    {/* ícone do serviço */}
                    <div className={cn(
                      "w-14 h-14 shrink-0 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                      service.bg, service.border
                    )}>
                      <Icon size={24} className={service.color} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {service.title}
                        </h3>
                        {/* badge do serviço ex: "Alta Conversão" */}
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-full border shrink-0",
                          service.bg, service.border, service.color
                        )}>
                          {service.tag}
                        </span>
                      </div>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* link de contato embaixo dos cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium"
          >
            Não encontrou o que precisa? Fale comigo
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}