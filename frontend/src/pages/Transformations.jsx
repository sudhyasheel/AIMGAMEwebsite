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

    <section data-testid="spotlight-section" className="py-20 lg:py-28 bg-night text-sand relative grain overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-[18%] h-96 w-96 rounded-full bg-flame/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[15%] h-96 w-96 rounded-full bg-leaf/20 blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <p className="text-center font-mono text-xs tracking-[0.3em] text-flame font-bold">SPOTLIGHT</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 text-center font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            One scholar. Two photographs.<br className="hidden sm:block" /> Fifteen years between them.
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 gap-10 sm:gap-8 lg:gap-14 items-start">
          <Reveal delay={0.15}>
            <figure data-testid="spotlight-started" className="group">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] bg-flame/20 blur-xl opacity-70 pointer-events-none" />
                <div className="relative overflow-hidden rounded-3xl border border-sand/15 aspect-[4/3] bg-night">
                  <img
                    src="/assets/started.png"
                    alt="A young AimGame scholar playing connect-four at program entry"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <figcaption className="mt-6 text-center">
                <p className="font-mono text-xs tracking-[0.3em] text-flame font-bold">HOW IT STARTED</p>
                <p className="mt-2 text-sm text-sand/60">Play-based entry — the board game that found her.</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.3} className="sm:mt-16">
            <figure data-testid="spotlight-going" className="group">
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] bg-leaf/25 blur-xl opacity-70 pointer-events-none" />
                <div className="relative overflow-hidden rounded-3xl border border-sand/15 aspect-[4/3] bg-night">
                  <img
                    src="/assets/going.png"
                    alt="The same scholar, now a graduate, presenting with confidence"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <figcaption className="mt-6 text-center">
                <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">HOW IT'S GOING</p>
                <p className="mt-2 text-sm text-sand/60">Graduate and professional — owning the room.</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="py-24 lg:pb-32 lg:pt-24">
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
