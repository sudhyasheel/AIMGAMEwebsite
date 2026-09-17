import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Reveal, MaskedLine, Eyebrow } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { STATS, MANIFESTO, PARTNERS, FEED, MILESTONES } from "@/data/content";

const HERO_PHOTOS = [
  { src: "/assets/field-1.jpg", alt: "AimGame scholars in a classroom game session" },
  { src: "/assets/field-2.jpg", alt: "A scholar working through a written exercise" },
  { src: "/assets/field-3.jpg", alt: "Scholars playing connect-four in an AimGame session" },
  { src: "/assets/field-4.jpg", alt: "Scholars at a strategy board during selection day" },
];

const Hero = () => (
  <section data-testid="hero-section" className="relative overflow-hidden pt-44 sm:pt-60 pb-16 grain">
    <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
    <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-flame/10 blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <h1 data-testid="hero-headline" className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf max-w-4xl">
        <MaskedLine delay={0.1}>Eradicating poverty</MaskedLine>
        <MaskedLine delay={0.25}>in one generation.</MaskedLine>
      </h1>

      <Reveal delay={0.2}>
        <div className="mt-8 rounded-3xl bg-white border border-ink/10 p-3 sm:p-4 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.2)]">
          <img
            src="/assets/journey.png"
            alt="The AimGame journey — Year 1 start of program to Year 13-15 college graduate"
            data-testid="hero-journey-timeline"
            className="w-full rounded-2xl"
          />
        </div>
      </Reveal>

      <Reveal delay={0.28}>
        <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-muted">
          AimGame is not a cheque and a prayer. It is a fifteen-year operating system for one child's
          life — five milestones from age five to twenty-two, each one funded, managed and measured.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-10 flex items-center gap-4">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-leaf font-bold">AGE 5</span>
          <div className="relative flex-1 h-px bg-ink/15">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] w-1/5 rounded-full bg-flame" />
          </div>
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-flame font-bold">AGE 22</span>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {MILESTONES.map((m, i) => (
          <Reveal key={m.title} delay={0.1 + i * 0.06} className="h-full">
            <Link
              to="/program"
              data-testid={`hero-milestone-${i}`}
              className={`group flex h-full flex-col rounded-2xl border p-4 sm:p-5 transition-[background-color,border-color,transform] duration-500 hover:-translate-y-1 ${
                i === 0 ? "bg-night text-sand border-night" : "bg-white border-ink/10 hover:border-flame/40"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight transition-colors duration-500 ${i === 0 ? "text-flame" : "text-ink/20 group-hover:text-flame/50"}`}>
                  {m.age}
                </span>
                <span className={`h-6 w-6 rounded-full inline-flex items-center justify-center shrink-0 ${i === 0 ? "bg-flame text-white" : "bg-leaf-soft text-leaf"}`}>
                  <Plus className="h-3 w-3" />
                </span>
              </div>
              <p className={`mt-3 font-mono text-[9px] tracking-[0.2em] ${i === 0 ? "text-sand/60" : "text-leaf"}`}>{m.year.toUpperCase()}</p>
              <h3 className="mt-1.5 font-display font-bold text-sm sm:text-base leading-snug">{m.title}</h3>
              <p className={`mt-2 text-[11px] leading-snug ${i === 0 ? "text-sand/65" : "text-ink-muted"}`}>{m.teaser}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {HERO_PHOTOS.map((p, i) => (
          <Reveal key={p.src} delay={0.15 + i * 0.06}>
            <div data-testid={`hero-photo-${i}`} className="group overflow-hidden rounded-2xl aspect-[5/4] bg-sand-deep">
              <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-ink/10 pt-8">
          {STATS.map((s, i) => (
            <div key={i} data-testid={`hero-stat-${i}`}>
              <p className="font-mono font-bold text-2xl sm:text-3xl text-ink">{s.value}</p>
              <p className="mt-1.5 text-xs leading-snug text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

const Manifesto = () => (
  <section data-testid="manifesto-section" className="py-24 lg:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <Reveal><Eyebrow>The AimGame Manifesto</Eyebrow></Reveal>
      <div className="mt-12 space-y-0">
        {MANIFESTO.map((m, i) => (
          <Reveal key={m.index} delay={i * 0.08}>
            <div className="grid lg:grid-cols-12 gap-6 py-10 border-t border-ink/10 last:border-b">
              <span className="lg:col-span-2 font-display font-extrabold text-6xl lg:text-7xl text-flame/90 leading-none">
                {m.index}
              </span>
              <h3 className="lg:col-span-3 font-display font-bold text-2xl lg:text-3xl tracking-tight self-start">
                {m.title}
              </h3>
              <p className="lg:col-span-7 text-ink-muted leading-relaxed text-base sm:text-lg">{m.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedScholar = () => (
  <section data-testid="featured-scholar-section" className="py-24 lg:py-32 bg-night text-sand relative grain overflow-hidden">
    <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />
    <div className="absolute top-1/4 left-[15%] h-96 w-96 rounded-full bg-flame/15 blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/4 right-[12%] h-96 w-96 rounded-full bg-leaf/20 blur-3xl pointer-events-none" />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
      <div className="text-center mb-16">
        <Reveal><Eyebrow light>Graduate Spotlight</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Proof, not promises.
          </h2>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 gap-10 sm:gap-8 lg:gap-14 items-start">
        <Reveal delay={0.15}>
          <figure data-testid="featured-started" className="group">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-flame/20 blur-xl opacity-70 pointer-events-none" />
              <div className="relative overflow-hidden rounded-3xl border border-sand/15 aspect-[4/3] bg-night">
                <img
                  src="/assets/started.jpg"
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

        <Reveal delay={0.3}>
          <figure data-testid="featured-going" className="group">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-leaf/25 blur-xl opacity-70 pointer-events-none" />
              <div className="relative overflow-hidden rounded-3xl border border-sand/15 aspect-[4/3] bg-night">
                <img
                  src="/assets/going.jpg"
                  alt="The same scholar, now a graduate, presenting with confidence"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </div>
            <figcaption className="mt-6 text-center">
              <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">HOW IT'S GOING!</p>
              <p className="mt-2 text-sm text-sand/60">Graduate and professional — owning the room.</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-16 text-center">
          <Link
            to="/transformations"
            data-testid="featured-all-stories-link"
            className="group inline-flex items-center gap-2 font-bold text-flame"
          >
            All transformations
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

const TrustedBy = () => (
  <section data-testid="trusted-by-section" className="py-16 border-b border-ink/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <Reveal>
        <p className="text-center font-mono text-xs tracking-[0.3em] text-ink-muted font-semibold">
          TRUSTED BY CSR PARTNERS ACROSS INDIA
        </p>
      </Reveal>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        {PARTNERS.map((p, i) => (
          <Reveal key={p} delay={i * 0.06}>
            <span className="font-display font-bold text-lg sm:text-xl tracking-wide text-ink/35 hover:text-ink/70 transition-colors duration-500 cursor-default">
              {p}
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FieldFeed = () => (
  <section data-testid="field-feed-section" className="py-24 lg:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <Reveal><Eyebrow>From the Field</Eyebrow></Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
          The daily work, as it happens.
        </h2>
      </Reveal>
      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEED.map((f, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <article data-testid={`feed-post-${i}`} className="group rounded-3xl bg-white border border-ink/10 overflow-hidden transition-transform duration-500 hover:-translate-y-1.5">
              <div className="aspect-square overflow-hidden">
                <img src={f.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-ink-muted">{f.caption}</p>
                <p className="mt-3 font-mono text-[10px] tracking-[0.25em] text-leaf font-bold">{f.time.toUpperCase()}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FinalCta = () => (
  <section data-testid="home-final-cta" className="relative py-28 lg:py-36 bg-flame text-white overflow-hidden grain">
    <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border-[24px] border-white/10 pointer-events-none" />
    <div className="absolute -left-16 -bottom-32 h-80 w-80 rounded-full border-[20px] border-night/10 pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
      <Reveal>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
          Carry one child.<br />End one poverty line.
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-6 max-w-xl mx-auto text-white/85 text-base sm:text-lg leading-relaxed">
          This is a partnership, not a donation drive. Talk to us about sponsoring a scholar's full
          fifteen-year arc.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <Link
          to="/partner"
          data-testid="home-cta-partner"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-night px-8 py-4 font-bold text-white transition-transform duration-300 hover:scale-[1.03]"
        >
          Start the Conversation
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </div>
  </section>
);

const Home = () => (
  <main data-testid="home-page">
    <Hero />
    <Marquee />
    <Manifesto />
    <FeaturedScholar />
    <TrustedBy />
    <FieldFeed />
    <FinalCta />
  </main>
);

export default Home;
