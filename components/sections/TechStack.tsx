// Seção de habilidades e tecnologias
// Tem as barras de progresso e as tags de cada tecnologia
// Os dados vêm de lib/data.tsx - skills[] e techStack[]

"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";
import { skills, techStack } from "@/lib/data";

export default function TechStack() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="container px-6 mx-auto max-w-5xl relative z-10">

        {/* cabeçalho */}
        <div className="text-center mb-16">
          <SectionLabel>Stack Tecnológico</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Tecnologia de <GradientText text="alto nível" />
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Utilizamos as mesmas tecnologias usadas pelas maiores empresas do mundo
            para garantir performance, segurança e escalabilidade.
          </p>
        </div>

        {/* barras de progresso - 2 colunas no desktop */}
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#080808] border border-white/5 rounded-2xl p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                <span className="text-xs font-bold text-cyan-400">{skill.level}%</span>
              </div>
              {/* trilho da barra */}
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                {/* barra que cresce animada - só anima quando entra na tela */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.05 + 0.2 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* tags de tecnologia */}
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }} // sobe levemente no hover
              className="px-5 py-2.5 bg-[#080808] border border-white/5 rounded-xl flex items-center gap-2 cursor-default transition-all duration-200"
            >
              {/* ponto brilhante */}
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              <span className="text-sm font-medium text-slate-300">{tech}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}