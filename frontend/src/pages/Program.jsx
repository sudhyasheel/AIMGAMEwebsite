import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Minus } from "lucide-react";
import { Reveal, Eyebrow, EASE } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Timeline from "@/components/Timeline";
import { LAYERS } from "@/data/content";

const Layers = () => {
  const [open, setOpen] = useState(0);
  return (
    <div data-testid="holistic-layers" className="border-t border-ink/10">
      {LAYERS.map((l, i) => {
        const isOpen = open === i;
        return (
          <div key={l.title} className="border-b border-ink/10">
            <button
              data-testid={`layer-toggle-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full py-7 flex items-center gap-6 text-left group"
            >
              <span className={`font-display font-extrabold text-3xl sm:text-4xl transition-colors duration-500 ${isOpen ? "text-flame" : "text-ink/20 group-hover:text-ink/40"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display font-bold text-xl sm:text-2xl tracking-tight">{l.title}</span>
              <span className={`h-10 w-10 rounded-full inline-flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? "bg-flame text-white" : "bg-leaf-soft text-leaf"}`}>
                <Minus className={`h-4 w-4 transition-transform duration-500 ${isOpen ? "" : "-rotate-90"}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-8 pl-[4.5rem] pr-8 max-w-2xl text-ink-muted leading-relaxed text-base sm:text-lg">
                    {l.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const Program = () => (
  <main data-testid="program-page">
    <section className="pt-52 sm:pt-72 pb-16 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal><Eyebrow>The Program</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl max-w-4xl text-leaf uppercase">
            Fifteen years, engineered end to end.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-ink-muted">
            AimGame is not a cheque and a prayer. It is a fifteen-year operating system for one child's life —
            five milestones from age five to twenty-two, each one funded, managed and measured. Tap a
            milestone to see exactly what happens.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal><Timeline /></Reveal>
      </div>
    </section>

    <Marquee dark={false} />

    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>The Holistic Model</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Five layers around one child.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 self-end">
            <Reveal delay={0.15}>
              <p className="text-ink-muted leading-relaxed text-base sm:text-lg max-w-xl">
                Poverty attacks from every direction — fees, transport, health, confidence. So AimGame
                defends from every direction. Each layer exists because its absence once ended a child's
                education.
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1}><Layers /></Reveal>
      </div>
    </section>

    <section data-testid="program-partnership-band" className="py-24 lg:py-28 bg-leaf text-white relative grain overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Parents are co-signatories, not spectators.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-white/80 leading-relaxed text-base sm:text-lg">
              Every AimGame family signs a partnership agreement at entry: we carry the full cost and
              logistics of fifteen years; they carry attendance, encouragement and ambition. It is a complete
              parent-program partnership — never a one-way benefit.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <Reveal delay={0.15}>
            <Link
              to="/partner"
              data-testid="program-cta-partner"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-leaf-dark transition-transform duration-300 hover:scale-[1.03]"
            >
              Fund a Fifteen-Year Arc
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  </main>
);

export default Program;
