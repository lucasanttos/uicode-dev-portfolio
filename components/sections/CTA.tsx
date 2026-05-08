// Seção final de call to action - última chance de converter o visitante
// Botão principal vai para o WhatsApp, secundário vai para os planos

"use client";

import { motion } from "framer-motion";
import { MessageCircle, Shield, RefreshCw, CheckCircle2, Clock } from "lucide-react";
import ShinyButton  from "@/components/ui/ShinyButton";
import Badge        from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";

interface CTAProps {
  onNavigate: (id: string) => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  // ícones e textos de garantia que aparecem embaixo dos botões
  const guarantees = [
    { icon: Shield,        text: "Sem fidelidade"          },
    { icon: RefreshCw,     text: "Cancele quando quiser"   },
    { icon: CheckCircle2,  text: "Resultados garantidos"   },
    { icon: Clock,         text: "Entrega em até 14 dias"  },
  ];

  return (
    <section id="contact" className="py-40 relative overflow-hidden">
      {/* fundo com gradiente e brilho central */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#030309] to-[#030303]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container px-6 mx-auto max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="mb-8 mx-auto w-fit">Vamos começar?</Badge>

          {/* headline principal */}
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-[1.05]">
            Pronto para ter a
            <br />
            <GradientText text="presença digital" />
            <br />
            que seu negócio merece?
          </h2>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Cada dia sem um site profissional é um dia perdendo clientes para a concorrência.{" "}
            <strong className="text-slate-200">Comece hoje.</strong>
          </p>

          {/* botões */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* CTA principal - WhatsApp */}
            <ShinyButton
              onClick={() => window.open("https://wa.me/5511916474626", "_blank")}
              className="text-base px-10 py-5 rounded-2xl"
            >
              <MessageCircle size={20} />
              Falar no WhatsApp agora
            </ShinyButton>

            {/* CTA secundário - planos */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate("pricing")}
              className="px-8 py-5 rounded-2xl border border-white/10 text-slate-300 font-bold hover:border-white/20 hover:text-white hover:bg-white/5 transition-all text-base"
            >
              Ver planos e preços
            </motion.button>
          </div>

          {/* garantias embaixo dos botões */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {guarantees.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <Icon size={14} className="text-cyan-500" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}