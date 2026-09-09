import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import ScholarPair from "@/components/ScholarPair";
import { SCHOLARS } from "@/data/content";

const Transformations = () => (
  <main data-testid="transformations-page">
    <section className="pt-32 lg:pt-44 pb-10 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal><Eyebrow>Transformations</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
            Age five, meet <span className="text-leaf">age twenty-two.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-muted">
            Every scholar below entered AimGame through a board game at five and exited with a degree and a
            profession. No filters, no gimmicks — childhood and graduation, side by side, with the facts
            that connect them.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {SCHOLARS.map((s, i) => (
          <ScholarPair key={s.name} scholar={s} index={i} />
        ))}
      </div>
    </section>

    <section data-testid="transformations-cta" className="py-24 lg:py-28 bg-night text-sand relative grain overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-flame font-bold">THE NEXT COHORT IS WAITING</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Every pair of photos started with one partner.
          </h2>
        </Reveal>
        <Reveal delay={0.18}>
          <Link
            to="/partner"
            data-testid="transformations-cta-partner"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-flame px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
          >
            Become That Partner
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  </main>
);

export default Transformations;
