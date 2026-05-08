import {
  ShoppingBag,
  Layout,
  Smartphone,
  BarChart,
  TrendingUp,
  Star,
  Server,
  Layers,
  Target,
  Rocket,
  Clock,
} from "lucide-react";
import type { JSX } from "react";

// ── TIPOS ────

export interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;      // cor do texto ex: "text-cyan-400"
  bg: string;         // cor de fundo ex: "bg-cyan-400/5"
  border: string;     // cor da borda ex: "border-cyan-400/10"
  glow: string;       // cor do brilho ao passar o mouse
  tag: string;        // badge pequeno ex: "Alta Conversão"
}

export interface Stat {
  value: number;      // número que vai contar animado
  suffix: string;     // o que vem depois ex: "+" ou "%"
  prefix?: string;    // o que vem antes ex: "até "
  label: string;      // texto embaixo do número
  icon: React.ElementType;
}

export interface Project {
  id: number;
  title: string;
  category: string;   // tipo do projeto
  result: string;     // resultado alcançado ex: "+180% em agendamentos"
  description: string;
  tech: string[];     // tecnologias usadas
  color: string;      // gradiente do brilho da imagem
  textAccent: string; // cor do número do projeto ex: "text-emerald-400"
  link: string;       // link para visitar o projeto
  image: string;      // caminho da imagem em /public
}

export interface Skill {
  name: string;
  level: number; // de 0 a 100 - percentual da barra de progresso
}

export interface PricingPlan {
  name: string;
  price: string;
  cents: string;       // ex: ",90"
  period: string;      // ex: "/ mês"
  description: string;
  features: string[];     // o que está incluso
  notIncluded: string[];  // o que NÃO está incluso (aparece riscado)
  highlight: boolean;     // se true, destaca o card como recomendado
  badge?: string;         // texto do badge ex: "MAIOR ROI"
  color: string;
  buttonVariant: "primary" | "ghost";
  paymentLink: string;    // link do Stripe para pagamento
}

export interface ComparisonFeature {
  feature: string;  // nome do recurso
  basic: boolean;   // disponível no básico?
  pro: boolean;     // disponível no pro?
  premium: boolean; // disponível no premium?
}

export interface FAQItem {
  q: string; // pergunta
  a: string; // resposta
}

export interface MarqueeItem {
  text: string;
  icon: React.ElementType;
}

export interface PolicyContent {
  terms: JSX.Element;
  privacy: JSX.Element;
  cancellation: JSX.Element;
}

// ── SERVIÇOS ───
// Cards da seção "O que eu construo" - 

export const services: Service[] = [
  {
    title: "E-commerce & Lojas Virtuais",
    description:
      "Máquinas de vendas que funcionam 24/7. Checkout otimizado, integrações de pagamento e experiência de compra que converte visitantes em compradores.",
    icon: ShoppingBag,
    color: "text-cyan-400",
    bg: "bg-cyan-400/5",
    border: "border-cyan-400/10",
    glow: "rgba(6,182,212,0.15)",
    tag: "Alta Conversão",
  },
  {
    title: "Sites & Landing Pages",
    description:
      "Identidade digital que gera autoridade. Páginas estratégicas com copywriting de conversão, SEO técnico e design que transforma visitantes em clientes.",
    icon: Layout,
    color: "text-violet-400",
    bg: "bg-violet-400/5",
    border: "border-violet-400/10",
    glow: "rgba(139,92,246,0.15)",
    tag: "SEO Incluso",
  },
  {
    title: "Aplicativos Mobile",
    description:
      "Seu negócio no bolso do cliente. Apps iOS e Android com UX intuitiva, performance nativa e funcionalidades que criam experiências memoráveis.",
    icon: Smartphone,
    color: "text-pink-400",
    bg: "bg-pink-400/5",
    border: "border-pink-400/10",
    glow: "rgba(236,72,153,0.15)",
    tag: "iOS & Android",
  },
  {
    title: "Sistemas & Dashboards",
    description:
      "Automação que libera seu tempo. Sistemas web sob medida com painéis inteligentes, relatórios em tempo real e integrações que eliminam processos manuais.",
    icon: BarChart,
    color: "text-emerald-400",
    bg: "bg-emerald-400/5",
    border: "border-emerald-400/10",
    glow: "rgba(52,211,153,0.15)",
    tag: "Automatizado",
  },
];

// ── ESTATÍSTICAS ──────
// Os 4 números animados que aparecem logo abaixo do marquee
// value = número final da animação

export const stats: Stat[] = [
  { value: 47, suffix: "+", label: "Projetos Entregues", icon: Rocket },
  { value: 100, suffix: "%", label: "Taxa de Satisfação", icon: Star },
  {
    value: 3,
    suffix: "x",
    prefix: "até ",
    label: "Aumento em Conversão",
    icon: TrendingUp,
  },
  { value: 24, suffix: "h", label: "Suporte VIP", icon: Clock },
];

// ── PROJETOS / CASES ────

export const projects: Project[] = [
  {
    id: 1,
    title: "Dr. Pedro Elino",
    category: "Site Institucional Premium",
    result: "Página 1 do Google",
    description:
      "Identidade digital de autoridade máxima para cirurgião-dentista. Design 'Dark & Clean' que transmite sofisticação, combinado com SEO técnico avançado que conquistou a primeira página do Google em 60 dias.",
    tech: ["Next.js", "SEO Local", "Web Performance"],
    color: "from-blue-500 to-indigo-600",
    textAccent: "text-blue-400",
    link: "https://drpedro-elino.vercel.app/", 
    image: "/drpedro.png",
  },
  {
    id: 2,
    title: "FL Sports",
    category: "E-commerce Premium",
    result: "Alta Conversão e Top 1 Google",
    description: "E-commerce de alta performance focado em maximizar vendas. Possui carrinho inteligente com cálculo automático de taxas, sistema de combos para aumento de ticket médio e um fluxo de checkout fluido integrado diretamente ao WhatsApp da loja.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    color: "from-zinc-900 to-black",
    textAccent: "text-white",
    link: "https://www.flsports.store/",
    image: "/flsports.jpg",
  },
  {
    id: 3,
    title: "Pet Green Veterinária",
    category: "Landing Page de Alta Conversão",
    result: "+180% em agendamentos",
    description:
      "Presença digital completa para clínica veterinária premium. Estratégia focada em conversão mobile com integração WhatsApp, UX simplificada e gatilhos de confiança que triplicaram os agendamentos online.",
    tech: ["React", "UI/UX Design", "WhatsApp API"],
    color: "from-emerald-500 to-teal-600",
    textAccent: "text-emerald-400",
    link: "https://pet-green.netlify.app", 
    image: "/petgreen.png",
  },
  {
    id: 4,
    title: "La Famille Tattoo",
    category: "Plataforma de Agendamento",
    result: "Leads 5x mais qualificados",
    description:
      "Muito além de um portfólio bonito. Sistema inteligente de triagem que filtra clientes e entrega apenas leads qualificados para o estúdio, eliminando conversas improdutivas e aumentando o ticket médio.",
    tech: ["React SPA", "Automação", "CRO"],
    color: "from-amber-500 to-orange-600",
    textAccent: "text-amber-400",
    link: "https://fernandeswebsite.netlify.app/",
    image: "/tattoo.png",
  },
];

// ── HABILIDADES ────
// Barras de progresso da seção de tecnologia
// level = percentual da barra (0-100)

export const skills: Skill[] = [
  { name: "React & Next.js", level: 95 },
  { name: "Design UI/UX", level: 92 },
  { name: "E-commerce", level: 90 },
  { name: "SEO Técnico", level: 88 },
  { name: "Node.js & APIs", level: 85 },
  { name: "Mobile (iOS/Android)", level: 82 },
  { name: "Identidade Visual", level: 88 },
  { name: "Performance Web", level: 93 },
];

// Tags de tecnologia que aparecem embaixo das barras
export const techStack: string[] = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Framer Motion",
  "Stripe",
  "Firebase",
  "PostgreSQL",
  "MongoDB",
  "Vercel",
  "AWS",
];

// ── PLANOS DE PREÇO ────
// Seção de pricing - 3 cards de plano
// highlight: true = card destacado (recomendado)

export const pricingPlans: PricingPlan[] = [
  {
    name: "Básico",
    price: "R$ 99",
    cents: ",90",
    period: "/ mês",
    description: "Presença digital profissional sem complicação",
    features: [
      "Site profissional completo",
      "Hospedagem inclusa",
      "SSL (cadeado de segurança)",
      "Botão WhatsApp integrado",
      "Domínio padrão (.vercel.app)",
      "Suporte por e-mail",
    ],
    // esses itens aparecem riscados no card
    notIncluded: [
      "SEO otimizado",
      "Domínio próprio (.com.br)",
      "Suporte WhatsApp VIP",
    ],
    highlight: false,
    color: "border-white/8",
    buttonVariant: "ghost",
    paymentLink: "https://buy.stripe.com/eVq3cnfJl1wVbqc9582oE05",
  },
  {
    name: "Pro",
    price: "R$ 149",
    cents: ",90",
    period: "/ mês",
    description: "Mais visibilidade e mais contatos qualificados",
    features: [
      "Tudo do Básico",
      "SEO otimizado para Google",
      "WhatsApp com mensagens prontas",
      "Alterações ilimitadas de conteúdo",
      "Relatório mensal de visitas",
      "Suporte rápido por chat",
    ],
    notIncluded: [
      "Domínio próprio (.com.br)",
      "Suporte WhatsApp VIP",
    ],
    highlight: false,
    color: "border-blue-500/20",
    buttonVariant: "ghost",
    paymentLink: "https://buy.stripe.com/aFafZ9fJl4J72TG4OS2oE06",
  },
  {
    name: "Premium",
    price: "R$ 199",
    cents: ",90",
    period: "/ mês",
    description: "Máxima performance, conversão e autoridade digital",
    features: [
      "Tudo do Pro",
      "Domínio próprio (.com.br)",
      "Design exclusivo personalizado",
      "Foco em conversão (CRO)",
      "Relatórios detalhados de performance",
      "Suporte VIP direto no WhatsApp",
      "Prioridade em atualizações",
    ],
    notIncluded: [], // premium tem tudo, lista vazia
    highlight: true, // esse é o card destacado
    badge: "MAIOR ROI",
    color: "border-cyan-500/50",
    buttonVariant: "primary",
    paymentLink: "https://buy.stripe.com/28E9ALcx96RfgKwftw2oE04",
  },
];

// ── TABELA COMPARATIVA ────
// Tabela que fica abaixo dos cards de plano
// true = tem o recurso, false = não tem (aparece um X)

export const comparisonFeatures: ComparisonFeature[] = [
  { feature: "Site profissional",        basic: true,  pro: true,  premium: true  },
  { feature: "Hospedagem inclusa",       basic: true,  pro: true,  premium: true  },
  { feature: "Botão WhatsApp",           basic: true,  pro: true,  premium: true  },
  { feature: "Certificado SSL",          basic: true,  pro: true,  premium: true  },
  { feature: "SEO para Google",          basic: false, pro: true,  premium: true  },
  { feature: "Alterações de conteúdo",   basic: false, pro: true,  premium: true  },
  { feature: "Relatórios de visitas",    basic: false, pro: true,  premium: true  },
  { feature: "Domínio próprio (.com.br)",basic: false, pro: false, premium: true  },
  { feature: "Suporte WhatsApp VIP",     basic: false, pro: false, premium: true  },
  { feature: "Design exclusivo",         basic: false, pro: false, premium: true  },
];

// ── PERGUNTAS FREQUENTES ────
// FAQ que aparece abaixo da tabela de planos
// q = pergunta, a = resposta

export const faqData: FAQItem[] = [
  {
    q: "Quanto tempo leva para ficar pronto?",
    a: "Sites e landing pages ficam prontos em 7 a 14 dias úteis. Projetos mais complexos como e-commerces e aplicativos têm prazo estimado na proposta. Trabalhamos de forma ágil sem abrir mão da qualidade.",
  },
  {
    q: "Preciso ter domínio e hospedagem?",
    a: "Não. Nos planos Pro e Premium, cuidamos de tudo: registro do domínio, hospedagem e configuração técnica completa. Você foca no seu negócio, nós cuidamos da tecnologia.",
  },
  {
    q: "O site funciona bem no celular?",
    a: "Sim, 100%. Todos os projetos são desenvolvidos com design responsivo, garantindo experiência perfeita em celular, tablet e computador. Hoje mais de 70% dos acessos vêm do mobile.",
  },
  {
    q: "Posso mudar de plano depois?",
    a: "Claro! Você pode fazer upgrade ou downgrade do plano a qualquer momento, sem burocracia. A mudança é aplicada no próximo ciclo de cobrança.",
  },
  {
    q: "Como funciona o suporte?",
    a: "No plano Básico o suporte é por e-mail (resposta em até 48h). No Pro, suporte por chat (até 24h). No Premium, você tem meu WhatsApp direto com prioridade máxima de atendimento.",
  },
  {
    q: "Tem contrato de fidelidade?",
    a: "Não. A assinatura é mensal e pode ser cancelada quando quiser, sem multas ou taxas. Seu site permanece ativo até o final do período já pago.",
  },
];

// ── MARQUEE ─────
// Faixa animada que rola infinitamente entre o hero e as stats
// Posso adicionar ou remover itens aqui

export const marqueeItems: MarqueeItem[] = [
  { text: "LOJAS VIRTUAIS",    icon: ShoppingBag },
  { text: "APLICATIVOS MOBILE", icon: Smartphone  },
  { text: "LANDING PAGES",     icon: Layout       },
  { text: "E-COMMERCE",        icon: TrendingUp   },
  { text: "IDENTIDADE DIGITAL", icon: Star        },
  { text: "SISTEMAS WEB",      icon: Server       },
  { text: "UX/UI DESIGN",      icon: Layers       },
  { text: "OTIMIZAÇÃO SEO",    icon: Target       },
];

// ── POLÍTICAS ───

export const policyContent: PolicyContent = {
  terms: (
    <div className="space-y-5">
      <p>
        <strong className="text-white">1. Aceitação dos Termos</strong>
        <br />
        Ao contratar qualquer serviço da UiCode.site, o usuário declara ter
        lido, compreendido e concordado com estes Termos de Uso em sua totalidade.
      </p>
      <p>
        <strong className="text-white">2. Serviços Prestados</strong>
        <br />
        A UiCode.site oferece criação, hospedagem, manutenção e otimização de
        presença digital, conforme descrito em cada plano contratado. Serviços
        adicionais serão orçados separadamente.
      </p>
      <p>
        <strong className="text-white">3. Responsabilidade do Contratante</strong>
        <br />
        O cliente é responsável pela veracidade e legalidade de todo conteúdo
        fornecido (textos, imagens, logotipos), garantindo que possui direitos
        de uso sobre os materiais.
      </p>
      <p>
        <strong className="text-white">4. Propriedade Intelectual</strong>
        <br />
        O código e design desenvolvidos pertencem à UiCode.site até o pagamento
        integral do projeto. Assinaturas mensais concedem licença de uso, não
        transferência de propriedade.
      </p>
    </div>
  ),
  privacy: (
    <div className="space-y-5">
      <p>
        <strong className="text-white">1. Dados Coletados</strong>
        <br />
        Coletamos apenas informações necessárias para prestação do serviço:
        nome, e-mail, telefone e dados da empresa. Não compartilhamos
        informações com terceiros sem consentimento.
      </p>
      <p>
        <strong className="text-white">2. Processamento de Pagamentos</strong>
        <br />
        Pagamentos são processados pela Stripe, plataforma certificada PCI-DSS.
        A UiCode.site não armazena dados de cartão de crédito em nenhuma hipótese.
      </p>
      <p>
        <strong className="text-white">3. Cookies</strong>
        <br />
        Utilizamos cookies para análise de desempenho e melhoria da experiência.
        Você pode desativá-los nas configurações do navegador a qualquer momento.
      </p>
      <p>
        <strong className="text-white">4. LGPD</strong>
        <br />
        Seguimos as diretrizes da Lei Geral de Proteção de Dados. Para exercer
        seus direitos de acesso, correção ou exclusão de dados, entre em contato
        pelo e-mail contato@uicode.site.
      </p>
    </div>
  ),
  cancellation: (
    <div className="space-y-5">
      <p>
        <strong className="text-white">1. Cancelamento da Assinatura</strong>
        <br />
        O cancelamento pode ser solicitado a qualquer momento via painel do
        cliente, e-mail ou WhatsApp, sem necessidade de justificativa.
      </p>
      <p>
        <strong className="text-white">2. Efeitos do Cancelamento</strong>
        <br />
        O serviço permanece ativo até o fim do período faturado. Após o
        encerramento, o site será suspenso em até 7 dias úteis.
      </p>
      <p>
        <strong className="text-white">3. Reembolso</strong>
        <br />
        Solicitações de reembolso em até 7 dias após a contratação serão
        analisadas caso a caso. Após início do desenvolvimento, não há reembolso
        do período vigente.
      </p>
      <p>
        <strong className="text-white">4. Exportação de Dados</strong>
        <br />
        Ao cancelar, o cliente pode solicitar exportação do conteúdo do site em
        até 30 dias após o encerramento do contrato.
      </p>
    </div>
  ),
};