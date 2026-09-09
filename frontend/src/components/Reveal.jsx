import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.85, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "", as = "span" }) => (
  <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Eyebrow = ({ children, light = false }) => (
  <p
    className={`font-mono text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold ${
      light ? "text-flame" : "text-leaf"
    }`}
  >
    {children}
  </p>
);
