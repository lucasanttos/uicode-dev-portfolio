// Faixa de texto rolando infinitamente entre o Hero e as Stats
// Os itens vêm do data.tsx - marqueeItems

"use client";

import { marqueeItems } from "@/lib/data";

export default function InfiniteMarquee() {
  // Duplica a faixa para manter a repetição contínua sem recalcular a animação em JavaScript.
  const repeated = [...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full border-y border-white/5 py-5 overflow-hidden flex whitespace-nowrap relative z-10">
      {/* gradiente nas bordas para suavizar o início e fim */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303] z-10 pointer-events-none" />

      {/* A animação CSS usa duas cópias para fechar o ciclo sem salto. */}
      <div className="flex w-max animate-marquee items-center gap-10 motion-reduce:animate-none">
        {repeated.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-10 shrink-0">
              <div className="flex items-center gap-3">
                <Icon size={13} className="text-cyan-500/60" />
                <span className="text-xs font-bold text-slate-500 tracking-[0.25em]">
                  {item.text}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/10" /> {/* separador */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
