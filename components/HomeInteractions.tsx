"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { PolicyKey } from "@/components/sections/Footer";
import PolicyModal from "@/components/ui/PolicyModal";
import { policyContent } from "@/lib/data";

const policyTitles: Record<PolicyKey, string> = {
  terms: "Termos de Uso",
  privacy: "Política de Privacidade",
  cancellation: "Política de Cancelamento",
};

// Concentra a barra de leitura e o modal de políticas sem transformar a página inteira em Client Component.
export default function HomeInteractions() {
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handlePolicy = (event: Event) => {
      const key = (event as CustomEvent<PolicyKey>).detail;
      if (typeof key === "string" && Object.hasOwn(policyTitles, key)) {
        setActivePolicy(key as PolicyKey);
      }
    };

    window.addEventListener("uicode:open-policy", handlePolicy);
    return () => window.removeEventListener("uicode:open-policy", handlePolicy);
  }, []);

  return (
    <>
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[200] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
          style={{ scaleX }}
        />
      )}
      <PolicyModal
        isOpen={!!activePolicy}
        onClose={() => setActivePolicy(null)}
        title={activePolicy ? policyTitles[activePolicy] : ""}
        content={activePolicy ? policyContent[activePolicy] : null}
      />
    </>
  );
}
