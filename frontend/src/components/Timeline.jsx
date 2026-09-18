import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { MILESTONES } from "@/data/content";
import { EASE } from "@/components/Reveal";

const Timeline = () => {
  const [active, setActive] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const m = parseInt(searchParams.get("m"), 10);
    if (!isNaN(m) && m >= 0 && m < MILESTONES.length) setActive(m);
  }, [searchParams]);

  return (
    <div data-testid="timeline-full" className="relative">
      {/* Year ruler */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">YEAR 1</span>
        <div className="relative flex-1 h-px bg-ink/15">
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-flame"
            initial={{ width: "0%" }}
            whileInView={{ width: `${((active + 1) / MILESTONES.length) * 100}%` }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
        <span className="font-mono text-xs tracking-[0.3em] text-flame font-bold">YEAR 15</span>
      </div>

      {/* Desktop: pictorial timeline with clickable milestones */}
      <div className="hidden md:block relative" data-testid="timeline-track">
        <img
          src="/assets/journey2.png"
          alt="The AimGame journey — Year 1 start of program to Year 13-15 college graduate"
          className="w-full"
        />
        <div className="absolute inset-0 flex">
          {MILESTONES.map((m, i) => (
            <button
              key={m.title}
              data-testid={`timeline-milestone-${i}`}
              onClick={() => setActive(i)}
              aria-label={`Expand ${m.title}`}
              className={`flex-1 h-full rounded-2xl cursor-pointer transition-all duration-300 ${
                active === i ? "ring-4 ring-inset ring-flame/70 bg-flame/5" : "hover:bg-leaf/5"
              }`}
            />
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] tracking-[0.25em] text-ink-muted">
          TAP A MILESTONE TO EXPAND
        </p>
      </div>

      {/* Mobile: vertical stepper */}
      <div className="md:hidden space-y-4">
        {MILESTONES.map((m, i) => {
          const isActive = active === i;
          return (
            <div key={m.title} className="relative pl-10">
              <span
                className={`absolute left-0 top-6 h-5 w-5 rounded-full border-4 transition-colors duration-500 ${
                  isActive ? "bg-flame border-flame/25" : "bg-leaf border-leaf-soft"
                }`}
              />
              {i < MILESTONES.length - 1 && (
                <span className="absolute left-[9px] top-12 bottom-[-16px] w-px bg-ink/15" />
              )}
              <button
                data-testid={`timeline-milestone-mobile-${i}`}
                onClick={() => setActive(i)}
                className={`w-full text-left rounded-2xl border p-6 transition-colors duration-500 ${
                  isActive ? "bg-night text-sand border-night" : "bg-white border-ink/10"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-display font-extrabold text-3xl ${isActive ? "text-flame" : "text-ink/25"}`}>
                    {m.age}
                  </span>
                  <span className={`font-mono text-[10px] tracking-[0.25em] ${isActive ? "text-sand/60" : "text-leaf"}`}>
                    {m.year.toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-2 font-display font-bold text-lg">{m.title}</h3>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-sand/75 leading-relaxed">{m.detail}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {m.chips.map((c) => (
                          <span key={c} className="rounded-full bg-sand/10 px-3 py-1 text-[11px] font-semibold text-sand/80">
                            {c}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          );
        })}
      </div>

      {/* Desktop expanded detail panel */}
      <div className="hidden md:block mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            data-testid="timeline-detail-panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="rounded-3xl bg-white border border-ink/10 p-10 lg:p-14 grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-4">
              <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">
                MILESTONE {String(active + 1).padStart(2, "0")} · {MILESTONES[active].age}
              </p>
              <h3 className="mt-4 font-display font-extrabold text-3xl tracking-tight">
                {MILESTONES[active].title}
              </h3>
            </div>
            <div className="lg:col-span-5">
              <p className="text-ink-muted leading-relaxed text-base sm:text-lg">
                {MILESTONES[active].detail}
              </p>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-3 justify-center">
              {MILESTONES[active].chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-leaf-soft text-leaf-dark px-4 py-2 text-xs font-bold tracking-wide"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Timeline;
