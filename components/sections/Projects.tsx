// Seção de cases/portfólio - projetos alternam esquerda e direita
// Os dados vêm de lib/data.tsx - projects[]
// Para adicionar um novo projeto: adiciono em data.tsx e coloco a imagem em /public

"use client";

import Image from "next/image"; // componente de imagem otimizado do Next.js
import { motion } from "framer-motion";
import { TrendingUp, ExternalLink } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";
import { projects } from "@/lib/data";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-[#040406] relative border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(6,182,212,0.06),transparent)] pointer-events-none" />

      <div className="container px-6 mx-auto max-w-7xl relative z-10">

        {/* cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <SectionLabel>Portfólio</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Cases de{" "}
            <GradientText text="Sucesso" from="from-amber-400" via="via-orange-400" to="to-pink-500" />
          </h2>
          <p className="text-slate-400 text-lg">
            Projetos reais com resultados reais. Veja como transformamos a presença
            digital de negócios como o seu.
          </p>
        </div>

        {/* lista de projetos */}
        <div className="flex flex-col gap-28">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
                // projetos pares (índice 1, 3...) invertem a ordem image/texto
                index % 2 === 1 && "lg:[direction:rtl] [&>*]:[direction:ltr]"
              )}
            >
              {/* ── imagem do projeto ── */}
              <div className="relative group">
                {/* brilho colorido atrás da imagem */}
                <div className={cn(
                  "absolute -inset-3 bg-gradient-to-r opacity-20 blur-2xl rounded-[3rem] transition-opacity duration-700 group-hover:opacity-40",
                  project.color
                )} />

                <div className="relative rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl bg-[#080808] aspect-[16/10]">
                  {/* imagem otimizada do Next.js - carrega lazy e em formato avif/webp */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-[3000ms] ease-out group-hover:scale-105 opacity-90"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* gradiente embaixo para suavizar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-transparent opacity-60" />

                  {/* badge de resultado no canto superior */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                      <TrendingUp size={12} className="text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400">{project.result}</span>
                    </div>
                  </div>

                  {/* badges de tecnologias usadas */}
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── informações do projeto ── */}
              <div className="space-y-6">
                <div>
                  {/* número do projeto e categoria */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cn("font-mono text-xs font-bold", project.textAccent)}>
                      PROJETO 0{project.id}
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-xs text-slate-600">{project.category}</span>
                  </div>

                  <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{project.description}</p>
                </div>

                {/* destaque do resultado */}
                <div className="p-4 rounded-2xl bg-emerald-400/5 border border-emerald-400/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0">
                    <TrendingUp size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Resultado alcançado</p>
                    <p className="text-sm font-bold text-emerald-400">{project.result}</p>
                  </div>
                </div>

                {/* link para o projeto */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-sm hover:scale-105 transition-transform"
                >
                  Visitar Projeto <ExternalLink size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}