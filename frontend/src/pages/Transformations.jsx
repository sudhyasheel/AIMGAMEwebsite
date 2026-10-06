import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const GRADUATES = [
  {
    src: "/assets/results-1.jpg",
    alt: "How it started — a young scholar playing connect-four, and how it's going — the same scholar presenting at a podium",
  },
  {
    src: "/assets/results-2.jpg",
    alt: "How it started — a young scholar at entry, and how it's going — grown confident through the program",
  },
  {
    src: "https://images.unsplash.com/photo-1633061273960-9c33bf7cc0c6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBzdHVkZW50JTIwZWR1Y2F0aW9uJTIwc2Nob29sJTIwZ3JhZHVhdGlvbiUyMGZ1dHVyZSUyMGxlYWRlcnxlbnwwfHx8fDE3ODg5MzU3MjB8MA&ixlib=rb-4.1.0&q=85",
    alt: "An AimGame college graduate",
  },
  {
    src: "https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBzdHVkZW50JTIwZWR1Y2F0aW9uJTIwc2Nob29sJTIwZ3JhZHVhdGlvbiUyMGZ1dHVyZSUyMGxlYWRlcnxlbnwwfHx8fDE3ODg5MzU3MjB8MA&ixlib=rb-4.1.0&q=85",
    alt: "An AimGame college graduate",
  },
];

const ON_THE_PATH = [
  { src: "/assets/tl-1.jpg", stage: "YEAR 1", label: "The Entrance Game", alt: "A young scholar at the entrance game competition" },
  { src: "/assets/tl-2.jpg", stage: "YEAR 3", label: "Early School Years", alt: "A scholar in her early program years" },
  { src: "/assets/tl-3.jpg", stage: "YEAR 6", label: "Middle School", alt: "A scholar grown confident through the program" },
  { src: "/assets/tl-4.jpg", stage: "YEAR 8", label: "High School", alt: "A scholar in her school uniform" },
];

const Transformations = () => (
  <main data-testid="transformations-page">
    <section className="pt-44 sm:pt-60 pb-16 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <h1
            data-testid="results-header"
            className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
          >
            The Proof: From Poverty to College Graduate
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            data-testid="results-subheader"
            className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight"
          >
            Meet our graduates, and the scholars following right behind them.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p data-testid="results-description" className="mt-8 max-w-3xl text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
            Each of our graduates began as a child playing a game. Today they hold a college degree. The
            scholars below them are on the same path, one milestone at a time.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">OUR GRADUATES · BEFORE & AFTER</p>
        </Reveal>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {GRADUATES.map((g, i) => (
            <Reveal key={g.src} delay={0.05 + i * 0.06}>
              <figure
                data-testid={`results-graduate-${i}`}
                className="group overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.25)]"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <figcaption className="px-6 py-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-ink-muted font-bold">
                    GRADUATE {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-leaf font-bold">
                    AIMGAME · 15 YEARS
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">RIGHT BEHIND THEM</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink">
            Scholars on the path right now.
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ON_THE_PATH.map((s, i) => (
            <Reveal key={s.src} delay={0.05 + i * 0.06}>
              <figure data-testid={`results-scholar-${i}`} className="group">
                <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white aspect-[4/5]">
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-3">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-flame font-bold">{s.stage}</span>
                  <span className="block mt-1 text-sm font-bold text-ink">{s.label}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section data-testid="results-cta-band" className="bg-leaf text-white relative grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-24 text-center">
        <Reveal>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase">
            Every graduate started with a game.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            The next fifteen years are being written right now — come be part of them.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/partner"
              data-testid="cta-donate-btn"
              className="group inline-flex items-center gap-2 rounded-full bg-flame px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
            >
              Donate
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/csr-partners"
              data-testid="cta-partner-btn"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 font-bold text-white transition-colors duration-300 hover:border-flame hover:text-flame"
            >
              Partner With Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
);

export default Transformations;
