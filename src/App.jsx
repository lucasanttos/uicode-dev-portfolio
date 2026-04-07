
import React, { useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useMotionTemplate, 
  useMotionValue,
  AnimatePresence
} from 'framer-motion';

import { 
  Code, Layout, Smartphone, Server, Globe, 
  Github, Linkedin, Instagram, ShoppingBag, 
  Menu, X, Send, Zap, ArrowRight, CheckCircle2, 
  HelpCircle, ChevronDown, ChevronUp, Star, Rocket,
  FileText, Shield, RefreshCw, CreditCard, Sparkles, BarChart
} from 'lucide-react';

// ==================================================================================
// --- MEUS COMPONENTES VISUAIS (Não preciso mexer muito aqui) ---
// ==================================================================================

// 1. Meu Card com efeito de luz que segue o mouse
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(6, 182, 212, 0.15)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/5 bg-[#0A0A0A]/50 backdrop-blur-sm overflow-hidden rounded-[2rem] transition-colors hover:border-white/10 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 2. Meu Botão com brilho metálico
const ShinyButton = ({ children, onClick, className = "", icon: Icon }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold text-white shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children} {Icon && <Icon size={18} />}
      </span>
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
      />
    </motion.button>
  );
};

// 3. Texto Gradiente Animado
const GradientText = ({ text, className = "" }) => {
  return (
    <span className={`bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x ${className}`}>
      {text}
    </span>
  );
};

// 4. Minha faixa de texto infinita (Letreiro)
const InfiniteMarquee = () => {
  // Aqui eu posso trocar as palavras que ficam passando na tela
  const words = [
    "LOJAS VIRTUAIS", "APLICATIVOS MOBILE", "LANDING PAGES", "E-COMMERCE", 
    "IDENTIDADE DIGITAL", "SISTEMAS WEB", "UX/UI DESIGN", "OTIMIZAÇÃO SEO"
  ];
  
  return (
    <div className="w-full bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20 border-y border-white/5 py-4 overflow-hidden flex whitespace-nowrap relative z-10 backdrop-blur-md">
      <motion.div 
        className="flex gap-12 items-center"
        animate={{ x: [0, -1035] }} 
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {[...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-sm font-bold text-slate-400 tracking-[0.2em]">{word}</span>
            <Sparkles size={14} className="text-cyan-500/50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// 5. Meu item de Perguntas Frequentes (Acordeão)
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-5 flex justify-between items-center text-left hover:text-cyan-400 transition-colors"
      >
        <span className="font-medium text-lg text-slate-200">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} className={isOpen ? "text-cyan-400" : "text-slate-500"} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-400 text-sm leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente para Check/Cross na tabela
const StatusIcon = ({ status }) => (
  status ? <CheckCircle2 size={18} className="text-green-400 mx-auto" /> : <X size={18} className="text-slate-600 mx-auto" />
);

// 6. Minha Janela (Modal) de Políticas de Privacidade e Termos
const PolicyModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-[#0A0A10] border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col z-[101]"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0A0A10] rounded-t-2xl sticky top-0 z-10">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 text-sm leading-relaxed space-y-4">
          {content}
        </div>
      </motion.div>
    </div>
  );
};

// ==================================================================================
// --- MEUS DADOS (AQUI EU EDITO OS TEXTOS DO SITE) ---
// ==================================================================================

// Aqui eu listo os serviços que ofereço
const services = [
  {
    title: "E-commerce & Lojas Virtuais",
    description: "Crio máquinas de vendas 24/7. Lojas virtuais rápidas, seguras e com checkout otimizado para não perder nenhuma venda.",
    icon: <ShoppingBag className="w-7 h-7 text-cyan-400" />
  },
  {
    title: "Sites & Landing Pages",
    description: "Sua identidade digital impecável. Páginas projetadas com gatilhos mentais e SEO para transformar visitantes em clientes reais.",
    icon: <Layout className="w-7 h-7 text-purple-400" />
  },
  {
    title: "Aplicativos Mobile (iOS/Android)",
    description: "Coloco seu negócio no bolso do seu cliente. Desenvolvo apps nativos e responsivos com experiências de usuário inesquecíveis.",
    icon: <Smartphone className="w-7 h-7 text-pink-400" />
  },
  {
    title: "Sistemas & Dashboards",
    description: "Automatizo processos internos com sistemas web sob medida. Controle total do seu negócio com dados em tempo real.",
    icon: <BarChart className="w-7 h-7 text-emerald-400" />
  }
];

// Aqui eu coloco os meus projetos de portfólio (Cases de sucesso)
const projects = [
  {
    id: 1,
    title: "Pet Green Veterinária",
    category: "Landing Page de Conversão",
    description: "Presença digital estratégica para clínica veterinária. Foco total em agendamentos mobile e UX simplificada para os donos de pets.",
    tech: ["React", "UI/UX", "WhatsApp API"],
    color: "from-emerald-600 to-green-950",
    link: "#",
    image: "/petgreen.png" 
  },
  {
    id: 2,
    title: "Dr. Pedro Elino",
    category: "Site Institucional VIP",
    description: "Identidade digital premium para cirurgião-dentista. O design 'Dark & Clean' transmite alta autoridade, suportado por otimização pesada para o Google (SEO).",
    tech: ["Next.js", "SEO Local", "Performance"],
    color: "from-blue-600 to-slate-900",
    link: "#",
    image: "/drpedro.png" 
  },
  {
    id: 3,
    title: "La Famille Tattoo",
    category: "Plataforma de Agendamento",
    description: "Muito além de um site bonito. Uma aplicação que faz a triagem de clientes curiosos e envia apenas leads qualificados direto para o WhatsApp do estúdio.",
    tech: ["React SPA", "Automação", "Conversion Rate"],
    color: "from-yellow-600 to-amber-950", 
    link: "https://fernandeswebsite.netlify.app/",
    image: "/tattoo.png" 
  },
  //{
   // id: 4,
   // title: "Maldini Advogados",
    //category: "Landing Page",
   // description: "XXXXXXXXXXXXXXXXXXX",
   // tech: ["React SPA", "Automação", "Conversion Rate"],
    //color: "from-yellow-600 to-amber-950", 
   // link: "XXXXXXXXXX",
    //image: "/XXXXXXXXXXXX.png" 
  //}
];

// Aqui eu listo as minhas habilidades e tecnologias
const skills = [
  "Criação de Lojas Virtuais", "Aplicativos Nativos", "Landing Pages", "Otimização SEO", 
  "React.js", "Node.js", "Design UI/UX", "Identidade Visual", 
  "Sistemas Web", "Bancos de Dados", "Integração de Pagamentos", "Alta Performance"
];

// Aqui eu defino os meus planos de assinatura
const pricingPlans = [
  {
    name: "Básico",
    price: "R$ 99,90",
    period: "/ mês",
    description: "Para quem quer estar na internet sem complicação",
    features: [
      "Site profissional pronto",
      "Site sempre no ar (hospedagem inclusa)",
      "Site seguro (cadeado no navegador)",
      "Botão do WhatsApp",
      "Endereço padrão do sistema",
      "Suporte por e-mail"
    ],
    highlight: false,
    color: "border-white/10 hover:border-white/20",
    buttonVariant: "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
    paymentLink: "https://buy.stripe.com/eVq3cnfJl1wVbqc9582oE05" // Aqui eu colo meu link do Stripe
  },
  {
    name: "Premium",
    price: "R$ 199,90",
    period: "/ mês",
    description: "A escolha inteligente. Domine seu mercado com todas as ferramentas de conversão.",
    features: [
      "Tudo do Pro",
      "Endereço próprio (.com.br)",
      "Visual exclusivo e personalizado",
      "Foco total em alta conversão",
      "Relatórios detalhados de performance",
      "Suporte VIP direto no WhatsApp",
      "Prioridade máxima em atualizações"
    ],
    highlight: true,
    badge: "MAIOR RETORNO",
    color: "border-purple-500/80 shadow-[0_0_40px_rgba(168,85,247,0.4)] bg-gradient-to-b from-purple-900/20 to-transparent scale-105 z-10",
    buttonVariant: "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/40 animate-pulse-slow hover:shadow-purple-500/60 hover:scale-105",
    paymentLink: "https://buy.stripe.com/28E9ALcx96RfgKwftw2oE04" 
  },
  {
    name: "Pro",
    price: "R$ 149,90",
    period: "/ mês",
    description: "Uma boa opção para começar a gerar contatos.",
    features: [
      "Tudo do Básico",
      "Site otimizado (SEO Google)",
      "Botões WhatsApp c/ mensagens prontas",
      "Mudanças ilimitadas no conteúdo",
      "Relatório simples de visitas",
      "Suporte rápido por chat"
    ],
    highlight: false,
    color: "border-blue-500/20 hover:border-blue-500/40",
    buttonVariant: "bg-blue-900/30 text-blue-200 border border-blue-500/30 hover:bg-blue-900/50",
    paymentLink: "https://buy.stripe.com/aFafZ9fJl4J72TG4OS2oE06" 
  }
];

const comparisonData = [
  { feature: "Site profissional", basic: true, pro: true, premium: true },
  { feature: "Hospedagem inclusa", basic: true, pro: true, premium: true },
  { feature: "Site seguro", basic: true, pro: true, premium: true },
  { feature: "Botão WhatsApp", basic: true, pro: true, premium: true },
  { feature: "Otimização Google", basic: false, pro: true, premium: true },
  { feature: "Mudanças no site", basic: false, pro: true, premium: true },
  { feature: "Relatórios", basic: false, pro: true, premium: true },
  { feature: "Endereço próprio", basic: false, pro: false, premium: true },
  { feature: "Suporte WhatsApp", basic: false, pro: false, premium: true },
];

const faqData = [
  { q: "O que é o endereço próprio?", a: "É o endereço do seu site com o nome do seu negócio, por exemplo: seunegocio.com.br. Isso passa muito mais confiança para seus clientes do que um link genérico." },
  { q: "Posso trocar de plano depois?", a: "Sim! Você pode subir ou descer de plano quando quiser, sem burocracia." },
  { q: "Preciso saber mexer em site?", a: "Não. Nós cuidamos de toda a parte técnica para você focar no seu negócio." },
  { q: "O site funciona no celular?", a: "Sim. Ele é totalmente responsivo e se adapta automaticamente ao celular, tablet e computador." },
  { q: "Tem fidelidade?", a: "Não. Você pode cancelar a assinatura quando quiser, sem multas." },
];

// ==================================================================================
// --- COMPONENTE PRINCIPAL (ONDE O SITE REALMENTE É MONTADO) ---
// ==================================================================================

export default function App() {
  // Meus estados (variáveis que controlam o que aparece na tela)
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState(null); // Controla qual janela de política está aberta
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Detecto quando o usuário rola a página para mudar a cor do cabeçalho
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Minha função para rolar até a seção clicada no menu
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Minha função para lidar com o clique no botão de assinar plano
  const handleSubscribe = (plan) => {
    // Se eu tiver configurado um link do Stripe, ele abre direto
    if (plan.paymentLink && plan.paymentLink.startsWith('http')) {
      window.open(plan.paymentLink, '_blank');
      return;
    }
    
    // ⚠️ AQUI EU COLOCO O MEU NÚMERO DE WHATSAPP REAL (Apenas números, com código do país e DDD)
    const phoneNumber = "5511916474626"; 
    const message = encodeURIComponent(`Olá equipe UiCode! 👋\n\nEstou buscando elevar o nível digital do meu negócio e tenho interesse no *Plano ${plan.name}* (${plan.price}).\n\nPodemos conversar?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // Meus textos para as Políticas do site (aparecem na janela modal)
  const policyContent = {
    terms: (
      <div className="space-y-4">
        <p><strong>1. Aceitação dos termos</strong><br/>Ao acessar ou utilizar a plataforma UiCode.site, o usuário concorda com estes Termos de Uso. Caso não concorde, não deve utilizar o serviço.</p>
        <p><strong>2. Descrição do serviço</strong><br/>Eu ofereço a criação, hospedagem e manutenção de páginas profissionais, conforme o plano contratado.</p>
        <p><strong>3. Responsabilidade</strong><br/>O usuário é responsável por todo o conteúdo inserido em sua página, incluindo textos, imagens e informações de contato.</p>
      </div>
    ),
    privacy: (
      <div className="space-y-4">
        <p><strong>1. Coleta de dados</strong><br/>Coletamos apenas os dados necessários para o funcionamento do serviço, como: Nome e E-mail.</p>
        <p><strong>2. Pagamentos</strong><br/>Os pagamentos são processados por plataformas seguras (Stripe). Eu não armazeno dados de cartão de crédito.</p>
      </div>
    ),
    cancellation: (
      <div className="space-y-4">
        <p><strong>1. Cancelamento da assinatura</strong><br/>Você pode cancelar sua assinatura a qualquer momento, diretamente pela plataforma ou entrando em contato comigo.</p>
        <p><strong>2. Efeitos do cancelamento</strong><br/>O acesso ao serviço permanece ativo até o final do período já pago. Após isso, o site será suspenso.</p>
      </div>
    )
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Minha Barra de Progresso no topo da tela */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left z-[100]" style={{ scaleX }} />

      {/* Meus Efeitos de Fundo Cinematográficos */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] mix-blend-screen" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
      </div>

      {/* Meu Cabeçalho (Header) */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold font-mono tracking-tighter flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <Sparkles size={20} className="text-cyan-500 group-hover:animate-spin" />
            <span className="text-white">UiCode</span><span className="text-cyan-500">.site</span>
          </div>

          {/* Links do Menu Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {['Especialidades', 'Cases', 'Soluções'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'Soluções' ? 'pricing' : item === 'Cases' ? 'projects' : 'services')}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-cyan-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Começar Projeto <ArrowRight size={16} />
            </button>
            {/* Ícone do Menu Mobile */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Meu Menu Mobile (Abre tela cheia) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-[#030303]/95 flex flex-col justify-center items-center"
          >
            <button className="absolute top-8 right-6 text-white/50 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {['Início', 'Especialidades', 'Cases de Sucesso', 'Planos', 'Contato'].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item === 'Planos' ? 'pricing' : item === 'Cases de Sucesso' ? 'projects' : item === 'Início' ? 'home' : item === 'Especialidades' ? 'services' : 'contact')}
                  className="text-4xl font-bold text-white hover:text-cyan-400 transition-colors tracking-tight"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MINHA SEÇÃO PRINCIPAL (HERO) --- */}
      <section id="home" className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="container max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Agência Digital Premium
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tighter mb-6">
              Transforme sua <br /> Visão em um <br />
              <GradientText text="Império Digital." />
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mb-10 font-light">
              Especialistas na criação de <strong className="text-white">Lojas Virtuais, Sites Institucionais e Aplicativos</strong> de alta conversão. Nós não fazemos apenas sites, construímos o seu principal ativo de vendas.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <ShinyButton onClick={() => scrollToSection('pricing')} icon={ArrowRight}>
                Ver Nossas Soluções
              </ShinyButton>
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 rounded-2xl text-slate-300 font-bold hover:text-white transition-colors flex items-center gap-2 group"
              >
                Explorar Cases <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Gráficos Abstratos do Hero (Estilo Corporativo) */}
          <div className="relative hidden lg:block h-[600px] perspective-1000">
            <motion.div
              animate={{ y: [-15, 15, -15], rotateY: [0, 5, 0], rotateX: [0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-72 h-80 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 shadow-2xl p-6 backdrop-blur-xl z-20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <ShoppingBag className="text-cyan-400" />
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">+245% Vendas</div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-white/5 rounded-md"></div>
                <div className="h-4 w-1/2 bg-white/5 rounded-md"></div>
                <div className="w-full h-32 mt-4 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-xl border border-cyan-500/20 flex items-end p-4">
                  <div className="w-full flex items-end gap-2 h-full">
                    {[40, 70, 45, 90, 65, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-cyan-400/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [15, -15, 15], rotateZ: [-2, 2, -2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-10 w-64 h-48 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl p-6 backdrop-blur-xl z-10"
            >
              <div className="flex gap-3 items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full bg-white/5 rounded-md"></div>
                <div className="h-3 w-5/6 bg-white/5 rounded-md"></div>
                <div className="h-10 w-full mt-4 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-300">Identidade Visual App</span>
                </div>
              </div>
            </motion.div>

            <svg className="absolute inset-0 w-full h-full z-0 opacity-20" preserveAspectRatio="none">
               <path d="M 100 400 Q 200 200 400 100" fill="transparent" stroke="cyan" strokeWidth="2" strokeDasharray="5,5" />
               <circle cx="400" cy="100" r="4" fill="cyan" />
               <circle cx="100" cy="400" r="4" fill="cyan" />
            </svg>
          </div>
        </div>
      </section>

      {/* Minha faixa infinita de palavras-chave */}
      <InfiniteMarquee />

      {/* --- MINHA SEÇÃO DE SERVIÇOS (O QUE CONSTRUÍMOS) --- */}
      <section id="services" className="py-32 relative">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">O que eu construo</h2>
            <p className="text-slate-400 text-lg">De landing pages enxutas a ecossistemas complexos de e-commerce. Domino a tecnologia para que você domine o seu mercado.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <SpotlightCard key={i} className="p-10 group flex gap-6 items-start" spotlightColor="rgba(255,255,255,0.05)">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/5 transition-all duration-300 shadow-xl">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{service.description}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- MINHA SEÇÃO DE PROJETOS --- */}
      <section id="projects" className="py-32 bg-[#050505] relative border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-[#050505] to-[#050505] pointer-events-none"></div>
        
        <div className="container px-6 mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6 border-b border-white/10 pb-10">
            <div>
              <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-2 block">Meu Portfólio</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Cases de <span className="text-slate-600">Sucesso</span></h2>
            </div>
            <p className="text-slate-400 max-w-sm text-right hidden md:block">
              Marcas que confiaram na minha arquitetura digital para escalar seus resultados.
            </p>
          </div>

          <div className="flex flex-col gap-32">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-[55%] group relative">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} opacity-20 blur-xl transition-opacity duration-500 rounded-[2rem]`}></div>
                  <div className="relative aspect-[4/3] bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top opacity-90 transition-transform duration-[2s] ease-out group-hover:scale-105" 
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"; 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
                    
                    <div className="absolute bottom-6 left-6">
                      <div className="flex gap-2">
                        {project.tech.slice(0, 2).map(t => (
                          <span key={t} className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-[45%] space-y-8">
                  <div>
                    <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 block">Projeto 0{project.id}</span>
                    <h3 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">{project.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="h-px w-full bg-white/10"></div>
                  
                  <div className="flex gap-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-white text-black font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                      Acessar Site <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MINHAS HABILIDADES E TECNOLOGIAS --- */}
      <section id="skills" className="py-32 relative overflow-hidden">
        <div className="container px-6 mx-auto max-w-5xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Minha Tecnologia de Ponta</h2>
          <p className="text-slate-400 mb-16 max-w-2xl mx-auto">Utilizo o que há de mais avançado no Vale do Silício para garantir que seu site ou app seja ultra rápido, seguro e escalável no Google.</p>

          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="px-6 py-4 bg-[#0a0a0a]/50 border border-white/5 rounded-2xl flex items-center gap-3 backdrop-blur-sm cursor-default transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                <span className="font-medium text-slate-300">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MINHA SEÇÃO DE PLANOS E PREÇOS --- */}
      <section id="pricing" className="py-32 relative bg-[#020204]">
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">Planos Transparentes</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Invista no seu <br/>Crescimento Digital</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Um site lento custa clientes. Minhas soluções são otimizadas para que o seu investimento se pague rapidamente com <strong className="text-white">novas vendas e contatos.</strong>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center relative z-10 mb-20">
            {pricingPlans.map((plan, i) => (
              <div key={i} className="relative group h-full">
                {plan.highlight && (
                  <div className="absolute -inset-1 bg-gradient-to-b from-cyan-500/20 to-blue-600/20 blur-2xl rounded-[2.5rem] opacity-100"></div>
                )}
                
                <SpotlightCard 
                  className={`h-full flex flex-col p-10 rounded-[2.5rem] bg-[#0A0A0A] transition-all duration-500 ${plan.color}`}
                  spotlightColor={plan.highlight ? "rgba(6, 182, 212, 0.15)" : "rgba(255, 255, 255, 0.05)"}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 right-0 overflow-hidden rounded-tr-[2.5rem] rounded-bl-3xl">
                      <div className="bg-gradient-to-bl from-cyan-500 to-blue-600 text-white text-[10px] font-bold px-6 py-2 shadow-lg tracking-widest flex items-center gap-1 uppercase">
                        <Star size={10} className="fill-white" /> {plan.badge}
                      </div>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2 mt-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-6 h-10">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/5">
                    <span className="text-5xl font-bold text-white tracking-tighter">{plan.price}</span>
                    <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-snug">
                        <CheckCircle2 size={18} className={`shrink-0 ${plan.highlight ? 'text-cyan-400' : 'text-slate-600'}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${plan.buttonVariant}`}
                  >
                    {plan.paymentLink ? <CreditCard size={18} /> : null}
                    Assinar {plan.name} {plan.highlight && <Rocket size={16} />}
                  </button>
                </SpotlightCard>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[2.5rem]">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/20">
                <HelpCircle className="text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Dúvidas Frequentes</h3>
            </div>
            
            <div className="space-y-2">
              {faqData.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- MINHA SEÇÃO DE CONTATO FINAL (CTA) --- */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-blue-900/10 to-[#020204]"></div>
        <div className="container px-6 mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            Pronto para dar <br />o próximo passo?
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Chega de perder vendas por ter uma presença digital fraca. <br/> Vamos construir a vitrine definitiva para o seu negócio.
          </p>
          
          <ShinyButton onClick={() => window.open('https://wa.me/5511916474626', '_blank')} className="mx-auto text-lg px-12 py-5 rounded-[2rem]">
            Falar comigo no WhatsApp
          </ShinyButton>
        </div>
      </section>

      {/* --- MEU RODAPÉ --- */}
      <footer className="py-12 border-t border-white/5 bg-[#030303] relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <div className="text-2xl font-bold font-mono tracking-tighter flex items-center gap-2 mb-4">
                <Sparkles size={20} className="text-cyan-500" />
                <span className="text-white">UiCode</span><span className="text-cyan-500">.site</span>
              </div>
              <p className="text-slate-500 max-w-sm">Elevando padrões estéticos e técnicos na construção de marcas digitais de alto impacto.</p>
            </div>
            
            <div className="flex md:justify-end gap-4">
              {/* Aqui eu posso colocar os meus links das redes sociais */}
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 transition-all hover:scale-110"><Instagram size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 transition-all hover:scale-110"><Linkedin size={20} /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 transition-all hover:scale-110"><Github size={20} /></a>
            </div>
          </div>

          <div className="h-px w-full bg-white/5 mb-8"></div>

          <div className="flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs font-medium gap-4">
            <p>&copy; {new Date().getFullYear()} UiCode.site - Todos os direitos reservados.</p>
            
            <div className="flex gap-6">
              <button onClick={() => setActivePolicy('terms')} className="hover:text-cyan-400 transition-colors flex items-center gap-1"><FileText size={14} /> Termos de Serviço</button>
              <button onClick={() => setActivePolicy('privacy')} className="hover:text-cyan-400 transition-colors flex items-center gap-1"><Shield size={14} /> Privacidade</button>
              <button onClick={() => setActivePolicy('cancellation')} className="hover:text-cyan-400 transition-colors flex items-center gap-1"><RefreshCw size={14} /> Cancelamento</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Renderiza a minha janela modal de políticas */}
      <AnimatePresence>
        {activePolicy && (
          <PolicyModal 
            isOpen={!!activePolicy} 
            onClose={() => setActivePolicy(null)}
            title={activePolicy === 'terms' ? 'Termos de Uso' : activePolicy === 'privacy' ? 'Política de Privacidade' : 'Política de Cancelamento'}
            content={policyContent[activePolicy]}
          />
        )}
      </AnimatePresence>

    </div>
  );
}