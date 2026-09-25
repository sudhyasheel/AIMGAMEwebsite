import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, GraduationCap, HeartPulse, Briefcase } from "lucide-react";
import { Reveal, MaskedLine, Eyebrow, EASE } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { STATS, MANIFESTO, PARTNERS, FEED, MILESTONES } from "@/data/content";

const PILLARS = [
  {
    id: "education",
    icon: GraduationCap,
    title: "EDUCATION",
    text: "Fully sponsored English-medium schooling with managed logistics, tuition and after-school enrichment — the spine of the fifteen-year arc, from a play-based entry at five to a college degree.",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "HEALTHCARE",
    text: "Health check-ups and medical support extended to the scholar's whole family — because a child's progress is only as stable as the household behind them, and no education should end with an untreated illness.",
  },
  {
    id: "employment",
    icon: Briefcase,
    title: "EMPLOYMENT",
    text: "The arc ends in a career, not a certificate: aptitude mapping, college applications, placement support and early-career guidance carry each scholar to their first professional salary.",
  },
];

const HolisticCore = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-12" data-testid="holistic-core">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">
          THE HOLISTIC CORE OF OUR SERVICES
        </p>
      </Reveal>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PILLARS.map((p, i) => (
          <button
            key={p.id}
            data-testid={`pillar-${p.id}`}
            onClick={() => setOpen(i)}
            className={`flex items-center gap-4 rounded-xl bg-white px-6 py-5 border shadow-[0_10px_30px_-12px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-0.5 ${
              open === i ? "border-flame/50" : "border-ink/5"
            }`}
          >
            <p.icon className={`h-5 w-5 shrink-0 ${open === i ? "text-flame" : "text-leaf"}`} />
            <span className="font-display font-bold tracking-wide text-left">{p.title}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={open}
          data-testid="pillar-detail"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-4 rounded-2xl bg-white border border-ink/10 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.12)] p-8"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-flame font-bold">{PILLARS[open].title}</p>
          <p className="mt-3 text-ink-muted leading-relaxed text-base sm:text-lg max-w-3xl">{PILLARS[open].text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const TIMELINE_PHOTOS = [
  { src: "/assets/tl-1.jpg", alt: "Young scholar playing connect-four at program entry" },
  { src: "/assets/tl-2.jpg", alt: "Scholar in her early program years" },
  { src: "/assets/tl-3.jpg", alt: "Scholar grown confident through the program" },
  { src: "/assets/tl-4.jpg", alt: "Scholar in school uniform, high school years" },
  { src: "/assets/tl-5.jpg", alt: "AimGame college graduate presenting" },
];

const CHEVRON_COLORS = ["#E8490F", "#C2410C", "#9A6A0A", "#1E7A3C", "#0F4623"];

const chevronClip = (first) =>
  first
    ? "polygon(0 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 0 100%)"
    : "polygon(0 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 0 100%, 26px 50%)";

const ChevronTimeline = () => (
  <div data-testid="hero-journey-wrap" className="mt-8 flex overflow-x-auto no-scrollbar pb-1">
    {MILESTONES.map((m, i) => (
      <Link
        key={m.title}
        to={`/program?m=${i}`}
        data-testid={`hero-journey-zone-${i}`}
        aria-label={`Explore ${m.title} on the program page`}
        className={`group flex flex-col shrink-0 w-52 sm:w-auto sm:flex-1 ${i > 0 ? "-ml-5" : ""}`}
      >
        <div
          className="relative h-36 sm:h-44 lg:h-52 bg-white transition-transform duration-300 group-hover:-translate-y-1"
          style={{ clipPath: chevronClip(i === 0) }}
        >
          <div className="absolute inset-[14px]" style={{ clipPath: chevronClip(i === 0) }}>
            <img
              src={TIMELINE_PHOTOS[i].src}
              alt={TIMELINE_PHOTOS[i].alt}
              data-testid={`hero-journey-photo-${i}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-col items-center text-center px-1">
          <span
            className="rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.15em] font-bold text-white"
            style={{ backgroundColor: CHEVRON_COLORS[i] }}
          >
            {m.age}
          </span>
          <span className="mt-2 text-[11px] font-bold leading-tight text-ink">{m.title}</span>
        </div>
      </Link>
    ))}
  </div>
);

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
      <Reveal>
        <p data-testid="hero-kicker" className="font-display font-bold text-leaf tracking-[0.08em] uppercase text-lg sm:text-xl lg:text-2xl">
          Poverty Eradication in One Generation.
        </p>
      </Reveal>

      <h1 data-testid="hero-headline" className="mt-3 font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-flame">
        <MaskedLine delay={0.1}>From Poverty to Prosperity</MaskedLine>
        <MaskedLine delay={0.25}>in 15 Years or Less</MaskedLine>
      </h1>

      <Reveal delay={0.2}>
        <ChevronTimeline />
        <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-ink-muted">
          TAP A YEAR TO OPEN IT ON THE PROGRAM PAGE
        </p>
      </Reveal>

      <Reveal delay={0.28}>
        <p data-testid="hero-description" className="mt-8 text-base sm:text-lg leading-relaxed text-ink-muted">
          AimGame is a game-based competition program created and managed by Responsible Charity Society that
          identifies exceptional children in India's most under-resourced communities and sets them on a
          15-year path to college graduation. What began as a search for a better way to reach children who
          had every reason to distrust institutions became a precision system: weekly structured game sessions
          that build critical thinking, ethics, and social development serve as the entry point and selection
          engine for a full life-changing scholarship. The top three performers each year are chosen for RC
          Foundation's holistic program — where Education, Healthcare, and Employment work together as a
          single architecture — because we learned early that education alone cannot carry a child out of
          poverty. It takes a complete system, long-term commitment, and the kind of human connection that
          becomes family. AimGame is where that journey begins.
        </p>
      </Reveal>

      <HolisticCore />

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
