"use client";

import Image from "next/image";
import { MouseEvent, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Eye,
  Layers,
  MousePointer2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";
import { projects } from "@/lib/data";

// Função simples para juntar classes condicionais.
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

// Tipo inferido automaticamente a partir do array projects.
// Assim você não precisa criar uma interface duplicada.
type Project = (typeof projects)[number];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-y border-white/5 bg-[#040406] py-24 sm:py-28 lg:py-36"
    >
      {/* Fundo com grid e glows decorativos. */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.045]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-180px] top-1/3 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* Cabeçalho da seção. */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <SectionLabel>Portfólio</SectionLabel>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Cases com{" "}
            <GradientText
              text="presença"
              from="from-cyan-300"
              via="via-white"
              to="to-violet-300"
            />
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Projetos criados para marcas que precisam transmitir confiança,
            valor e profissionalismo logo nos primeiros segundos.
          </p>
        </motion.div>

        {/* Destaque superior com números rápidos. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-3 sm:grid-cols-3 lg:mb-20"
        >
          {[
            {
              icon: Layers,
              label: "Design exclusivo",
              desc: "Layouts criados para cada negócio.",
            },
            {
              icon: Eye,
              label: "Visual memorável",
              desc: "Experiência forte e fácil de entender.",
            },
            {
              icon: MousePointer2,
              label: "Foco em ação",
              desc: "Páginas pensadas para gerar contato.",
            },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                <Icon size={18} className="text-cyan-200" />
              </div>
              <p className="text-sm font-black text-white">{label}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">{desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Lista de projetos. */}
        <div className="flex flex-col gap-14 sm:gap-20 lg:gap-28">
          {projects.map((project, index) => (
            <ProjectShowcaseCard
              key={project.id}
              project={project}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectShowcaseCardProps {
  project: Project;
  index: number;
  isReversed: boolean;
}

function ProjectShowcaseCard({
  project,
  index,
  isReversed,
}: ProjectShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  /*
    Valores do mouse para criar inclinação 3D no card.
    O spring deixa o movimento mais suave e premium.
  */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [9, -9]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [-7, 7]);

  /*
    Parallax suave durante o scroll.
    Em usuários com redução de movimento ativada, o efeito é desligado.
  */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-5%", "5%"],
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["24px", "-24px"],
  );

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const element = cardRef.current;

    if (!element || prefersReducedMotion) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 72, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-16",
        isReversed && "lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.1fr)]",
      )}
    >
      {/* Área visual do projeto. */}
      <motion.div
        style={{
          y: imageY,
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group relative order-1",
          isReversed && "lg:order-2",
        )}
      >
        {/* Brilho atrás da imagem. */}
        <div
          className={cn(
            "absolute -inset-3 rounded-[2.2rem] bg-gradient-to-r opacity-20 blur-2xl transition-opacity duration-700 group-hover:opacity-50 sm:-inset-5",
            project.color,
          )}
        />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-[#070707] shadow-2xl shadow-black/50">
          {/* Borda luminosa superior. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Moldura estilo browser/app. */}
          <div className="relative z-20 flex items-center justify-between border-b border-white/[0.08] bg-white/[0.035] px-4 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>

            <div className="hidden rounded-full border border-white/[0.08] bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 sm:block">
              Projeto selecionado
            </div>

            <ArrowUpRight size={15} className="text-white/35" />
          </div>

          <div
            className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]"
            style={{ transform: "translateZ(34px)" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top opacity-90 transition-transform duration-[2600ms] ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 55vw"
            />

            {/* Gradientes para leitura e acabamento. */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/30" />

            {/* Badge de resultado. */}
            <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
              <div className="flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-black/65 px-3 py-2 shadow-xl backdrop-blur-xl">
                <TrendingUp size={13} className="text-emerald-300" />
                <span className="text-xs font-black text-emerald-300">
                  {project.result}
                </span>
              </div>
            </div>

            {/* Nome do projeto por cima da imagem no mobile. */}
            <div className="absolute bottom-4 left-4 right-4 sm:hidden">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/50">
                Projeto 0{index + 1}
              </p>
              <h3 className="text-2xl font-black leading-none tracking-[-0.04em] text-white">
                {project.title}
              </h3>
            </div>

            {/* Tecnologias. */}
            <div className="absolute bottom-4 left-4 right-4 hidden flex-wrap gap-2 sm:flex">
              {project.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-white/[0.10] bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-slate-300 backdrop-blur-xl"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conteúdo textual do projeto. */}
      <motion.div
        style={{ y: contentY }}
        className={cn(
          "order-2 space-y-6",
          isReversed && "lg:order-1",
        )}
      >
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span
              className={cn(
                "font-mono text-xs font-black uppercase tracking-[0.22em]",
                project.textAccent,
              )}
            >
              Projeto 0{index + 1}
            </span>

            <div className="h-px flex-1 bg-white/[0.08]" />

            <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {project.category}
            </span>
          </div>

          <h3 className="hidden text-4xl font-black tracking-[-0.055em] text-white sm:block lg:text-5xl">
            {project.title}
          </h3>

          <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
            {project.description}
          </p>
        </div>

        {/* Resultado alcançado. */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-300/10 bg-emerald-300/[0.045] p-5">
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-emerald-300/15 bg-emerald-300/10">
              <TrendingUp size={18} className="text-emerald-300" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300/70">
                Resultado alcançado
              </p>
              <p className="mt-1 text-base font-black text-emerald-300">
                {project.result}
              </p>
            </div>
          </div>
        </div>

        {/* Tecnologias no mobile. */}
        <div className="flex flex-wrap gap-2 sm:hidden">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-xl border border-white/[0.10] bg-white/[0.035] px-3 py-1.5 text-[11px] font-semibold text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link para o projeto. */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-black transition-transform hover:scale-[1.03]"
        >
          <span>Visitar Projeto</span>
          <ExternalLink
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>

        {/* Linha decorativa inferior. */}
        <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </motion.div>
    </motion.article>
  );
}