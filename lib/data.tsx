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
import type { ElementType, JSX } from "react";



export interface Service {
  title: string;
  description: string;
  icon: ElementType;
  color: string;
  bg: string;
  border: string;
  glow: string;
  tag: string;
}

export interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  icon: ElementType;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  result: string;
  description: string;
  tech: string[];
  color: string;
  textAccent: string;
  link: string;
  image: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  cents: string;
  period: string;
  description: string;
  features: string[];
  notIncluded: string[];
  highlight: boolean;
  badge?: string;
  color: string;
  buttonVariant: "primary" | "ghost";
  paymentLink: string;
}

export interface ComparisonFeature {
  feature: string;
  basic: boolean;
  pro: boolean;
  premium: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface MarqueeItem {
  text: string;
  icon: ElementType;
}

export interface PolicyContent {
  terms: JSX.Element;
  privacy: JSX.Element;
  cancellation: JSX.Element;
}

// ─────────────────────────────────────────────────────────────
// SERVIÇOS
// ─────────────────────────────────────────────────────────────
// Cards da seção de especialidades.
// Para adicionar/remover serviços, edite apenas este array.

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

// ─────────────────────────────────────────────────────────────
// ESTATÍSTICAS
// ─────────────────────────────────────────────────────────────
// Usado normalmente na seção Stats.
// value = número final da animação.

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

// ─────────────────────────────────────────────────────────────
// PROJETOS / CASES
// ─────────────────────────────────────────────────────────────
// Imagens devem ficar dentro da pasta /public.
// Exemplo: public/drpedro.png pode ser usado como "/drpedro.png".

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
    description:
      "E-commerce de alta performance focado em maximizar vendas. Possui carrinho inteligente com cálculo automático de taxas, sistema de combos para aumento de ticket médio e um fluxo de checkout fluido integrado diretamente ao WhatsApp da loja.",
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

// ─────────────────────────────────────────────────────────────
// HABILIDADES
// ─────────────────────────────────────────────────────────────
// Barras de progresso da seção de tecnologia.
// level = percentual da barra, de 0 a 100.

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

// Tags de tecnologia que aparecem embaixo das barras.
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

// ─────────────────────────────────────────────────────────────
// PLANOS DE PREÇO
// ─────────────────────────────────────────────────────────────
// Estes planos foram reescritos com mais clareza de escopo.
// Isso ajuda a evitar interpretação de "alterações infinitas" ou serviços fora do combinado.

export const pricingPlans: PricingPlan[] = [
  {
    name: "Básico",
    price: "R$ 99",
    cents: ",90",
    period: "/ mês",
    description:
      "Para empresas que precisam sair do improviso e ter uma presença profissional.",
    features: [
      "Site profissional de página única",
      "Hospedagem inclusa",
      "SSL (cadeado de segurança)",
      "Botão WhatsApp integrado",
      "Domínio padrão (.vercel.app)",
      "Manutenção técnica essencial",
      "Suporte por e-mail",
    ],
    notIncluded: [
      "SEO otimizado",
      "Domínio próprio (.com.br)",
      "Alterações ilimitadas",
      "Suporte WhatsApp VIP",
      "Criação de páginas extras",
      "Integrações avançadas",
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
    description:
      "Para negócios que querem parecer mais profissionais e gerar mais contatos.",
    features: [
      "Tudo do Básico",
      "SEO técnico inicial",
      "WhatsApp com mensagens prontas",
      "Alterações de conteúdo dentro do escopo",
      "Relatório mensal de visitas",
      "Suporte rápido por chat",
      "Ajustes de textos, imagens e informações",
    ],
    notIncluded: [
      "Domínio próprio (.com.br)",
      "Suporte WhatsApp VIP",
      "Novas páginas fora do escopo inicial",
      "Funcionalidades personalizadas complexas",
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
    description:
      "Para marcas que querem visual superior, mais autoridade e suporte prioritário.",
    features: [
      "Tudo do Pro",
      "Domínio próprio (.com.br)",
      "Design exclusivo personalizado",
      "Foco em conversão (CRO)",
      "Relatórios detalhados de performance",
      "Suporte VIP direto no WhatsApp",
      "Prioridade em atualizações",
      "Melhorias visuais recorrentes dentro do escopo",
    ],
    notIncluded: [
      "Campanhas de tráfego pago",
      "Produção profissional de fotos/vídeos",
      "Sistemas complexos sob medida",
      "Integrações externas pagas sem orçamento prévio",
    ],
    highlight: true,
    badge: "MAIOR VALOR",
    color: "border-cyan-500/50",
    buttonVariant: "primary",
    paymentLink: "https://buy.stripe.com/28E9ALcx96RfgKwftw2oE04",
  },
];

// ─────────────────────────────────────────────────────────────
// TABELA COMPARATIVA
// ─────────────────────────────────────────────────────────────

export const comparisonFeatures: ComparisonFeature[] = [
  { feature: "Site profissional", basic: true, pro: true, premium: true },
  { feature: "Hospedagem inclusa", basic: true, pro: true, premium: true },
  { feature: "Botão WhatsApp", basic: true, pro: true, premium: true },
  { feature: "Certificado SSL", basic: true, pro: true, premium: true },
  { feature: "Manutenção técnica", basic: true, pro: true, premium: true },
  { feature: "SEO técnico inicial", basic: false, pro: true, premium: true },
  { feature: "Alterações de conteúdo", basic: false, pro: true, premium: true },
  { feature: "Relatórios de visitas", basic: false, pro: true, premium: true },
  {
    feature: "Domínio próprio (.com.br)",
    basic: false,
    pro: false,
    premium: true,
  },
  { feature: "Suporte WhatsApp VIP", basic: false, pro: false, premium: true },
  { feature: "Design exclusivo", basic: false, pro: false, premium: true },
];

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
// Respostas mais claras para reduzir dúvidas, desalinhamento de expectativa
// e risco de contestação por "não era o que eu esperava".

export const faqData: FAQItem[] = [
  {
    q: "Quanto tempo leva para ficar pronto?",
    a: "Sites e landing pages geralmente ficam prontos em 7 a 14 dias úteis após o envio completo das informações pelo cliente. Projetos maiores, e-commerces, sistemas ou funcionalidades extras podem ter prazo diferente informado em proposta.",
  },
  {
    q: "O que preciso enviar para começar?",
    a: "Você precisa enviar informações do negócio, textos, imagens, logotipo, dados de contato e preferências visuais. O prazo de entrega começa a contar após o recebimento completo dos materiais necessários.",
  },
  {
    q: "Posso pedir alterações?",
    a: "Sim. Cada plano inclui ajustes dentro do escopo contratado. Alterações simples de texto, imagem e informações são permitidas conforme o plano. Mudanças estruturais, novas páginas, novas funcionalidades ou refações completas podem gerar orçamento adicional.",
  },
  {
    q: "Preciso ter domínio e hospedagem?",
    a: "Não. A hospedagem está inclusa nos planos. Domínio próprio está incluso apenas no plano Premium ou pode ser contratado à parte nos demais planos.",
  },
  {
    q: "O site funciona bem no celular?",
    a: "Sim. Todos os projetos são desenvolvidos com foco em mobile, funcionando em celular, tablet e computador.",
  },
  {
    q: "Posso mudar de plano depois?",
    a: "Sim. Você pode solicitar upgrade ou downgrade. A alteração passa a valer no próximo ciclo de cobrança ou conforme acordo feito no atendimento.",
  },
  {
    q: "Como funciona o cancelamento?",
    a: "O cancelamento pode ser solicitado por e-mail ou WhatsApp. A assinatura permanece ativa até o fim do período já pago. Após o encerramento, hospedagem, manutenção, suporte e licença de uso podem ser suspensos.",
  },
  {
    q: "Existe reembolso?",
    a: "Pedidos de reembolso seguem a Política de Cancelamento e Reembolso. Após início da execução, briefing, criação, configuração, publicação, manutenção ou uso do serviço, valores referentes a trabalho já executado, período vigente e custos de terceiros não são reembolsáveis, respeitada a legislação aplicável.",
  },
  {
    q: "O cliente recebe o código-fonte?",
    a: "Nos planos de assinatura, o cliente contrata licença de uso, hospedagem, manutenção e suporte. A transferência de código-fonte, arquivos editáveis ou propriedade integral deve ser negociada separadamente e depende de pagamento específico.",
  },
];

// ─────────────────────────────────────────────────────────────
// MARQUEE
// ─────────────────────────────────────────────────────────────
// Faixa animada que rola infinitamente entre o hero e as stats.

export const marqueeItems: MarqueeItem[] = [
  { text: "LOJAS VIRTUAIS", icon: ShoppingBag },
  { text: "APLICATIVOS MOBILE", icon: Smartphone },
  { text: "LANDING PAGES", icon: Layout },
  { text: "E-COMMERCE", icon: TrendingUp },
  { text: "IDENTIDADE DIGITAL", icon: Star },
  { text: "SISTEMAS WEB", icon: Server },
  { text: "UX/UI DESIGN", icon: Layers },
  { text: "OTIMIZAÇÃO SEO", icon: Target },
];

// ─────────────────────────────────────────────────────────────
// POLÍTICAS
// ─────────────────────────────────────────────────────────────
// Importante:
// Estes textos ajudam a deixar o escopo e as condições mais claras,
// mas não substituem revisão de advogado.
// Para se proteger em disputas, salve aceite dos termos, comprovantes,
// prints de conversas, briefing, aprovações, entrega e histórico de uso.

export const policyContent: PolicyContent = {
  terms: (
    <div className="space-y-5">
      <p>
        <strong className="text-white">1. Aceitação dos Termos</strong>
        <br />
        Ao contratar qualquer serviço, plano, assinatura ou projeto da
        UiCode.site, o cliente declara que leu, compreendeu e concordou com
        estes Termos de Uso, com a Política de Privacidade e com a Política de
        Cancelamento e Reembolso. A contratação, pagamento, aprovação de
        proposta, envio de briefing ou início do uso do serviço caracteriza
        aceite integral das condições apresentadas.
      </p>

      <p>
        <strong className="text-white">2. Natureza dos Serviços</strong>
        <br />
        A UiCode.site presta serviços digitais de criação, configuração,
        hospedagem, manutenção, suporte, otimização e evolução de presença
        digital. Os serviços podem incluir sites, landing pages, lojas virtuais,
        sistemas web, páginas de captura, integrações e consultoria, conforme o
        plano ou proposta contratada.
      </p>

      <p>
        <strong className="text-white">3. Escopo Contratado</strong>
        <br />
        Cada plano possui limites próprios de recursos, suporte, alterações,
        páginas, integrações e nível de personalização. O que não estiver
        expressamente descrito no plano, proposta ou conversa formal de
        contratação será considerado serviço adicional e poderá ser orçado
        separadamente.
      </p>

      <p>
        <strong className="text-white">4. Início da Execução</strong>
        <br />
        A execução do serviço poderá começar após confirmação do pagamento,
        envio do briefing, envio de materiais, aprovação de proposta ou
        solicitação expressa do cliente para início do trabalho. Após o início
        da execução, atividades como planejamento, design, programação,
        configuração, hospedagem, testes, reuniões, atendimento, publicação ou
        manutenção passam a representar trabalho efetivamente realizado.
      </p>

      <p>
        <strong className="text-white">5. Responsabilidades do Cliente</strong>
        <br />
        O cliente é responsável por fornecer informações corretas, materiais
        legítimos, textos, imagens, logotipo, acessos, dados comerciais e
        aprovações necessárias. O cliente declara possuir autorização de uso
        sobre todos os materiais enviados e assume responsabilidade por
        informações falsas, incompletas, ilegais ou que violem direitos de
        terceiros.
      </p>

      <p>
        <strong className="text-white">6. Prazos e Dependências</strong>
        <br />
        Os prazos informados dependem do envio completo das informações pelo
        cliente. Atrasos no envio de materiais, aprovações, acessos, pagamentos
        ou respostas podem alterar automaticamente o prazo de entrega, sem
        caracterizar falha na prestação do serviço.
      </p>

      <p>
        <strong className="text-white">7. Aprovações e Revisões</strong>
        <br />
        Durante o desenvolvimento, o cliente poderá solicitar ajustes dentro do
        escopo contratado. Aprovações por WhatsApp, e-mail, formulário, reunião,
        mensagem, pagamento ou continuidade do uso do serviço poderão ser
        registradas como prova de aceite. Alterações solicitadas após aprovação,
        publicação ou entrega podem ser tratadas como manutenção ou serviço
        adicional.
      </p>

      <p>
        <strong className="text-white">
          8. Propriedade Intelectual e Licença de Uso
        </strong>
        <br />
        Em planos de assinatura mensal, o cliente contrata uma licença de uso da
        solução, com hospedagem, manutenção e suporte enquanto a assinatura
        estiver ativa. O código-fonte, componentes, estrutura, templates,
        métodos, automações, design base, bibliotecas internas e arquivos
        editáveis permanecem de titularidade da UiCode.site, salvo acordo
        escrito de cessão ou compra integral do projeto.
      </p>

      <p>
        <strong className="text-white">9. Pagamentos e Recorrência</strong>
        <br />
        Os pagamentos podem ser processados por plataformas terceiras, como
        Stripe ou meios equivalentes. A assinatura é cobrada de forma recorrente
        conforme o plano escolhido. A inadimplência pode resultar em suspensão
        de suporte, manutenção, hospedagem, publicação do site e acesso aos
        serviços vinculados.
      </p>

      <p>
        <strong className="text-white">10. Custos de Terceiros</strong>
        <br />
        Domínios, plugins, APIs, ferramentas externas, bancos de imagens,
        automações, integrações, contas pagas, taxas de gateway, hospedagens
        especiais ou serviços de terceiros podem ter custos próprios. Quando
        pagos ou configurados para o cliente, esses valores não são
        reembolsáveis após contratação, ativação ou uso.
      </p>

      <p>
        <strong className="text-white">11. Contestação Indevida e Má-fé</strong>
        <br />
        O cliente se compromete a entrar em contato com a UiCode.site para
        resolver qualquer dúvida, falha, desacordo, cancelamento ou solicitação
        de reembolso antes de abrir contestação junto ao banco, operadora de
        cartão ou plataforma de pagamento. Contestações feitas após início,
        entrega, publicação, uso ou aprovação do serviço poderão ser respondidas
        com evidências de contratação, aceite, execução, comunicações, arquivos,
        logs, prints, histórico de pagamento, acesso, entrega e uso do serviço.
      </p>

      <p>
        <strong className="text-white">
          12. Suspensão por Chargeback ou Inadimplência
        </strong>
        <br />
        Em caso de chargeback, contestação, bloqueio de pagamento, suspeita de
        fraude, inadimplência ou descumprimento destes termos, a UiCode.site
        poderá suspender temporariamente ou definitivamente a hospedagem,
        suporte, manutenção, domínio, publicações, atualizações e licença de uso
        até a regularização da situação.
      </p>

      <p>
        <strong className="text-white">13. Limitação de Garantias</strong>
        <br />
        A UiCode.site se compromete a aplicar boas práticas de design,
        tecnologia, performance, responsividade e SEO técnico. Entretanto,
        resultados comerciais, vendas, faturamento, posicionamento no Google,
        número de leads ou desempenho de anúncios dependem também de mercado,
        oferta, atendimento, investimento, reputação, concorrência e ações do
        próprio cliente, não sendo garantidos.
      </p>

      <p>
        <strong className="text-white">14. Registro de Evidências</strong>
        <br />
        Para segurança das partes, poderão ser armazenados registros de
        contratação, aceite dos termos, comprovantes de pagamento, mensagens,
        aprovações, briefing, arquivos enviados, datas de entrega, publicações,
        alterações, acessos, IP, e-mails, logs técnicos e histórico de suporte,
        respeitando a legislação aplicável.
      </p>

      <p>
        <strong className="text-white">15. Alterações dos Termos</strong>
        <br />
        Estes Termos podem ser atualizados periodicamente para refletir
        melhorias, mudanças legais, operacionais ou comerciais. A versão vigente
        será aquela publicada no site no momento da contratação ou renovação do
        serviço.
      </p>
    </div>
  ),

  privacy: (
    <div className="space-y-5">
      <p>
        <strong className="text-white">1. Dados Coletados</strong>
        <br />
        Coletamos apenas dados necessários para atendimento, contratação,
        pagamento, execução e suporte dos serviços, como nome, e-mail, telefone,
        empresa, dados de cobrança, mensagens, briefing, arquivos enviados e
        informações técnicas de acesso ao site.
      </p>

      <p>
        <strong className="text-white">2. Finalidade do Tratamento</strong>
        <br />
        Os dados são utilizados para atendimento comercial, elaboração de
        proposta, execução do projeto, emissão de cobranças, suporte,
        manutenção, hospedagem, segurança, prevenção a fraude, comprovação de
        contratação e defesa em disputas, contestações ou solicitações
        administrativas.
      </p>

      <p>
        <strong className="text-white">3. Pagamentos</strong>
        <br />
        Pagamentos podem ser processados por plataformas terceiras, como Stripe.
        A UiCode.site não armazena dados completos de cartão de crédito.
        Informações de pagamento, transação, recibo e status podem ser mantidas
        para controle financeiro, suporte, auditoria, prevenção de fraude e
        defesa em disputas.
      </p>

      <p>
        <strong className="text-white">4. Compartilhamento de Dados</strong>
        <br />
        Dados podem ser compartilhados apenas quando necessário com provedores
        de pagamento, hospedagem, domínio, e-mail, analytics, segurança, suporte
        técnico, ferramentas de atendimento ou autoridades competentes, sempre
        dentro da finalidade do serviço contratado.
      </p>

      <p>
        <strong className="text-white">5. Cookies e Métricas</strong>
        <br />
        Podemos utilizar cookies, pixels, analytics e ferramentas semelhantes
        para segurança, análise de desempenho, melhoria de navegação e
        entendimento de uso do site. O usuário pode gerenciar cookies
        diretamente nas configurações do navegador.
      </p>

      <p>
        <strong className="text-white">6. Segurança</strong>
        <br />
        Aplicamos medidas razoáveis de segurança para proteger dados contra
        acesso indevido, perda, alteração ou uso não autorizado. Nenhum sistema é
        totalmente imune a riscos, mas buscamos adotar boas práticas compatíveis
        com o tipo de serviço prestado.
      </p>

      <p>
        <strong className="text-white">7. Direitos do Titular</strong>
        <br />O titular pode solicitar confirmação de tratamento, acesso,
        correção, exclusão, portabilidade, informações sobre compartilhamento e
        demais direitos previstos na LGPD, quando aplicável. Solicitações podem
        ser enviadas para contato@uicode.site.
      </p>

      <p>
        <strong className="text-white">8. Retenção de Dados</strong>
        <br />
        Dados relacionados à contratação, pagamentos, entregas, suporte, aceite,
        comunicações e evidências poderão ser mantidos pelo tempo necessário
        para cumprimento de obrigações legais, exercício regular de direitos,
        prevenção a fraude, auditoria e defesa em disputas.
      </p>
    </div>
  ),

  cancellation: (
    <div className="space-y-5">
      <p>
        <strong className="text-white">1. Cancelamento da Assinatura</strong>
        <br />O cliente pode solicitar o cancelamento da assinatura a qualquer
        momento por e-mail ou WhatsApp. O cancelamento interrompe cobranças
        futuras, mas não apaga automaticamente débitos pendentes, valores já
        faturados, custos de terceiros ou serviços já executados.
      </p>

      <p>
        <strong className="text-white">
          2. Serviço Ativo Até o Fim do Período Pago
        </strong>
        <br />
        Após o cancelamento, o serviço poderá permanecer ativo até o fim do ciclo
        já pago. Ao final do período, hospedagem, manutenção, suporte,
        atualizações, domínio vinculado e licença de uso poderão ser suspensos.
      </p>

      <p>
        <strong className="text-white">3. Direito de Arrependimento</strong>
        <br />
        Quando aplicável pela legislação brasileira, o cliente consumidor poderá
        solicitar cancelamento dentro do prazo legal de arrependimento. No
        entanto, caso o serviço já tenha sido iniciado com autorização, briefing
        enviado, reunião realizada, criação executada, configuração feita,
        publicação realizada ou uso efetivo do serviço, poderão ser descontados
        ou retidos valores referentes ao trabalho já prestado, custos
        operacionais e despesas de terceiros, respeitada a legislação aplicável.
      </p>

      <p>
        <strong className="text-white">
          4. Reembolso Antes do Início da Execução
        </strong>
        <br />
        Solicitações feitas antes do início de qualquer execução, configuração,
        criação, reunião, planejamento, hospedagem, domínio, integração ou
        atendimento técnico poderão ser analisadas para reembolso, descontadas
        eventuais taxas de pagamento, custos já incorridos e serviços de
        terceiros não reembolsáveis.
      </p>

      <p>
        <strong className="text-white">5. Reembolso Após Início do Serviço</strong>
        <br />
        Após o início da execução, não haverá reembolso automático do período
        vigente, setup, criação, planejamento, design, programação, manutenção,
        domínio, hospedagem, integrações, reuniões, suporte, arquivos,
        publicações, melhorias ou qualquer etapa já realizada. A assinatura
        cobre disponibilidade, manutenção, suporte e licença de uso durante o
        ciclo contratado.
      </p>

      <p>
        <strong className="text-white">6. Projetos Personalizados</strong>
        <br />
        Serviços personalizados, feitos sob demanda ou adaptados especificamente
        para o negócio do cliente, envolvem alocação de tempo, criatividade,
        planejamento e execução técnica. Por isso, após aprovação, início ou
        entrega parcial, valores pagos por etapas executadas não são
        reembolsáveis, salvo acordo escrito entre as partes ou obrigação legal.
      </p>

      <p>
        <strong className="text-white">7. Custos Não Reembolsáveis</strong>
        <br />
        Não são reembolsáveis valores relacionados a domínio, hospedagem, APIs,
        plugins, licenças, ferramentas externas, taxas de gateway, serviços de
        terceiros, horas técnicas executadas, reuniões realizadas, suporte
        prestado, configurações, publicações e qualquer despesa já assumida para
        execução do projeto.
      </p>

      <p>
        <strong className="text-white">8. Contestação no Banco ou Cartão</strong>
        <br />
        Antes de abrir contestação no banco ou cartão, o cliente deve entrar em
        contato com a UiCode.site para tentativa de solução amigável. Caso uma
        contestação seja aberta após contratação, aceite, início, uso,
        publicação, aprovação ou entrega parcial do serviço, a UiCode.site
        poderá apresentar evidências à instituição financeira, incluindo termos
        aceitos, comprovantes, mensagens, prints, briefing, registros de entrega,
        logs, publicações, alterações e histórico de suporte.
      </p>

      <p>
        <strong className="text-white">
          9. Suspensão por Contestação ou Inadimplência
        </strong>
        <br />A abertura de chargeback, disputa, contestação, bloqueio de
        pagamento ou inadimplência poderá resultar na suspensão imediata de
        hospedagem, suporte, manutenção, domínio, atualizações, licença de uso e
        demais serviços vinculados, até que a situação seja regularizada.
      </p>

      <p>
        <strong className="text-white">10. Exportação de Conteúdo</strong>
        <br />
        Após o cancelamento, o cliente pode solicitar exportação de textos,
        imagens e conteúdos próprios enviados por ele em até 30 dias.
        Código-fonte, componentes, automações, layouts editáveis e estrutura
        técnica não são transferidos em planos de assinatura, salvo acordo
        específico de compra ou cessão.
      </p>

      <p>
        <strong className="text-white">11. Solicitação Formal</strong>
        <br />
        Para cancelamentos, reembolsos, dúvidas financeiras ou encerramento de
        contrato, o cliente deve enviar solicitação por canal oficial, informando
        nome, e-mail, plano contratado e motivo da solicitação. A análise será
        feita com base no histórico de contratação, execução, pagamentos, uso e
        comunicações.
      </p>
    </div>
  ),
};