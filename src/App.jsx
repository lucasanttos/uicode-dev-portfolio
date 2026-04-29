import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useMotionTemplate, 
  useMotionValue,
  AnimatePresence,
  useInView,
  useTransform
} from 'framer-motion';

import { 
  Code, Layout, Smartphone, Server, Globe, 
  Github, Linkedin, Instagram, ShoppingBag, 
  Menu, X, Send, Zap, ArrowRight, CheckCircle2, 
  HelpCircle, ChevronDown, Star, Rocket,
  FileText, Shield, RefreshCw, CreditCard, Sparkles, BarChart,
  TrendingUp, Users, Award, Clock, MessageCircle, Play,
  ExternalLink, ChevronRight, MousePointer, Target, Layers
} from 'lucide-react';

// ==================================================================================
// UTILITÁRIOS
// ==================================================================================

const cn = (...classes) => classes.filter(Boolean).join(' ');

// ==================================================================================
// COMPONENTES VISUAIS BASE
// ==================================================================================

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(6, 182, 212, 0.12)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/5 bg-[#080808] overflow-hidden rounded-3xl",
        "transition-all duration-500 hover:border-white/10",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const ShinyButton = ({ children, onClick, className = "", icon: Icon, variant = "primary" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_auto] hover:bg-right-bottom shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]",
    white: "bg-white text-black hover:bg-cyan-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    ghost: "border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl px-8 py-4 font-bold text-white transition-all duration-500",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {children}
        {Icon && <Icon size={18} />}
      </span>
      {variant === "primary" && (
        <motion.div
          initial={{ x: "-100%", skewX: "-15deg" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      )}
    </motion.button>
  );
};

const GradientText = ({ text, className = "", from = "from-cyan-400", via = "via-blue-400", to = "to-purple-500" }) => (
  <span className={cn(`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent`, className)}>
    {text}
  </span>
);

const Badge = ({ children, className = "" }) => (
  <div className={cn(
    "inline-flex items-center gap-2 px-4 py-2 rounded-full",
    "bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest",
    "backdrop-blur-sm",
    className
  )}>
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
    </span>
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 justify-center mb-4">
    <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500"></div>
    <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs">{children}</span>
    <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500"></div>
  </div>
);

// Contador animado
const AnimatedCounter = ({ value, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

// Marquee
const InfiniteMarquee = () => {
  const items = [
    { text: "LOJAS VIRTUAIS", icon: ShoppingBag },
    { text: "APLICATIVOS MOBILE", icon: Smartphone },
    { text: "LANDING PAGES", icon: Layout },
    { text: "E-COMMERCE", icon: TrendingUp },
    { text: "IDENTIDADE DIGITAL", icon: Star },
    { text: "SISTEMAS WEB", icon: Server },
    { text: "UX/UI DESIGN", icon: Layers },
    { text: "OTIMIZAÇÃO SEO", icon: Target },
  ];
  const repeated = [...items, ...items, ...items];

  return (
    <div className="w-full border-y border-white/5 py-5 overflow-hidden flex whitespace-nowrap relative z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303] z-10 pointer-events-none"></div>
      <motion.div
        className="flex gap-10 items-center"
        animate={{ x: [0, -1200] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-10 shrink-0">
              <div className="flex items-center gap-3">
                <Icon size={13} className="text-cyan-500/60" />
                <span className="text-xs font-bold text-slate-500 tracking-[0.25em]">{item.text}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10"></div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

// FAQ Item
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left group"
      >
        <span className={cn(
          "font-semibold text-base transition-colors pr-8",
          isOpen ? "text-cyan-400" : "text-slate-200 group-hover:text-white"
        )}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors",
            isOpen ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 bg-white/5"
          )}
        >
          <ChevronRight size={14} className={isOpen ? "text-cyan-400" : "text-slate-400"} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 text-sm leading-relaxed pr-10">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Modal
const PolicyModal = ({ isOpen, onClose, title, content }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#080808] border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-3xl shadow-2xl flex flex-col z-[101]"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#080808] rounded-t-3xl z-10">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
            >
              <X size={18} />
            </motion.button>
          </div>
          <div className="p-6 overflow-y-auto text-slate-400 text-sm leading-relaxed space-y-4">
            {content}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// ==================================================================================
// DADOS
// ==================================================================================

const services = [
  {
    title: "E-commerce & Lojas Virtuais",
    description: "Máquinas de vendas que funcionam 24/7. Checkout otimizado, integrações de pagamento e experiência de compra que converte visitantes em compradores.",
    icon: ShoppingBag,
    color: "text-cyan-400",
    bg: "bg-cyan-400/5",
    border: "border-cyan-400/10",
    glow: "rgba(6,182,212,0.15)",
    tag: "Alta Conversão"
  },
  {
    title: "Sites & Landing Pages",
    description: "Identidade digital que gera autoridade. Páginas estratégicas com copywriting de conversão, SEO técnico e design que transforma visitantes em clientes.",
    icon: Layout,
    color: "text-violet-400",
    bg: "bg-violet-400/5",
    border: "border-violet-400/10",
    glow: "rgba(139,92,246,0.15)",
    tag: "SEO Incluso"
  },
  {
    title: "Aplicativos Mobile",
    description: "Seu negócio no bolso do cliente. Apps iOS e Android com UX intuitiva, performance nativa e funcionalidades que criam experiências memoráveis.",
    icon: Smartphone,
    color: "text-pink-400",
    bg: "bg-pink-400/5",
    border: "border-pink-400/10",
    glow: "rgba(236,72,153,0.15)",
    tag: "iOS & Android"
  },
  {
    title: "Sistemas & Dashboards",
    description: "Automação que libera seu tempo. Sistemas web sob medida com painéis inteligentes, relatórios em tempo real e integrações que eliminam processos manuais.",
    icon: BarChart,
    color: "text-emerald-400",
    bg: "bg-emerald-400/5",
    border: "border-emerald-400/10",
    glow: "rgba(52,211,153,0.15)",
    tag: "Automatizado"
  }
];

const stats = [
  { value: 47, suffix: "+", label: "Projetos Entregues", icon: Rocket },
  { value: 100, suffix: "%", label: "Taxa de Satisfação", icon: Star },
  { value: 3, suffix: "x", prefix: "até ", label: "Aumento em Conversão", icon: TrendingUp },
  { value: 24, suffix: "h", label: "Suporte VIP", icon: Clock },
];

const projects = [
  {
    id: 1,
    title: "Pet Green Veterinária",
    category: "Landing Page de Alta Conversão",
    result: "+180% em agendamentos",
    description: "Presença digital completa para clínica veterinária premium. Estratégia focada em conversão mobile com integração WhatsApp, UX simplificada e gatilhos de confiança que triplicaram os agendamentos online.",
    tech: ["React", "UI/UX Design", "WhatsApp API"],
    color: "from-emerald-500 to-teal-600",
    textAccent: "text-emerald-400",
    link: "#",
    image: "/petgreen.png"
  },
  {
    id: 2,
    title: "Dr. Pedro Elino",
    category: "Site Institucional Premium",
    result: "Página 1 do Google",
    description: "Identidade digital de autoridade máxima para cirurgião-dentista. Design 'Dark & Clean' que transmite sofisticação, combinado com SEO técnico avançado que conquistou a primeira página do Google em 60 dias.",
    tech: ["Next.js", "SEO Local", "Web Performance"],
    color: "from-blue-500 to-indigo-600",
    textAccent: "text-blue-400",
    link: "#",
    image: "/drpedro.png"
  },
  {
    id: 3,
    title: "La Famille Tattoo",
    category: "Plataforma de Agendamento",
    result: "Leads 5x mais qualificados",
    description: "Muito além de um portfólio bonito. Sistema inteligente de triagem que filtra clientes e entrega apenas leads qualificados para o estúdio, eliminando conversas improdutivas e aumentando o ticket médio.",
    tech: ["React SPA", "Automação", "CRO"],
    color: "from-amber-500 to-orange-600",
    textAccent: "text-amber-400",
    link: "https://fernandeswebsite.netlify.app/",
    image: "/tattoo.png"
  },
];

const skills = [
  { name: "React & Next.js", level: 95 },
  { name: "Design UI/UX", level: 92 },
  { name: "E-commerce", level: 90 },
  { name: "SEO Técnico", level: 88 },
  { name: "Node.js & APIs", level: 85 },
  { name: "Mobile (iOS/Android)", level: 82 },
  { name: "Identidade Visual", level: 88 },
  { name: "Performance Web", level: 93 },
];

const techStack = [
  "React.js", "Next.js", "TypeScript", "Node.js",
  "Tailwind CSS", "Framer Motion", "Stripe", "Firebase",
  "PostgreSQL", "MongoDB", "Vercel", "AWS"
];

const pricingPlans = [
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
      "Domínio padrão (.netlify.app)",
      "Suporte por e-mail",
    ],
    notIncluded: [
      "SEO otimizado",
      "Domínio próprio (.com.br)",
      "Suporte WhatsApp VIP",
    ],
    highlight: false,
    color: "border-white/8",
    buttonVariant: "ghost",
    paymentLink: "https://buy.stripe.com/eVq3cnfJl1wVbqc9582oE05"
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
    color: "border-blue-500/20 hover:border-blue-500/40",
    buttonVariant: "ghost",
    paymentLink: "https://buy.stripe.com/aFafZ9fJl4J72TG4OS2oE06"
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
    notIncluded: [],
    highlight: true,
    badge: "MAIOR ROI",
    color: "border-cyan-500/50",
    buttonVariant: "primary",
    paymentLink: "https://buy.stripe.com/28E9ALcx96RfgKwftw2oE04"
  },
];

const comparisonFeatures = [
  { feature: "Site profissional", basic: true, pro: true, premium: true },
  { feature: "Hospedagem inclusa", basic: true, pro: true, premium: true },
  { feature: "Botão WhatsApp", basic: true, pro: true, premium: true },
  { feature: "Certificado SSL", basic: true, pro: true, premium: true },
  { feature: "SEO para Google", basic: false, pro: true, premium: true },
  { feature: "Alterações de conteúdo", basic: false, pro: true, premium: true },
  { feature: "Relatórios de visitas", basic: false, pro: true, premium: true },
  { feature: "Domínio próprio (.com.br)", basic: false, pro: false, premium: true },
  { feature: "Suporte WhatsApp VIP", basic: false, pro: false, premium: true },
  { feature: "Design exclusivo", basic: false, pro: false, premium: true },
];

const faqData = [
  {
    q: "Quanto tempo leva para ficar pronto?",
    a: "Sites e landing pages ficam prontos em 7 a 14 dias úteis. Projetos mais complexos como e-commerces e aplicativos têm prazo estimado na proposta. Trabalhamos de forma ágil sem abrir mão da qualidade."
  },
  {
    q: "Preciso ter domínio e hospedagem?",
    a: "Não. Nos planos Pro e Premium, cuidamos de tudo: registro do domínio, hospedagem e configuração técnica completa. Você foca no seu negócio, nós cuidamos da tecnologia."
  },
  {
    q: "O site funciona bem no celular?",
    a: "Sim, 100%. Todos os projetos são desenvolvidos com design responsivo, garantindo experiência perfeita em celular, tablet e computador. Hoje mais de 70% dos acessos vêm do mobile."
  },
  {
    q: "Posso mudar de plano depois?",
    a: "Claro! Você pode fazer upgrade ou downgrade do plano a qualquer momento, sem burocracia. A mudança é aplicada no próximo ciclo de cobrança."
  },
  {
    q: "Como funciona o suporte?",
    a: "No plano Básico o suporte é por e-mail (resposta em até 48h). No Pro, suporte por chat (até 24h). No Premium, você tem meu WhatsApp direto com prioridade máxima de atendimento."
  },
  {
    q: "Tem contrato de fidelidade?",
    a: "Não. A assinatura é mensal e pode ser cancelada quando quiser, sem multas ou taxas. Seu site permanece ativo até o final do período já pago."
  },
];

const policyContent = {
  terms: (
    <div className="space-y-5">
      <p><strong className="text-white">1. Aceitação dos Termos</strong><br />Ao contratar qualquer serviço da UiCode.site, o usuário declara ter lido, compreendido e concordado com estes Termos de Uso em sua totalidade.</p>
      <p><strong className="text-white">2. Serviços Prestados</strong><br />A UiCode.site oferece criação, hospedagem, manutenção e otimização de presença digital, conforme descrito em cada plano contratado. Serviços adicionais serão orçados separadamente.</p>
      <p><strong className="text-white">3. Responsabilidade do Contratante</strong><br />O cliente é responsável pela veracidade e legalidade de todo conteúdo fornecido (textos, imagens, logotipos), garantindo que possui direitos de uso sobre os materiais.</p>
      <p><strong className="text-white">4. Propriedade Intelectual</strong><br />O código e design desenvolvidos pertencem à UiCode.site até o pagamento integral do projeto. Assinaturas mensais concedem licença de uso, não transferência de propriedade.</p>
    </div>
  ),
  privacy: (
    <div className="space-y-5">
      <p><strong className="text-white">1. Dados Coletados</strong><br />Coletamos apenas informações necessárias para prestação do serviço: nome, e-mail, telefone e dados da empresa. Não compartilhamos informações com terceiros sem consentimento.</p>
      <p><strong className="text-white">2. Processamento de Pagamentos</strong><br />Pagamentos são processados pela Stripe, plataforma certificada PCI-DSS. A UiCode.site não armazena dados de cartão de crédito em nenhuma hipótese.</p>
      <p><strong className="text-white">3. Cookies</strong><br />Utilizamos cookies para análise de desempenho e melhoria da experiência. Você pode desativá-los nas configurações do navegador a qualquer momento.</p>
      <p><strong className="text-white">4. LGPD</strong><br />Seguimos as diretrizes da Lei Geral de Proteção de Dados. Para exercer seus direitos de acesso, correção ou exclusão de dados, entre em contato pelo e-mail contato@uicode.site.</p>
    </div>
  ),
  cancellation: (
    <div className="space-y-5">
      <p><strong className="text-white">1. Cancelamento da Assinatura</strong><br />O cancelamento pode ser solicitado a qualquer momento via painel do cliente, e-mail ou WhatsApp, sem necessidade de justificativa.</p>
      <p><strong className="text-white">2. Efeitos do Cancelamento</strong><br />O serviço permanece ativo até o fim do período faturado. Após o encerramento, o site será suspenso em até 7 dias úteis.</p>
      <p><strong className="text-white">3. Reembolso</strong><br />Solicitações de reembolso em até 7 dias após a contratação serão analisadas caso a caso. Após início do desenvolvimento, não há reembolso do período vigente.</p>
      <p><strong className="text-white">4. Exportação de Dados</strong><br />Ao cancelar, o cliente pode solicitar exportação do conteúdo do site em até 30 dias após o encerramento do contrato.</p>
    </div>
  )
};

// ==================================================================================
// COMPONENTE PRINCIPAL
// ==================================================================================

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null);
  const [activeTab, setActiveTab] = useState('anual');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubscribe = (plan) => {
    if (plan.paymentLink?.startsWith('http')) {
      window.open(plan.paymentLink, '_blank');
      return;
    }
    const phoneNumber = "5511916474626";
    const message = encodeURIComponent(
      `Olá, UiCode! 👋\n\nTenho interesse no *Plano ${plan.name}* (${plan.price}${plan.cents}/mês).\n\nPodemos conversar sobre meu projeto?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const navItems = [
    { label: "Especialidades", id: "services" },
    { label: "Cases", id: "projects" },
    { label: "Planos", id: "pricing" },
    { label: "Contato", id: "contact" },
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] text-slate-200 font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 origin-left z-[200]"
        style={{ scaleX }}
      />

      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }}></div>
        <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] bg-cyan-600/10 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] bg-purple-600/8 rounded-full blur-[180px]"></div>
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      {/* ── HEADER ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#030303]/85 backdrop-blur-2xl border-b border-white/5 py-4 shadow-2xl shadow-black/50"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection('home')}
            className="text-xl font-bold font-mono tracking-tighter flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Code size={16} className="text-white" />
            </div>
            <span className="text-white">Ui</span><span className="text-cyan-400">Code</span><span className="text-white/30">.site</span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 relative group"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-cyan-400 transition-all group-hover:w-4"></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact')}
              className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-cyan-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.08)]"
            >
              Iniciar Projeto <ArrowRight size={15} />
            </motion.button>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#030303]/97 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </motion.button>

            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 mb-8 opacity-30">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Code size={12} className="text-white" />
                </div>
                <span className="font-mono font-bold text-white">UiCode.site</span>
              </div>
              {[...navItems, { label: "Início", id: "home" }].reverse().map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-3xl font-bold text-white/70 hover:text-white transition-colors tracking-tight"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.open('https://wa.me/5511916474626', '_blank');
                }}
                className="mt-6 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl flex items-center gap-2"
              >
                <MessageCircle size={18} /> Falar no WhatsApp
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="home" className="relative pt-36 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden min-h-screen flex items-center">
        <div className="container max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge className="mb-8">Agência Digital Premium</Badge>

              <h1 className="text-[3.2rem] md:text-7xl lg:text-[5rem] font-bold leading-[1.05] tracking-tighter mb-6">
                Sua empresa no<br />
                digital com<br />
                <GradientText text="resultados reais." />
              </h1>

              <p className="text-lg text-slate-400 max-w-lg leading-relaxed mb-8">
                Criamos <strong className="text-slate-200">lojas virtuais, sites e aplicativos</strong> que não são só bonitos — são projetados para <strong className="text-slate-200">gerar vendas, leads e autoridade</strong> para o seu negócio.
              </p>

              {/* Trust signals */}
              <div className="flex items-center gap-6 mb-10 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>47+ projetos entregues</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>Sem fidelidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span>Suporte real</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <ShinyButton onClick={() => scrollToSection('pricing')} icon={ArrowRight}>
                  Ver Planos e Preços
                </ShinyButton>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => scrollToSection('projects')}
                  className="px-6 py-4 rounded-2xl text-slate-300 font-semibold hover:text-white transition-colors flex items-center gap-2 group border border-white/5 hover:border-white/10 hover:bg-white/5"
                >
                  <Play size={14} className="fill-current" />
                  Ver Cases de Sucesso
                </motion.button>
              </div>

              {/* Social proof */}
              <div className="mt-10 pt-10 border-t border-white/5 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['E', 'P', 'L'].map((l, i) => (
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

            {/* Visual - Dashboard mockup */}
            <div className="relative hidden lg:flex items-center justify-center h-[600px]">
              {/* Card principal */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-10 w-80 bg-[#080808] rounded-3xl border border-white/8 shadow-2xl p-6 z-20"
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
                <div className="flex items-end gap-1.5 h-24 mb-4">
                  {[35, 55, 42, 70, 58, 88, 75, 95, 65, 100, 82, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all"
                      style={{
                        height: `${h}%`,
                        background: i === 11
                          ? 'linear-gradient(to top, #06b6d4, #3b82f6)'
                          : 'rgba(255,255,255,0.05)'
                      }}
                    ></div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/8 rounded-xl px-3 py-2 border border-emerald-400/10">
                  <TrendingUp size={12} />
                  <span className="font-semibold">+245% vs mês anterior</span>
                </div>
              </motion.div>

              {/* Card secundário */}
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute left-0 bottom-20 w-64 bg-[#080808] rounded-3xl border border-white/8 shadow-2xl p-5 z-10"
              >
                <p className="text-xs text-slate-500 mb-3">Novos Pedidos Hoje</p>
                {[
                  { name: "João Silva", value: "R$ 380", color: "bg-cyan-400" },
                  { name: "Maria Costa", value: "R$ 220", color: "bg-purple-400" },
                  { name: "Pedro Lima", value: "R$ 150", color: "bg-emerald-400" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between mb-2 last:mb-0">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-xs text-slate-300">{item.name}</span>
                    </div>
                    <span className="text-xs font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </motion.div>

              {/* Badge flutuante */}
              <motion.div
                animate={{ y: [-5, 5, -5], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-4 bottom-32 bg-[#0a0a0a] rounded-2xl border border-white/8 shadow-xl px-4 py-3 z-30 flex items-center gap-3"
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

      {/* Marquee */}
      <InfiniteMarquee />

      {/* ── STATS ── */}
      <section className="py-20 relative">
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SpotlightCard className="p-6 text-center" spotlightColor="rgba(6,182,212,0.08)">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                      <Icon size={18} className="text-cyan-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1 font-mono">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section id="services" className="py-32 relative">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <SectionLabel>Especialidades</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              O que eu <GradientText text="construo" />
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              De landing pages estratégicas a plataformas complexas. Cada projeto é desenvolvido com foco em <strong className="text-slate-300">performance, conversão e resultados mensuráveis.</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SpotlightCard
                    className="p-8 h-full group cursor-default"
                    spotlightColor={service.glow}
                  >
                    <div className="flex gap-5 items-start">
                      <div className={cn(
                        "w-14 h-14 shrink-0 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                        service.bg, service.border
                      )}>
                        <Icon size={24} className={service.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white tracking-tight">{service.title}</h3>
                          <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full border shrink-0", service.bg, service.border, service.color)}>
                            {service.tag}
                          </span>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm">{service.description}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>

          {/* CTA inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors font-medium"
            >
              Não encontrou o que precisa? Fale comigo
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── CASES / PORTFÓLIO ── */}
      <section id="projects" className="py-32 bg-[#040406] relative border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(6,182,212,0.06),transparent)] pointer-events-none"></div>

        <div className="container px-6 mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <SectionLabel>Portfólio</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Cases de <GradientText text="Sucesso" from="from-amber-400" via="via-orange-400" to="to-pink-500" />
            </h2>
            <p className="text-slate-400 text-lg">
              Projetos reais com resultados reais. Veja como transformamos a presença digital de negócios como o seu.
            </p>
          </div>

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
                  index % 2 === 1 && "lg:[direction:rtl] [&>*]:[direction:ltr]"
                )}
              >
                {/* Image */}
                <div className="relative group">
                  <div className={cn(
                    "absolute -inset-3 bg-gradient-to-r opacity-20 blur-2xl rounded-[3rem] transition-opacity duration-700 group-hover:opacity-40",
                    project.color
                  )}></div>
                  <div className="relative rounded-3xl border border-white/8 overflow-hidden shadow-2xl bg-[#080808] aspect-[16/10]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-[3s] ease-out group-hover:scale-105 opacity-90"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-transparent opacity-60"></div>

                    {/* Result badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                        <TrendingUp size={12} className="text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400">{project.result}</span>
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                      {project.tech.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={cn("font-mono text-xs font-bold", project.textAccent)}>
                        PROJETO 0{project.id}
                      </span>
                      <div className="h-px flex-1 bg-white/5"></div>
                      <span className="text-xs text-slate-600">{project.category}</span>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{project.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Result highlight */}
                  <div className="p-4 rounded-2xl bg-emerald-400/5 border border-emerald-400/10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0">
                      <TrendingUp size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Resultado alcançado</p>
                      <p className="text-sm font-bold text-emerald-400">{project.result}</p>
                    </div>
                  </div>

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

      {/* ── TECH STACK ── */}
      <section id="skills" className="py-32 relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <SectionLabel>Stack Tecnológico</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Tecnologia de <GradientText text="alto nível" />
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Utilizamos as mesmas tecnologias usadas pelas maiores empresas do mundo para garantir performance, segurança e escalabilidade.
            </p>
          </div>

          {/* Skills com barra de progresso */}
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
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
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

          {/* Tech tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, borderColor: "rgba(6,182,212,0.4)" }}
                className="px-5 py-2.5 bg-[#080808] border border-white/5 rounded-xl flex items-center gap-2 cursor-default transition-all duration-200 hover:bg-white/3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                <span className="text-sm font-medium text-slate-300">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANOS ── */}
      <section id="pricing" className="py-32 relative bg-[#020204]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(139,92,246,0.06),transparent)] pointer-events-none"></div>

        <div className="container px-6 mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <SectionLabel>Planos</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Invista no seu<br />
              <GradientText text="crescimento digital" from="from-violet-400" via="via-purple-400" to="to-pink-500" />
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Sem surpresas, sem letras miúdas. Escolha o plano ideal para o momento do seu negócio e comece hoje.
            </p>
          </div>

          {/* Cards de planos */}
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
                {plan.highlight && (
                  <div className="absolute -inset-px bg-gradient-to-b from-cyan-500/30 via-blue-500/10 to-transparent rounded-3xl blur-sm"></div>
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
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-[10px] font-bold text-white tracking-widest uppercase flex items-center gap-1.5 whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <Star size={9} className="fill-white" /> {plan.badge}
                    </div>
                  )}

                  <div className="mb-6 pt-2">
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-slate-500 text-sm">{plan.description}</p>
                  </div>

                  <div className="flex items-start gap-1 mb-8 pb-8 border-b border-white/5">
                    <span className="text-slate-400 text-lg mt-2">R$</span>
                    <span className="text-5xl font-bold text-white tracking-tighter">{plan.price.replace('R$ ', '')}</span>
                    <div className="flex flex-col justify-end mb-1">
                      <span className="text-white text-xl font-bold">{plan.cents}</span>
                      <span className="text-slate-500 text-xs">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-4 flex-1">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={16} className={cn("shrink-0 mt-0.5", plan.highlight ? "text-cyan-400" : "text-emerald-500")} />
                        {feat}
                      </li>
                    ))}
                    {plan.notIncluded.map((feat, idx) => (
                      <li key={`no-${idx}`} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <X size={16} className="shrink-0 mt-0.5 text-slate-700" />
                        <span className="line-through">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubscribe(plan)}
                    className={cn(
                      "w-full mt-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2",
                      plan.highlight
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]"
                        : "bg-white/5 border border-white/8 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/15"
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

          {/* Tabela comparativa */}
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
                    {pricingPlans.map(p => (
                      <th key={p.name} className="p-4 text-sm font-bold text-center">
                        <span className={p.highlight ? "text-cyan-400" : "text-slate-300"}>{p.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, i) => (
                    <tr key={i} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                      <td className="p-4 text-sm text-slate-400">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.basic
                          ? <CheckCircle2 size={16} className="text-emerald-400 mx-auto" />
                          : <X size={16} className="text-slate-700 mx-auto" />}
                      </td>
                      <td className="p-4 text-center">
                        {row.pro
                          ? <CheckCircle2 size={16} className="text-emerald-400 mx-auto" />
                          : <X size={16} className="text-slate-700 mx-auto" />}
                      </td>
                      <td className="p-4 text-center">
                        {row.premium
                          ? <CheckCircle2 size={16} className="text-cyan-400 mx-auto" />
                          : <X size={16} className="text-slate-700 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ */}
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

            {/* Dúvida extra CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <p className="text-slate-500 text-sm mb-4">Ainda tem dúvidas?</p>
              <button
                onClick={() => window.open('https://wa.me/5511916474626', '_blank')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
              >
                <MessageCircle size={16} className="text-emerald-400" />
                Falar com especialista no WhatsApp
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="contact" className="py-40 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#030309] to-[#030303]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-600/5 rounded-full blur-[150px]"></div>
        </div>

        <div className="container px-6 mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-8 mx-auto w-fit">Vamos começar?</Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-[1.05]">
              Pronto para ter a<br />
              <GradientText text="presença digital" /><br />
              que seu negócio merece?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Cada dia sem um site profissional é um dia perdendo clientes para a concorrência.
              <strong className="text-slate-200"> Comece hoje.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ShinyButton
                onClick={() => window.open('https://wa.me/5511916474626', '_blank')}
                className="text-base px-10 py-5 rounded-2xl"
              >
                <MessageCircle size={20} />
                Falar no WhatsApp agora
              </ShinyButton>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => scrollToSection('pricing')}
                className="px-8 py-5 rounded-2xl border border-white/10 text-slate-300 font-bold hover:border-white/20 hover:text-white hover:bg-white/5 transition-all text-base"
              >
                Ver planos e preços
              </motion.button>
            </div>

            {/* Garantias */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              {[
                { icon: Shield, text: "Sem fidelidade" },
                { icon: RefreshCw, text: "Cancele quando quiser" },
                { icon: CheckCircle2, text: "Resultados garantidos" },
                { icon: Clock, text: "Entrega em até 14 dias" },
              ].map((item, i) => {
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

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-[#020202] relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Top */}
          <div className="py-16 grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Code size={16} className="text-white" />
                </div>
                <span className="font-mono font-bold text-white">UiCode<span className="text-cyan-400">.site</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Criando presenças digitais de alto impacto para negócios que querem crescer de verdade.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Navegação</p>
              <div className="flex flex-col gap-2">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-slate-500 hover:text-white text-left transition-colors w-fit"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Social & Contact */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Redes Sociais</p>
              <div className="flex gap-3 mb-6">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Github, href: "#", label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                    aria-label={label}
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => window.open('https://wa.me/5511916474626', '_blank')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all"
              >
                <MessageCircle size={15} />
                WhatsApp direto
              </motion.button>
            </div>
          </div>

          {/* Bottom */}
          <div className="py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>&copy; {new Date().getFullYear()} UiCode.site — Todos os direitos reservados.</p>
            <div className="flex gap-5">
              {[
                { key: 'terms', icon: FileText, label: "Termos de Uso" },
                { key: 'privacy', icon: Shield, label: "Privacidade" },
                { key: 'cancellation', icon: RefreshCw, label: "Cancelamento" },
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setActivePolicy(key)}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Icon size={12} /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Políticas */}
      <AnimatePresence>
        {activePolicy && (
          <PolicyModal
            isOpen={!!activePolicy}
            onClose={() => setActivePolicy(null)}
            title={
              activePolicy === 'terms' ? 'Termos de Uso'
              : activePolicy === 'privacy' ? 'Política de Privacidade'
              : 'Política de Cancelamento'
            }
            content={policyContent[activePolicy]}
          />
        )}
      </AnimatePresence>

    </div>
  );
}