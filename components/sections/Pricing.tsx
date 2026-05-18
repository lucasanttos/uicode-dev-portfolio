"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  X,
} from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientText from "@/components/ui/GradientText";
import FAQItem from "@/components/ui/FAQItem";
import { pricingPlans, comparisonFeatures, faqData } from "@/lib/data";
import type { PricingPlan } from "@/lib/data";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

/*
  Textos emocionais de apoio para cada plano.
  Eles não alteram os dados principais do plano, apenas melhoram a percepção de valor.
  Se quiser personalizar, edite os textos abaixo.
*/
const emotionalPlanCopy = [
  {
    promise: "Para sair do improviso",
    emotion:
      "Ideal para quem precisa parar de depender só do Instagram e quer uma presença mais profissional.",
    cta: "Quero começar do jeito certo",
  },
  {
    promise: "Para vender com mais confiança",
    emotion:
      "O equilíbrio perfeito para negócios que querem parecer maiores, gerar mais contatos e transmitir autoridade.",
    cta: "Quero profissionalizar minha marca",
  },
  {
    promise: "Para dominar sua presença digital",
    emotion:
      "Para quem quer uma estrutura mais completa, visual mais forte e uma experiência capaz de impressionar.",
    cta: "Quero acelerar meu crescimento",
  },
];

/*
  Argumentos de decisão.
  Esses cards reforçam a dor e o desejo antes da compra.
*/
const decisionTriggers = [
  {
    icon: Timer,
    title: "Seu cliente decide em segundos",
    text: "Antes de chamar no WhatsApp, ele olha seu site e decide se confia ou não na sua empresa.",
  },
  {
    icon: TrendingUp,
    title: "Visual profissional vende valor",
    text: "Uma presença digital bem construída aumenta a percepção de preço, qualidade e autoridade.",
  },
  {
    icon: ShieldCheck,
    title: "Menos amadorismo, mais confiança",
    text: "Um site moderno passa segurança e faz sua marca parecer preparada para atender melhor.",
  },
];

export default function Pricing() {
  /*
    Ao clicar no botão do plano:
    - Se tiver link de pagamento, abre o link.
    - Se não tiver, abre WhatsApp com mensagem pronta.
  */
  const handleSubscribe = (plan: PricingPlan) => {
    if (plan.paymentLink?.startsWith("http")) {
      window.open(plan.paymentLink, "_blank");
      return;
    }

    const message = encodeURIComponent(
      `Olá, UiCode! 👋\n\nQuero dar o próximo passo e tenho interesse no *Plano ${plan.name}* (${plan.price}${plan.cents}/mês).\n\nPode me orientar sobre a melhor opção para o meu negócio?`,
    );

    window.open(`https://wa.me/5511916474626?text=${message}`, "_blank");
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#020204] py-24 sm:py-28 lg:py-36"
    >
      {/* Fundo premium com grid e glows. */}
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

      <div className="pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-180px] top-1/3 h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-pink-500/[0.055] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        {/* Cabeçalho principal com mais desejo e menos linguagem técnica. */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <SectionLabel>Planos</SectionLabel>

          <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            O plano certo para sua marca{" "}
            <GradientText
              text="parecer maior"
              from="from-cyan-300"
              via="via-white"
              to="to-violet-300"
            />
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Seu site não deve ser apenas bonito. Ele precisa fazer o cliente
            sentir confiança, entender seu valor e ter vontade de chamar você.
          </p>
        </motion.div>

        {/* Cards de gatilhos antes dos preços. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 grid gap-3 sm:grid-cols-3 lg:mb-14"
        >
          {decisionTriggers.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-xl"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
                <Icon size={18} className="text-cyan-200" />
              </div>
              <p className="text-sm font-black text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </motion.div>

        {/* Frase de transição emocional para compra. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-10 max-w-3xl rounded-3xl border border-white/[0.08] bg-white/[0.035] p-5 text-center backdrop-blur-xl sm:p-6"
        >
          <p className="text-sm font-semibold leading-7 text-slate-300 sm:text-base">
            A dúvida não é se sua empresa precisa estar melhor no digital.
            A dúvida é quanto tempo você ainda quer perder passando uma imagem
            menor do que o seu negócio realmente entrega.
          </p>
        </motion.div>

        {/* Cards de planos. */}
        <div className="mb-16 grid items-stretch gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const planCopy = emotionalPlanCopy[index] ?? emotionalPlanCopy[1];

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 34, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "relative",
                  plan.highlight && "lg:-mt-4 lg:mb-4",
                )}
              >
                {/* Brilho especial no plano destacado. */}
                {plan.highlight && (
                  <>
                    <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-cyan-400/35 via-blue-500/15 to-transparent blur-lg" />
                    <div className="pointer-events-none absolute -top-8 left-1/2 hidden h-24 w-52 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl lg:block" />
                  </>
                )}

                <SpotlightCard
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 sm:p-8",
                    plan.highlight
                      ? "border-cyan-400/45 bg-cyan-400/[0.035] shadow-[0_0_70px_rgba(6,182,212,0.16)]"
                      : "hover:border-white/12 bg-white/[0.025]",
                  )}
                  spotlightColor={
                    plan.highlight
                      ? "rgba(6,182,212,0.14)"
                      : "rgba(255,255,255,0.055)"
                  }
                >
                  {/* Badge do plano em destaque. */}
                  {plan.highlight && (
                    <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-[0_0_26px_rgba(6,182,212,0.5)]">
                      <Star size={10} className="fill-white" />
                      Mais escolhido
                    </div>
                  )}

                  {/* Label emocional do plano. */}
                  <div className="mb-5 pt-2">
                    <div
                      className={cn(
                        "mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em]",
                        plan.highlight
                          ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-200"
                          : "border-white/[0.08] bg-white/[0.04] text-slate-400",
                      )}
                    >
                      <Sparkles size={12} />
                      {planCopy.promise}
                    </div>

                    <h3 className="text-2xl font-black tracking-tight text-white">
                      {plan.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {plan.description}
                    </p>

                    <p className="mt-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4 text-sm leading-6 text-slate-300">
                      {planCopy.emotion}
                    </p>
                  </div>

                  {/* Preço com mais percepção de investimento. */}
                  <div className="mb-7 border-b border-white/5 pb-7">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                      Investimento mensal
                    </p>

                    <div className="flex items-start gap-1">
                      <span className="mt-2 text-lg text-slate-400">R$</span>
                      <span className="text-5xl font-black tracking-tighter text-white">
                        {plan.price.replace("R$ ", "")}
                      </span>
                      <div className="mb-1 flex flex-col justify-end">
                        <span className="text-xl font-black text-white">
                          {plan.cents}
                        </span>
                        <span className="text-xs text-slate-500">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-slate-500">
                      Menos do que perder bons clientes por parecer amador no digital.
                    </p>
                  </div>

                  {/* Lista de features incluídas. */}
                  <ul className="mb-4 flex-1 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2.5 text-sm leading-6 text-slate-300"
                      >
                        <CheckCircle2
                          size={16}
                          className={cn(
                            "mt-0.5 shrink-0",
                            plan.highlight
                              ? "text-cyan-300"
                              : "text-emerald-400",
                          )}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}

                    {plan.notIncluded.map((feature, featureIndex) => (
                      <li
                        key={`not-${featureIndex}`}
                        className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                      >
                        <X size={16} className="mt-0.5 shrink-0 text-slate-700" />
                        <span className="line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mini garantia/percepção de segurança. */}
                  <div className="mt-5 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.045] p-4">
                    <div className="flex items-start gap-3">
                      <BadgeCheck
                        size={18}
                        className="mt-0.5 shrink-0 text-emerald-300"
                      />
                      <p className="text-xs leading-5 text-slate-400">
                        Você conversa antes de fechar e recebe orientação para
                        escolher o plano mais adequado ao seu momento.
                      </p>
                    </div>
                  </div>

                  {/* Botão de compra. */}
                  <motion.button
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubscribe(plan)}
                    className={cn(
                      "group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 text-sm font-black transition-all duration-300",
                      plan.highlight
                        ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-[0_0_34px_rgba(6,182,212,0.34)] hover:shadow-[0_0_58px_rgba(6,182,212,0.55)]"
                        : "border border-white/[0.09] bg-white/[0.055] text-slate-200 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <CreditCard size={16} />
                      {planCopy.cta}
                      {plan.highlight ? (
                        <Rocket size={15} />
                      ) : (
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      )}
                    </span>

                    <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </motion.button>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* JSON-LD do FAQ.
            Mantido aqui para preservar a estrutura SEO já existente. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqData.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />

        {/* Tabela comparativa. */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 overflow-hidden rounded-3xl border border-white/[0.07] bg-[#080808]/90 shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <div className="border-b border-white/[0.06] p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-600">
              Comparação
            </p>
            <h3 className="mt-2 text-xl font-black text-white">
              Veja exatamente o que cada plano entrega
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Compare os recursos com calma e escolha o plano que faz mais sentido
              para o momento atual da sua empresa.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="w-1/2 p-4 text-left text-sm font-medium text-slate-500">
                    Recurso
                  </th>

                  {pricingPlans.map((plan) => (
                    <th key={plan.name} className="p-4 text-center text-sm font-black">
                      <span
                        className={plan.highlight ? "text-cyan-300" : "text-slate-300"}
                      >
                        {plan.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-white/[0.035] transition-colors hover:bg-white/[0.025]"
                  >
                    <td className="p-4 text-sm text-slate-400">{row.feature}</td>

                    <td className="p-4 text-center">
                      {row.basic ? (
                        <CheckCircle2 size={16} className="mx-auto text-emerald-400" />
                      ) : (
                        <X size={16} className="mx-auto text-slate-700" />
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {row.pro ? (
                        <CheckCircle2 size={16} className="mx-auto text-emerald-400" />
                      ) : (
                        <X size={16} className="mx-auto text-slate-700" />
                      )}
                    </td>

                    <td className="p-4 text-center">
                      {row.premium ? (
                        <CheckCircle2 size={16} className="mx-auto text-cyan-300" />
                      ) : (
                        <X size={16} className="mx-auto text-slate-700" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA emocional antes do FAQ. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7 }}
          className="mb-16 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.10] via-white/[0.035] to-violet-400/[0.09] p-6 text-center shadow-2xl shadow-cyan-950/20 sm:p-8"
        >
          <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
            <Rocket size={20} className="text-cyan-200" />
          </div>

          <h3 className="mx-auto max-w-2xl text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
            Sua empresa pode continuar sendo vista como comum, ou começar a ser
            percebida como uma marca profissional.
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            O site certo não muda apenas a aparência. Ele muda a forma como o
            cliente enxerga seu negócio antes mesmo de conversar com você.
          </p>

          <button
            type="button"
            onClick={() => window.open("https://wa.me/5511916474626", "_blank")}
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-black transition-transform hover:scale-[1.03]"
          >
            Quero uma recomendação de plano
            <MessageCircle size={16} />
          </button>
        </motion.div>

        {/* FAQ. */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <SectionLabel>Dúvidas</SectionLabel>
            <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
              Perguntas frequentes
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Respostas rápidas para você decidir com mais segurança.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.07] bg-[#080808]/90 p-5 backdrop-blur-xl sm:p-8">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.q}
                answer={item.a}
                index={index}
              />
            ))}
          </div>

          {/* CTA final de dúvidas extras. */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="mb-4 text-sm text-slate-500">
              Ainda não sabe qual plano escolher?
            </p>

            <button
              type="button"
              onClick={() => window.open("https://wa.me/5511916474626", "_blank")}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
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