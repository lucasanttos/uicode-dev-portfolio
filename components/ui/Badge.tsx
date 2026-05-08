// Badge/pílula com ponto piscando - aparece no topo das seções
// ex: "Agência Digital Premium" no hero

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest",
      "backdrop-blur-sm",
      className
    )}>
      {/* ponto verde piscando */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
      </span>
      {children}
    </div>
  );
}