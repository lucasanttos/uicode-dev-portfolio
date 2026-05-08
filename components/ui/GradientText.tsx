// Texto com gradiente colorido - uso nos títulos das seções
// ex: "resultados reais." em cyan/azul/roxo

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

interface GradientTextProps {
  text: string;
  className?: string;
  from?: string; // cor inicial do gradiente ex: "from-cyan-400"
  via?: string;  // cor do meio
  to?: string;   // cor final
}

export default function GradientText({
  text,
  className = "",
  from = "from-cyan-400",   // padrão cyan
  via  = "via-blue-400",
  to   = "to-purple-500",   // padrão roxo
}: GradientTextProps) {
  return (
    <span className={cn(`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent`, className)}>
      {text}
    </span>
  );
}