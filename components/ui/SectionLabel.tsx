// Label pequeno acima dos títulos das seções
// ex: "── ESPECIALIDADES ──" com as linhas dos lados

export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-4">
      <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" /> {/* linha esquerda */}
      <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs">
        {children}
      </span>
      <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" /> {/* linha direita */}
    </div>
  );
}