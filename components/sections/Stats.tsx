// Seção com os 4 números animados
// ex: "47+ Projetos Entregues", "100% Taxa de Satisfação"
// Os dados vêm de lib/data.tsx - stats[]

"use client";

import { motion } from "framer-motion";
import SpotlightCard    from "@/components/ui/SpotlightCard";
import AnimatedCounter  from "@/components/ui/AnimatedCounter";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="py-20 relative">
      <div className="container px-6 mx-auto max-w-6xl">
        {/* grid de 2 colunas no mobile, 4 no desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} // cada card entra com delay escalonado
              >
                <SpotlightCard className="p-6 text-center" spotlightColor="rgba(6,182,212,0.08)">
                  {/* ícone */}
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={18} className="text-cyan-400" />
                  </div>
                  {/* número animado */}
                  <div className="text-3xl font-bold text-white mb-1 font-mono">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  {/* label embaixo */}
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}