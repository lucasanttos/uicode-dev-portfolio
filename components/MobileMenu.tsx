"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Code } from "lucide-react";

interface NavItem {
  label: string;
  id: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onNavigate: (id: string) => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
  onNavigate,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#030303]/97 backdrop-blur-xl flex flex-col justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </motion.button>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 mb-8 opacity-30">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Code size={12} className="text-white" />
              </div>
              <span className="font-mono font-bold text-white">
                UiCode.site
              </span>
            </div>

            {[...navItems].reverse().map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => onNavigate(item.id)}
                className="text-3xl font-bold text-white/70 hover:text-white transition-colors tracking-tight"
              >
                {item.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                onClose();
                window.open(
                  "https://wa.me/5511916474626",
                  "_blank"
                );
              }}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl flex items-center gap-2"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}