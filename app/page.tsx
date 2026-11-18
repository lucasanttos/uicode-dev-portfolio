import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  MessageCircle,
  MoveUpRight,
  Sparkles,
} from "lucide-react";
import { faqData, policyContent, pricingPlans, projects, services, techStack } from "@/lib/data";

const whatsappUrl = "https://wa.me/5511916474626";

// Monta a página como HTML de servidor e deixa o navegador sem JavaScript de animação para o conteúdo editorial.
export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="UiCode, início">
          <span className="wordmark-mark"><Code2 size={17} strokeWidth={2.2} /></span>
          <span>uicode<span className="wordmark-dot">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#work">Projetos</a>
          <a href="#studio">O que faço</a>
          <a href="#plans">Planos</a>
          <a href="/blog">Caderno</a>
        </nav>
        <a className="header-contact" href={whatsappUrl} target="_blank" rel="noreferrer">
          Vamos conversar <MoveUpRight size={15} />
        </a>
      </header>

      <main>
      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> Estúdio independente de produto digital</p>
          <h1>Design que pensa.<br /><span>Código que resolve.</span></h1>
          <div className="hero-bottom">
            <p>Transformo ideias em experiências digitais claras, cuidadosas e prontas para o mundo real.</p>
            <a className="text-link" href="#work">Conheça meu trabalho <ArrowDown size={15} /></a>
          </div>
        </div>

        <div className="hero-art" aria-label="Detalhe gráfico da identidade UiCode">
          <div className="art-index"><span>UI / CODE</span><span>DESDE O PRIMEIRO PIXEL</span></div>
          <div className="art-grid" aria-hidden="true" />
          <div className="art-orbit art-orbit-one" aria-hidden="true" />
          <div className="art-orbit art-orbit-two" aria-hidden="true" />
          <div className="art-sun" aria-hidden="true" />
          <div className="art-type" aria-hidden="true">ideias<br /><i>em</i><br />movimento<span>.</span></div>
          <div className="art-stamp"><Sparkles size={15} /> ESTRATÉGIA + DESIGN + TECNOLOGIA</div>
        </div>
        <div className="hero-caption"><span>01 — 05</span><span>PORTFÓLIO SELECIONADO</span><span>BRASIL · REMOTO</span></div>
      </section>

      <section className="intro-strip" id="studio">
        <p className="eyebrow">PENSAMENTO ANTES DO PIXEL</p>
        <div className="intro-copy">
          <h2>Um bom site não chama atenção para si.<br /><span>Ele deixa a ideia impossível de ignorar.</span></h2>
          <p>Trabalho na interseção entre produto, interface e engenharia. Cada escolha visual tem uma razão; cada linha de código, um propósito.</p>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">01 / TRABALHO</p><h2>Feito para <em>funcionar.</em></h2></div>
          <p>Projetos diferentes, uma mesma intenção: resolver o problema com clareza e personalidade.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1}`} key={project.id}>
              <a className="project-image" href={project.link} target="_blank" rel="noreferrer" aria-label={`Abrir projeto ${project.title}`}>
                <Image
                  src={project.image}
                  alt={`Prévia visual de ${project.title}`}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 42vw"
                  quality={78}
                  priority={index === 0}
                  className="project-image-file"
                />
                <span className="project-open"><ArrowUpRight size={17} /></span>
                <span className="project-number">0{index + 1}</span>
              </a>
              <div className="project-meta"><span>{project.category}</span><span>{project.tech.slice(0, 2).join(" · ")}</span></div>
              <div className="project-title-row"><h3>{project.title}</h3><ArrowUpRight size={18} /></div>
              <p className="project-description">{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section">
        <div className="approach-head"><p className="eyebrow">02 / COMO POSSO AJUDAR</p><p>Do primeiro rascunho à última revisão, o trabalho começa entendendo o que precisa mudar.</p></div>
        <div className="service-list">
          {services.map((service, index) => {
            const Icon = service.icon;
            return <article className="service-row" key={service.title}>
              <span className="service-index">0{index + 1}</span>
              <div className="service-name"><Icon size={19} strokeWidth={1.7} /><h3>{service.title}</h3></div>
              <p>{service.description}</p>
              <ArrowUpRight className="service-arrow" size={19} />
            </article>;
          })}
        </div>
        <div className="toolkit"><span>FERRAMENTAS</span>{techStack.map((tech) => <i key={tech}>{tech}</i>)}</div>
      </section>

      <section className="statement-section">
        <span className="statement-mark"><Braces size={26} /></span>
        <p>Menos ruído.<br /><em>Mais intenção.</em></p>
        <span className="statement-note">A tecnologia certa é aquela que desaparece atrás de uma experiência simples.</span>
      </section>

      <section className="plans-section" id="plans">
        <div className="section-heading">
          <div><p className="eyebrow">03 / FORMAS DE TRABALHAR</p><h2>Um começo <em>possível.</em></h2></div>
          <p>Escopos iniciais para dar forma à conversa. O projeto é alinhado antes de qualquer contratação.</p>
        </div>
        <div className="plans-grid">
          {pricingPlans.map((plan, index) => (
            <article className={`plan-card ${plan.highlight ? "plan-card-featured" : ""}`} key={plan.name}>
              <div className="plan-topline"><span>0{index + 1} / {plan.name}</span>{plan.highlight && <span className="plan-badge">EM DESTAQUE</span>}</div>
              <p className="plan-description">{plan.description}</p>
              <p className="plan-price"><span>{plan.price.replace("R$ ", "")}</span><small>{plan.cents}<br />{plan.period}</small></p>
              <ul>{plan.features.slice(0, 5).map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
              <a className="plan-link" href={plan.paymentLink} target="_blank" rel="noreferrer">Continuar com este plano <ArrowRight size={16} /></a>
            </article>
          ))}
        </div>
        <details className="faq-disclosure">
          <summary>Dúvidas antes de começar <span>+</span></summary>
          <div className="faq-list">{faqData.map((item) => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</div>
        </details>
      </section>

      <section className="contact-section" id="contact">
        <div><p className="eyebrow">TEM UMA IDEIA?</p><h2>Vamos fazer<br /><em>algo que importa.</em></h2></div>
        <a className="contact-button" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Me chama no WhatsApp <ArrowUpRight size={17} /></a>
      </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#home"><span className="wordmark-mark"><Code2 size={16} /></span><span>uicode<span className="wordmark-dot">.</span></span></a>
        <p>Design atento. Código bem pensado.</p>
        <a className="footer-journal" href="/blog">CADERNO <ArrowUpRight size={13} /></a>
        <a className="footer-github" href="https://github.com/lucasanttos" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={13} /></a>
        <span>© {new Date().getFullYear()} UICODE.SITE</span>
        <details className="legal-disclosure">
          <summary>Informações legais <span>+</span></summary>
          <div className="legal-content">
            <section><h3>Termos de uso</h3>{policyContent.terms}</section>
            <section><h3>Privacidade</h3>{policyContent.privacy}</section>
            <section><h3>Cancelamento</h3>{policyContent.cancellation}</section>
          </div>
        </details>
      </footer>
    </div>
  );
}
