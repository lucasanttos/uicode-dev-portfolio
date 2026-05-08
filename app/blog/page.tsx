// Página principal do blog
// Lista todos os artigos

import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white px-6 py-32">
      <div className="max-w-5xl mx-auto">

        {/* título */}
        <h1 className="text-5xl font-bold mb-4">
          Blog UiCode
        </h1>

        <p className="text-slate-400 mb-16">
          Conteúdos sobre sites, sistemas, SEO e crescimento digital.
        </p>

        {/* lista de artigos */}
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all bg-[#080808]"
            >
              <h2 className="text-3xl font-bold mb-3">
                {post.title}
              </h2>

              <p className="text-slate-400">
                {post.description}
              </p>

              {/* keywords */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}