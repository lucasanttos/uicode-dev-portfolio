// Rodapé com logo, navegação, redes sociais e links de política
// Os modais de política são abertos via onOpenPolicy que vem do page.tsx

"use client";

import { motion } from "framer-motion";
import { Code, Instagram, Linkedin, Github, MessageCircle, FileText, Shield, RefreshCw } from "lucide-react";

// tipo exportado para usar no page.tsx também
export type PolicyKey = "terms" | "privacy" | "cancellation";

// mesmos itens do header
const navItems = [
  { label: "Especialidades", id: "services" },
  { label: "Cases",          id: "projects" },
  { label: "Planos",         id: "pricing"  },
  { label: "Contato",        id: "contact"  },
];

interface FooterProps {
  onNavigate: (id: string) => void;
  onOpenPolicy: (key: PolicyKey) => void;
}

export default function Footer({ onNavigate, onOpenPolicy }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-[#020202] relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ── PARTE SUPERIOR - 3 colunas ── */}
        <div className="py-16 grid md:grid-cols-3 gap-12">

          {/* logo e descrição */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Code size={16} className="text-white" />
              </div>
              <span className="font-mono font-bold text-white">
                UiCode<span className="text-cyan-400">.site</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Criando presenças digitais de alto impacto para negócios que querem crescer de verdade.
            </p>
          </div>

          {/* links de navegação */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Navegação
            </p>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="text-sm text-slate-500 hover:text-white text-left transition-colors w-fit"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* redes sociais e WhatsApp */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Redes Sociais
            </p>

            {/* ícones das redes - trocar o href pelo link real */}
            <div className="flex gap-3 mb-6">
              {[
                { icon: Instagram, href: "#", label: "Instagram" }, // trocar pelo instagram real
                { icon: Linkedin,  href: "#", label: "LinkedIn"  }, // trocar pelo linkedin real
                { icon: Github,    href: "#", label: "GitHub"    }, // trocar pelo github real
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                  aria-label={label}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>

            {/* botão de WhatsApp direto */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => window.open("https://wa.me/5511916474626", "_blank")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-all"
            >
              <MessageCircle size={15} />
              WhatsApp direto
            </motion.button>
          </div>
        </div>

        {/* ── PARTE INFERIOR - copyright e políticas ── */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} UiCode.site — Todos os direitos reservados.</p>

          {/* links que abrem os modais de política */}
          <div className="flex gap-5">
            {(
              [
                { key: "terms"        as PolicyKey, icon: FileText,  label: "Termos de Uso" },
                { key: "privacy"      as PolicyKey, icon: Shield,    label: "Privacidade"   },
                { key: "cancellation" as PolicyKey, icon: RefreshCw, label: "Cancelamento"  },
              ] as const
            ).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => onOpenPolicy(key)}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}