import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
import { blogPosts } from "@/lib/blog";

// Mantém a leitura do blog no mesmo sistema editorial da página inicial.
export default function BlogPage() {
  return (
    <div className="site-shell blog-page">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="UiCode, início">
          <span className="wordmark-mark"><Code2 size={17} /></span>
          <span>uicode<span className="wordmark-dot">.</span></span>
        </Link>
        <Link className="header-contact" href="/">Voltar ao portfólio <ArrowLeft size={15} /></Link>
      </header>

      <main>
      <section className="blog-intro">
        <p className="eyebrow">CADERNO / UICODE.SITE</p>
        <h1>Ideias para<br /><em>construir melhor.</em></h1>
        <p>Notas práticas sobre produto digital, presença online e o trabalho por trás de uma boa experiência.</p>
      </section>

      <section className="blog-list" aria-label="Artigos publicados">
        {blogPosts.map((post, index) => (
          <Link className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
            <span className="blog-card-index">0{index + 1}</span>
            <div>
              <span className="eyebrow">{post.keywords.slice(0, 2).join(" · ")}</span>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
            <ArrowUpRight className="blog-card-arrow" size={20} />
          </Link>
        ))}
      </section>

      </main>
      <footer className="site-footer"><Link className="wordmark" href="/"><span className="wordmark-mark"><Code2 size={16} /></span><span>uicode<span className="wordmark-dot">.</span></span></Link><p>Design atento. Código bem pensado.</p><span>© {new Date().getFullYear()} UICODE.SITE</span></footer>
    </div>
  );
}
