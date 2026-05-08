// Modal que aparece quando clico em Termos, Privacidade ou Cancelamento no footer
// Bloqueia o scroll da página enquanto está aberto

"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
  // bloqueia o scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* fundo escurecido - clicando aqui fecha o modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* caixa do modal */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#080808] border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-3xl shadow-2xl flex flex-col z-[101]"
          >
            {/* cabeçalho fixo com título e botão fechar */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#080808] rounded-t-3xl z-10">
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* conteúdo com scroll independente */}
            <div className="p-6 overflow-y-auto text-slate-400 text-sm leading-relaxed space-y-4">
              {content}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}