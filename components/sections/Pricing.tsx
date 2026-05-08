// Seção de planos e preços
// Tem os 3 cards, a tabela comparativa e o FAQ
// Os dados vêm de lib/data.tsx
// Os links do Stripe estão em pricingPlans[].paymentLink

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, X, CreditCard, Star, Rocket, MessageCircle } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionLabel  from "@/components/ui/SectionLabel";
import GradientText  from "@/components/ui/GradientText";
import FAQItem       from "@/components/ui/FAQItem";
import { pricingPlans, comparisonFeatures, faqData } from "@/lib/data";
import type { PricingPlan } from "@/lib/data";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default function Pricing() {
  // ao clicar no botão do plano:
  // - se tiver link do Stripe, abre direto
  // - senão, abre WhatsApp com mensagem já preenchida
  const handleSubscribe = (plan: PricingPlan) => {
    if (plan.paymentLink?.startsWith("http")) {
      window.open(plan.paymentLink, "_blank");
      return;
    }
    const message = encodeURIComponent(
      `Olá, UiCode! 👋\n\nTenho interesse no *Plano ${plan.name}* (${plan.price}${plan.cents}/mês).\n\nPodemos conversar sobre meu projeto?`
    );
    window.open(`https://wa.me/5511916474626?text=${message}`, "_blank");
  };

  return (
    <section id="pricing" className="py-32 relative bg-[#020204]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(139,92,246,0.06),transparent)] pointer-events-none" />

      <div className="container px-6 mx-auto max-w-6xl relative z-10">

        {/* cabeçalho */}
        <div className="text-center mb-20">
          <SectionLabel>Planos</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Invista no seu
            <br />
            <GradientText text="crescimento digital" from="from-violet-400" via="via-purple-400" to="to-pink-500" />
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Sem surpresas, sem letras miúdas. Escolha o plano ideal para o
            momento do seu negócio e comece hoje.
          </p>
        </div>

        {/* ── CARDS DE PLANO ── */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16 items-stretch">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* brilho especial no card destacado */}
              {plan.highlight && (
                <div className="absolute -inset-px bg-gradient-to-b from-cyan-500/30 via-blue-500/10 to-transparent rounded-3xl blur-sm" />
              )}

              <SpotlightCard
                className={cn(
                  "h-full flex flex-col p-8 transition-all duration-300 relative",
                  plan.highlight
                    ? "border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.15)]"
                    : "hover:border-white/10"
                )}
                spotlightColor={plan.highlight ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.04)"}
              >
                {/* badge "MAIOR ROI" no card premium */}
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-[10px] font-bold text-white tracking-widest uppercase flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <Star size={9} className="fill-white" /> {plan.badge}
                  </div>
                )}

                {/* nome e descrição do plano */}
                <div className="mb-6 pt-2">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-sm">{plan.description}</p>
                </div>

                {/* preço */}
                <div className="flex items-start gap-1 mb-8 pb-8 border-b border-white/5">
                  <span className="text-slate-400 text-lg mt-2">R$</span>
                  <span className="text-5xl font-bold text-white tracking-tighter">
                    {plan.price.replace("R$ ", "")}
                  </span>
                  <div className="flex flex-col justify-end mb-1">
                    <span className="text-white text-xl font-bold">{plan.cents}</span>
                    <span className="text-slate-500 text-xs">{plan.period}</span>
                  </div>
                </div>

                {/* lista de features incluídas */}
                <ul className="space-y-3 mb-4 flex-1">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 size={16} className={cn("shrink-0 mt-0.5", plan.highlight ? "text-cyan-400" : "text-emerald-500")} />
                      {feat}
                    </li>
                  ))}
                  {/* features não incluídas - aparecem riscadas */}
                  {plan.notIncluded.map((feat, idx) => (
                    <li key={`no-${idx}`} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <X size={16} className="shrink-0 mt-0.5 text-slate-700" />
                      <span className="line-through">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* botão de assinar */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan)}
                  className={cn(
                    "w-full mt-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2",
                    plan.highlight
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]"
                      : "bg-white/5 border border-white/[0.08] text-slate-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <CreditCard size={16} />
                  Começar com {plan.name}
                  {plan.highlight && <Rocket size={14} />}
                </motion.button>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    }),
  }}
/>
        {/* ── TABELA COMPARATIVA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#080808] border border-white/5 rounded-3xl overflow-hidden mb-16"
        >
          <div className="p-6 border-b border-white/5">
            <h3 className="text-lg font-bold text-white">Comparação completa</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-sm text-slate-500 font-medium w-1/2">Recurso</th>
                  {pricingPlans.map((p) => (
                    <th key={p.name} className="p-4 text-sm font-bold text-center">
                      <span className={p.highlight ? "text-cyan-400" : "text-slate-300"}>{p.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-sm text-slate-400">{row.feature}</td>
                    {/* ícone de check ou X para cada plano */}
                    <td className="p-4 text-center">
                      {row.basic   ? <CheckCircle2 size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-slate-700 mx-auto" />}
                    </td>
                    <td className="p-4 text-center">
                      {row.pro     ? <CheckCircle2 size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-slate-700 mx-auto" />}
                    </td>
                    <td className="p-4 text-center">
                      {row.premium ? <CheckCircle2 size={16} className="text-cyan-400 mx-auto"    /> : <X size={16} className="text-slate-700 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── FAQ ── */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel>Dúvidas</SectionLabel>
            <h3 className="text-3xl font-bold tracking-tight">Perguntas Frequentes</h3>
          </div>

          <div className="bg-[#080808] border border-white/5 rounded-3xl p-8">
            {faqData.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} index={i} />
            ))}
          </div>

          {/* CTA de dúvidas extras */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-slate-500 text-sm mb-4">Ainda tem dúvidas?</p>
            <button
              onClick={() => window.open("https://wa.me/5511916474626", "_blank")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
            >
              <MessageCircle size={16} className="text-emerald-400" />
              Falar com especialista no WhatsApp
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}