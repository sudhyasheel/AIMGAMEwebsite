import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MILESTONES } from "@/data/content";
import { EASE } from "@/components/Reveal";

const Timeline = ({ compact = false }) => {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  const scrollTrack = (dir) =>
    trackRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <div data-testid={compact ? "timeline-compact" : "timeline-full"} className="relative">
      {/* Age ruler */}
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">AGE 5</span>
        <div className="relative flex-1 h-px bg-ink/15">
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-flame"
            initial={{ width: "0%" }}
            whileInView={{ width: `${((active + 1) / MILESTONES.length) * 100}%` }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
        <span className="font-mono text-xs tracking-[0.3em] text-flame font-bold">AGE 22</span>
      </div>

      {/* Desktop / tablet: horizontal track */}
      <div className="hidden md:block relative">
        <div
          ref={trackRef}
          data-testid="timeline-track"
          className="flex gap-5 overflow-x-auto no-scrollbar snap-x pb-2"
        >
          {MILESTONES.map((m, i) => {
            const isActive = active === i;
            return (
              <button
                key={m.title}
                data-testid={`timeline-milestone-${i}`}
                onClick={() => setActive(i)}
                className={`snap-start shrink-0 w-[380px] text-left rounded-3xl border p-8 transition-[background-color,border-color,transform] duration-500 group ${
                  isActive
                    ? "bg-night text-sand border-night"
                    : "bg-white border-ink/10 hover:border-flame/40 hover:-translate-y-1"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`font-display font-extrabold text-6xl tracking-tight ${
                      isActive ? "text-flame" : "text-ink/15 group-hover:text-flame/40"
                    } transition-colors duration-500`}
                  >
                    {m.age}
                  </span>
                  <span
                    className={`h-9 w-9 rounded-full inline-flex items-center justify-center transition-all duration-500 ${
                      isActive ? "bg-flame text-white rotate-45" : "bg-leaf-soft text-leaf"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
                <p className={`mt-6 font-mono text-[11px] tracking-[0.25em] ${isActive ? "text-sand/60" : "text-leaf"}`}>
                  {m.year.toUpperCase()}
                </p>
                <h3 className="mt-2 font-display font-bold text-xl leading-snug">{m.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${isActive ? "text-sand/70" : "text-ink-muted"}`}>
                  {m.teaser}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            data-testid="timeline-scroll-left"
            onClick={() => scrollTrack(-1)}
            aria-label="Scroll timeline left"
            className="h-11 w-11 rounded-full border border-ink/15 bg-white inline-flex items-center justify-center transition-colors hover:bg-sand-deep"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            data-testid="timeline-scroll-right"
            onClick={() => scrollTrack(1)}
            aria-label="Scroll timeline right"
            className="h-11 w-11 rounded-full border border-ink/15 bg-white inline-flex items-center justify-center transition-colors hover:bg-sand-deep"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          {!compact && (
            <span className="ml-3 font-mono text-[11px] tracking-[0.25em] text-ink-muted">
              TAP A MILESTONE TO EXPAND
            </span>
          )}
        </div>
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
      {!compact && (
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
                  MILESTONE {String(active + 1).padStart(2, "0")} · AGES {MILESTONES[active].age}
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
      )}

      {compact && (
        <div className="mt-10">
          <Link
            to="/program"
            data-testid="timeline-explore-link"
            className="group inline-flex items-center gap-3 font-display font-bold text-lg text-flame"
          >
            Expand the full 15-year timeline
            <span className="h-10 w-10 rounded-full bg-flame text-white inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Timeline;
