import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import type { Metadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const post = blogPosts.find(
    (p) => p.slug === params.slug
  );

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
  };
}

export default function BlogPostPage({
  params,
}: Props) {
  const post = blogPosts.find(
    (p) => p.slug === params.slug
  );

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#030303] text-white">

      {/* topo */}
      <section className="border-b border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 py-28">

          {/* breadcrumb */}
          <p className="text-cyan-400 text-sm font-medium mb-6">
            Blog • UiCode.site
          </p>

          {/* título */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8">
            {post.title}
          </h1>

          {/* descrição */}
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
            {post.description}
          </p>

          {/* keywords */}
          <div className="flex flex-wrap gap-3 mt-10">
            {post.keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* conteúdo */}
      <section>
        <div className="max-w-3xl mx-auto px-6 py-20">

          {/* artigo */}
          <article className="prose prose-invert prose-lg max-w-none">

            {/* texto */}
            <div className="text-slate-300 leading-9 text-[1.1rem] whitespace-pre-line">
              {post.content}
            </div>
          </article>

          {/* CTA final */}
          <div className="mt-24 rounded-[2rem] border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-10">

            <p className="text-cyan-400 font-semibold mb-3">
              Precisa de um projeto profissional?
            </p>

            <h3 className="text-4xl font-bold mb-5 leading-tight">
              Criamos sites e sistemas com foco em conversão.
            </h3>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl">
              Desenvolvemos landing pages, e-commerces, sistemas web e aplicativos premium para empresas que querem crescer no digital.
            </p>

            <a
              href="https://wa.me/5511916474626"
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-cyan-500 text-white font-bold hover:bg-cyan-400 transition-all"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}