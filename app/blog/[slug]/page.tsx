import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import type { Metadata } from "next";

 interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// metadata dinâmica SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  // agora precisa await
  const { slug } = await params;

  const post = blogPosts.find(
    (p) => p.slug === slug
  );

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,

    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      locale: "pt_BR",
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps) {

  // await obrigatório no Next 15
  const { slug } = await params;

  const post = blogPosts.find(
    (p) => p.slug === slug
  );

  if (!post) {
    return notFound();
  }

  return (
    <div className="site-shell article-page">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="UiCode, início">
          <span className="wordmark-mark"><Code2 size={17} /></span>
          <span>uicode<span className="wordmark-dot">.</span></span>
        </Link>
        <Link className="header-contact" href="/blog"><ArrowLeft size={15} /> Todos os artigos</Link>
      </header>
      <main>
      <article>
        <header className="article-heading">
          <p className="eyebrow">CADERNO / {post.keywords.slice(0, 2).join(" · ")}</p>
          <h1>{post.title}</h1>
          <p className="article-deck">{post.description}</p>
        </header>
        <div className="article-body">{post.content}</div>
        <aside className="article-cta">
          <p className="eyebrow">TEM UMA IDEIA?</p>
          <h2>Vamos conversar sobre o seu próximo projeto.</h2>
          <a href="https://wa.me/5511916474626" target="_blank" rel="noreferrer">Falar no WhatsApp <ArrowUpRight size={16} /></a>
        </aside>
      </article>
      </main>
      <footer className="site-footer"><Link className="wordmark" href="/"><span className="wordmark-mark"><Code2 size={16} /></span><span>uicode<span className="wordmark-dot">.</span></span></Link><p>Design atento. Código bem pensado.</p><Link className="footer-journal" href="/blog">CADERNO <ArrowUpRight size={13} /></Link><span>© {new Date().getFullYear()} UICODE.SITE</span></footer>
    </div>
  );
}
