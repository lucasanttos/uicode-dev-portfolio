// Seção principal do site - primeira coisa que o usuário vê
// Tem o headline, subtítulo, botões de CTA e o mockup de dashboard flutuante

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Play, Star, TrendingUp } from "lucide-react";
import ShinyButton  from "@/components/ui/ShinyButton";
import Badge        from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-36 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden min-h-screen flex items-center"
    >
      <div className="container max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── COLUNA ESQUERDA - copy e CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* badge no topo - posso mudar o texto aqui */}
            <Badge className="mb-8">Agência Digital Premium</Badge>

            {/* título principal - H1 para SEO */}
            <h1 className="text-[3.2rem] md:text-7xl lg:text-[5rem] font-bold leading-[1.05] tracking-tighter mb-6">
              Sua empresa no
              <br />
              digital com
              <br />
              <GradientText text="resultados reais." />
            </h1>

            {/* subtítulo */}
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed mb-8">
              Criamos{" "}
              <strong className="text-slate-200">lojas virtuais, sites e aplicativos</strong>{" "}
              que não são só bonitos — são projetados para{" "}
              <strong className="text-slate-200">gerar vendas, leads e autoridade</strong>{" "}
              para o seu negócio.
            </p>

            {/* sinais de confiança rápidos */}
            <div className="flex items-center gap-6 mb-10 text-sm text-slate-500 flex-wrap">
              {["47+ projetos entregues", "Sem fidelidade", "Suporte real"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* botões de ação */}
            <div className="flex flex-wrap gap-4">
              {/* CTA principal - vai para os planos */}
              <ShinyButton onClick={() => onNavigate("pricing")} icon={ArrowRight}>
                Ver Planos e Preços
              </ShinyButton>

              {/* CTA secundário - vai para os cases */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate("projects")}
                className="px-6 py-4 rounded-2xl text-slate-300 font-semibold hover:text-white transition-colors flex items-center gap-2 border border-white/5 hover:border-white/10 hover:bg-white/5"
              >
                <Play size={14} className="fill-current" />
                Ver Cases de Sucesso
              </motion.button>
            </div>

            {/* prova social - fotos e estrelas */}
            <div className="mt-10 pt-10 border-t border-white/5 flex items-center gap-4">
              {/* avatares fictícios - posso colocar fotos reais depois */}
              <div className="flex -space-x-2">
                {["E", "P", "L"].map((l, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-[#030303] flex items-center justify-center text-xs font-bold text-white">
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  <strong className="text-slate-300">+47 clientes</strong> confiam na UiCode
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── COLUNA DIREITA - mockup flutuante ── */}
          {/* só aparece em desktop (lg:flex) */}
          <div className="relative hidden lg:flex items-center justify-center h-[600px]">

            {/* card de receita mensal - flutua para cima e baixo */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-10 w-80 bg-[#080808] rounded-3xl border border-white/[0.08] shadow-2xl p-6 z-20"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Receita do Mês</p>
                  <p className="text-2xl font-bold text-white">R$ 47.280</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={18} className="text-emerald-400" />
                </div>
              </div>

              {/* gráfico de barras decorativo */}
              <div className="flex items-end gap-1.5 h-24 mb-4">
                {[35, 55, 42, 70, 58, 88, 75, 95, 65, 100, 82, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      // última barra destacada em cyan
                      background: i === 11
                        ? "linear-gradient(to top, #06b6d4, #3b82f6)"
                        : "rgba(255,255,255,0.05)",
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/[0.08] rounded-xl px-3 py-2 border border-emerald-400/10">
                <TrendingUp size={12} />
                <span className="font-semibold">+245% vs mês anterior</span>
              </div>
            </motion.div>

            {/* card de pedidos - flutua no sentido oposto */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute left-0 bottom-20 w-64 bg-[#080808] rounded-3xl border border-white/[0.08] shadow-2xl p-5 z-10"
            >
              <p className="text-xs text-slate-500 mb-3">Novos Pedidos Hoje</p>
              {[
                { name: "João Silva",  value: "R$ 380", color: "bg-cyan-400"   },
                { name: "Maria Costa", value: "R$ 220", color: "bg-purple-400" },
                { name: "Pedro Lima",  value: "R$ 150", color: "bg-emerald-400"},
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between mb-2 last:mb-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-white">{item.value}</span>
                </div>
              ))}
            </motion.div>

            {/* badge "Site no ar!" - flutua em diagonal */}
            <motion.div
              animate={{ y: [-5, 5, -5], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-4 bottom-32 bg-[#0a0a0a] rounded-2xl border border-white/[0.08] shadow-xl px-4 py-3 z-30 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Site no ar!</p>
                <p className="text-[10px] text-slate-500">7 dias após o início</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}