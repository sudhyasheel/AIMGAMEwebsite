import { motion } from "framer-motion";
import { GraduationCap, Quote } from "lucide-react";
import { EASE } from "@/components/Reveal";

const Photo = ({ src, label, alt, testid }) => (
  <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-sand-deep">
    <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
    <span className="absolute bottom-3 left-3 rounded-full bg-night/85 backdrop-blur px-3.5 py-1.5 font-mono text-[10px] tracking-[0.25em] text-sand font-semibold" data-testid={testid}>
      {label}
    </span>
  </div>
);

const ScholarPair = ({ scholar, index }) => {
  const flip = index % 2 === 1;
  return (
    <motion.article
      data-testid={`scholar-pair-${index}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center py-16 border-b border-ink/10 last:border-b-0"
    >
      <div className={`lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6 ${flip ? "lg:order-2" : ""}`}>
        <Photo src={scholar.before} label="AGE 5 · ENTRY" alt={`${scholar.name} as a child`} testid={`scholar-before-${index}`} />
        <Photo src={scholar.after} label="AGE 22 · GRADUATE" alt={`${scholar.name} as a graduate`} testid={`scholar-after-${index}`} />
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">{scholar.years.toUpperCase()}</p>
        <h3 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl tracking-tight">{scholar.name}</h3>

        <div className="mt-6 space-y-3">
          <p className="flex items-start gap-3 text-ink-muted leading-relaxed">
            <GraduationCap className="h-5 w-5 text-flame shrink-0 mt-0.5" />
            <span>{scholar.fact}</span>
          </p>
          <p className="flex items-start gap-3 font-semibold text-ink">
            <span className="h-5 w-5 rounded-full bg-leaf inline-block shrink-0 mt-0.5" />
            <span>{scholar.role}</span>
          </p>
        </div>

        <blockquote className="mt-8 relative rounded-2xl bg-leaf-soft p-6">
          <Quote className="h-5 w-5 text-leaf mb-3" />
          <p className="font-display font-bold text-lg leading-snug text-leaf-dark">“{scholar.quote}”</p>
        </blockquote>
      </div>
    </motion.article>
  );
};

export default ScholarPair;
