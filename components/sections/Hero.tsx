"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Globe,
  Layers,
  MousePointer2,
  Sparkles,
  Zap,
} from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import GlowCard from "@/components/ui/GlowCard";
import MagneticButton from "@/components/ui/MagneticButton";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import CountUp from "@/components/ui/CountUp";

interface HeroProps {
  onNavigate: (id: string) => void;
}

/*
  Itens do marquee inferior.
  Edite aqui as tecnologias, soluções ou diferenciais que deseja destacar.
*/
const MARQUEE_ITEMS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "UI/UX Premium",
  "SEO",
  "Landing Pages",
  "E-commerce",
  "Sistemas Web",
  "Dashboards",
  "Deploy",
];

/*
  Cards de serviços exibidos no lado direito do hero.
  Mantém o foco no mesmo site: agência digital / desenvolvimento web.
*/
const SERVICES = [
  {
    icon: Globe,
    label: "Sites & Landing Pages",
    desc: "Experiências rápidas, modernas e pensadas para conversão.",
  },
  {
    icon: Layers,
    label: "Lojas Virtuais",
    desc: "E-commerce com vitrine premium e jornada de compra clara.",
  },
  {
    icon: Code2,
    label: "Sistemas Web",
    desc: "Dashboards, áreas internas e plataformas sob medida.",
  },
  {
    icon: Zap,
    label: "Apps & Automações",
    desc: "Soluções digitais para simplificar processos e vender melhor.",
  },
];

/*
  Estatísticas comerciais.
  Edite os números conforme seus resultados reais.
*/
const STATS = [
  { end: 47, suffix: "+", label: "Projetos entregues" },
  { end: 98, suffix: "%", label: "Aprovação média" },
  { end: 7, suffix: "d", label: "Entrega média" },
];

/*
  Slides 3D do hero.
  Aqui você pode trocar os textos para projetos reais, nichos atendidos ou cases.
*/
const PROJECT_SLIDES = [
  {
    eyebrow: "Landing page",
    title: "Página de alta conversão",
    desc: "Design forte, copy direta e seções pensadas para transformar acesso em contato.",
    metric: "+ velocidade",
    accent: "from-cyan-400/30 via-blue-500/20 to-transparent",
  },
  {
    eyebrow: "E-commerce",
    title: "Loja virtual premium",
    desc: "Catálogo organizado, destaque para produtos e visual que aumenta percepção de valor.",
    metric: "+ vendas",
    accent: "from-violet-400/30 via-fuchsia-500/20 to-transparent",
  },
  {
    eyebrow: "Sistema web",
    title: "Painel sob medida",
    desc: "Fluxos internos, dados organizados e interface simples para operação diária.",
    metric: "+ controle",
    accent: "from-emerald-400/30 via-teal-500/20 to-transparent",
  },
  {
    eyebrow: "Marca digital",
    title: "Presença profissional",
    desc: "Visual consistente, experiência moderna e comunicação alinhada ao posicionamento.",
    metric: "+ autoridade",
    accent: "from-orange-300/30 via-amber-500/20 to-transparent",
  },
];

/*
  Função auxiliar para manter o slider em loop.
*/
function getCircularOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  return offset;
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  /*
    Parallax e zoom suave durante o scroll.
    Em usuários com redução de movimento ativa, a animação fica mais discreta.
  */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "24%"],
  );

  const opacity = useTransform(scrollYProgress, [0, 0.68], [1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.94],
  );

  /*
    Auto-play do slider 3D.
    Caso o usuário tenha preferência por menos movimento, o autoplay é desligado.
  */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % PROJECT_SLIDES.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  /*
    Spotlight interativo no mouse.
    Não afeta mobile e não cria re-render pesado, pois usa CSS variables direto no elemento.
  */
  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const element = containerRef.current;
    const spotlight = spotlightRef.current;

    if (!element || !spotlight) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const yPosition = event.clientY - rect.top;

    spotlight.style.setProperty("--mouse-x", `${x}px`);
    spotlight.style.setProperty("--mouse-y", `${yPosition}px`);
  }

  function goToPreviousSlide() {
    setActiveSlide((current) =>
      current === 0 ? PROJECT_SLIDES.length - 1 : current - 1,
    );
  }

  function goToNextSlide() {
    setActiveSlide((current) => (current + 1) % PROJECT_SLIDES.length);
  }

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#030303] text-white"
    >
      {/* Fundo com grid premium. */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Spotlight que acompanha o mouse no desktop. */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 hidden opacity-70 lg:block"
        style={{
          background:
            "radial-gradient(520px circle at var(--mouse-x, 50%) var(--mouse-y, 38%), rgba(34,211,238,0.13), transparent 42%)",
        }}
      />

      {/* Glows decorativos para dar profundidade visual. */}
      <div className="pointer-events-none absolute -left-24 top-24 z-0 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.10] blur-[110px]" />
      <div className="pointer-events-none absolute right-[-160px] top-1/4 z-0 h-[520px] w-[520px] rounded-full bg-violet-600/[0.11] blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-180px] left-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.045] blur-[120px]" />

      {/* Linha luminosa superior, inspirada em layouts mais editoriais e imersivos. */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-1 flex-col"
      >
        <div className="flex flex-1 items-center px-5 pb-14 pt-28 sm:px-6 md:pt-32 lg:pb-16">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_470px] lg:gap-16">
              {/* Conteúdo principal. */}
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl sm:mb-10 sm:px-4 sm:text-xs"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Agência digital disponível para novos projetos
                </motion.div>

                <h1 className="select-none text-[3.25rem] font-black leading-[0.88] tracking-[-0.075em] sm:text-[4.6rem] md:text-[6.4rem] lg:text-[7.4rem]">
                  <SplitText
                    text="Sua empresa"
                    className="block text-white"
                    delay={0.08}
                  />
                  <SplitText
                    text="no digital"
                    className="block text-white"
                    delay={0.22}
                  />
                  <SplitText
                    text="de verdade."
                    delay={0.36}
                    className="block bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent"
                  />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.72, duration: 0.7 }}
                  className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg md:mt-8"
                >
                  Sites, lojas virtuais e sistemas com visual premium, performance e
                  experiência pensada para gerar confiança desde o primeiro clique.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.88, duration: 0.7 }}
                  className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500 sm:mt-8"
                >
                  {["Design exclusivo", "Sem template genérico", "Suporte real", "Pronto para crescer"].map(
                    (item) => (
                      <span key={item} className="flex items-center gap-2">
                        <CheckCircle2
                          size={14}
                          className="shrink-0 text-emerald-400"
                        />
                        {item}
                      </span>
                    ),
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.02, duration: 0.7 }}
                  className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                >
                  <MagneticButton
                    onClick={() => onNavigate("pricing")}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white px-7 py-4 text-sm font-black tracking-wide text-black transition-colors hover:bg-slate-100 sm:px-8"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Ver Planos
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </MagneticButton>

                  <MagneticButton
                    onClick={() => onNavigate("projects")}
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/[0.10] bg-white/[0.035] px-7 py-4 text-sm font-bold text-slate-300 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:px-8"
                  >
                    Ver Projetos
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </MagneticButton>
                </motion.div>

                {/* Estatísticas no mobile para não deixar a dobra vazia. */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.14, duration: 0.7 }}
                  className="mt-9 grid grid-cols-3 gap-2 lg:hidden"
                >
                  {STATS.map(({ end, suffix, label }) => (
                    <GlowCard key={label} className="rounded-2xl p-3 text-center">
                      <p className="text-xl font-black tracking-tight text-white">
                        <CountUp end={end} suffix={suffix} />
                      </p>
                      <p className="mt-1 text-[9px] uppercase leading-tight tracking-wider text-slate-600">
                        {label}
                      </p>
                    </GlowCard>
                  ))}
                </motion.div>
              </div>

              {/* Coluna direita com slider 3D e cards. */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, x: 32, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{
                    delay: 0.45,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  <div className="mb-4 flex items-center justify-between lg:mb-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
                        Experiência visual
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Interfaces com movimento e profundidade
                      </p>
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                      <button
                        type="button"
                        onClick={goToPreviousSlide}
                        aria-label="Slide anterior"
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={goToNextSlide}
                        aria-label="Próximo slide"
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Slider 3D. */}
                  <div
                    className="relative h-[340px] overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.035] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:h-[390px]"
                    style={{ perspective: "1100px" }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_36%)]" />

                    {PROJECT_SLIDES.map((project, index) => {
                      const offset = getCircularOffset(
                        index,
                        activeSlide,
                        PROJECT_SLIDES.length,
                      );

                      const distance = Math.abs(offset);
                      const isActive = offset === 0;

                      return (
                        <motion.div
                          key={project.title}
                          className="absolute left-4 right-4 top-4 h-[calc(100%-2rem)] rounded-[1.6rem] border border-white/[0.10] bg-[#070707] p-5 shadow-2xl"
                          style={{
                            transformStyle: "preserve-3d",
                            zIndex: 20 - distance,
                          }}
                          animate={{
                            x: offset * 42,
                            rotateY: offset * -16,
                            scale: 1 - distance * 0.075,
                            opacity: distance > 2 ? 0 : 1 - distance * 0.28,
                          }}
                          transition={{
                            duration: 0.72,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <div
                            className={`absolute inset-0 rounded-[1.6rem] bg-gradient-to-br ${project.accent}`}
                          />
                          <div className="absolute inset-0 rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_35%,rgba(255,255,255,0.04))]" />

                          <div className="relative flex h-full flex-col justify-between">
                            <div>
                              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/70">
                                <Sparkles size={13} />
                                {project.eyebrow}
                              </div>

                              <h2 className="max-w-[270px] text-3xl font-black leading-none tracking-[-0.05em] text-white sm:text-4xl">
                                {project.title}
                              </h2>

                              <p className="mt-4 max-w-[310px] text-sm leading-6 text-slate-300/75">
                                {project.desc}
                              </p>
                            </div>

                            <div>
                              <div className="mb-5 grid grid-cols-[1fr_auto] items-end gap-4">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                                    Resultado buscado
                                  </p>
                                  <p className="mt-1 text-xl font-black text-white">
                                    {project.metric}
                                  </p>
                                </div>

                                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                                  <MousePointer2
                                    size={18}
                                    className="text-cyan-200"
                                  />
                                </div>
                              </div>

                              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                                <motion.div
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300"
                                  initial={false}
                                  animate={{ width: isActive ? "100%" : "28%" }}
                                  transition={{ duration: 0.6 }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Botões do slider no mobile. */}
                  <div className="mt-4 flex items-center justify-between sm:hidden">
                    <button
                      type="button"
                      onClick={goToPreviousSlide}
                      aria-label="Slide anterior"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300"
                    >
                      <ChevronLeft size={17} />
                    </button>

                    <div className="flex gap-2">
                      {PROJECT_SLIDES.map((project, index) => (
                        <button
                          key={project.title}
                          type="button"
                          onClick={() => setActiveSlide(index)}
                          aria-label={`Ir para o slide ${index + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            activeSlide === index
                              ? "w-8 bg-white"
                              : "w-2 bg-white/25"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={goToNextSlide}
                      aria-label="Próximo slide"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300"
                    >
                      <ChevronRight size={17} />
                    </button>
                  </div>
                </motion.div>

                {/* Cards de serviço e stats no desktop. */}
                <div className="mt-4 hidden flex-col gap-3 lg:flex">
                  {SERVICES.map(({ icon: Icon, label, desc }, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 34 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.75 + index * 0.1,
                        duration: 0.65,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <GlowCard className="group flex cursor-default items-center gap-4 rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 transition-colors group-hover:bg-cyan-500/20">
                          <Icon size={17} className="text-cyan-300" />
                        </div>

                        <div>
                          <p className="mb-0.5 text-sm font-semibold text-slate-200">
                            {label}
                          </p>
                          <p className="text-xs leading-snug text-slate-500">
                            {desc}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={14}
                          className="ml-auto text-slate-700 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-400"
                        />
                      </GlowCard>
                    </motion.div>
                  ))}

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    {STATS.map(({ end, suffix, label }, index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + index * 0.09 }}
                      >
                        <GlowCard className="rounded-2xl p-4 text-center">
                          <p className="text-2xl font-black tracking-tight text-white">
                            <CountUp end={end} suffix={suffix} />
                          </p>
                          <p className="mt-1 text-[10px] uppercase leading-tight tracking-wider text-slate-600">
                            {label}
                          </p>
                        </GlowCard>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MarqueeStrip items={MARQUEE_ITEMS} />
      </motion.div>
    </section>
  );
}