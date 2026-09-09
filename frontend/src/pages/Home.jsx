import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, MaskedLine, Eyebrow, EASE } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Timeline from "@/components/Timeline";
import { STATS, MANIFESTO, SCHOLARS, PARTNERS, FEED } from "@/data/content";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative overflow-hidden pt-32 lg:pt-40 pb-20 grain">
      <motion.div style={{ y: gridY }} className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-flame/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-leaf/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Eyebrow>Responsible Charity Society · 80G Certified Since 2012</Eyebrow>
          </motion.div>

          <h1 className="mt-8 font-display font-extrabold tracking-tight leading-[1.02] text-5xl sm:text-6xl lg:text-[5.4rem]">
            <MaskedLine delay={0.15}>One child.</MaskedLine>
            <MaskedLine delay={0.3} className="text-leaf">Fifteen years.</MaskedLine>
            <MaskedLine delay={0.45} className="text-flame">Poverty, ended.</MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-ink-muted"
          >
            AimGame is a life-changing scholarship that carries one child from a play-based entry at age five
            to a college degree and a first professional salary at twenty-two — removing every interruption
            along the way. One generation is all it takes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/program"
              data-testid="hero-cta-program"
              className="group inline-flex items-center gap-3 rounded-full bg-flame px-7 py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
            >
              Explore the 15-Year Program
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/transformations"
              data-testid="hero-cta-outcomes"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-7 py-[14px] font-bold text-ink transition-colors duration-300 hover:border-leaf hover:text-leaf"
            >
              See the Outcomes
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.05 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-ink/10 pt-8"
          >
            {STATS.map((s, i) => (
              <div key={i} data-testid={`hero-stat-${i}`}>
                <p className="font-mono font-bold text-2xl sm:text-3xl text-ink">{s.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-ink-muted">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            style={{ y: logoY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            className="relative"
          >
            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[2.5rem] bg-leaf/15" />
            <div className="relative rounded-[2.5rem] bg-white border border-ink/10 p-10 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.25)]">
              <img src="/assets/logo.png" alt="AimGame — Life-Changing Scholarships" className="w-full object-contain" data-testid="hero-logo" />
            </div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 rounded-2xl bg-night text-sand px-6 py-5 shadow-xl"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-flame font-bold">THE ARC</p>
              <p className="mt-1 font-display font-extrabold text-2xl">Age 5 → Age 22</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

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

const FeaturedScholar = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SCHOLARS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = SCHOLARS[index];

  return (
    <section data-testid="featured-scholar-section" className="py-24 lg:py-32 bg-night text-sand relative grain overflow-hidden">
      <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <Reveal><Eyebrow light>Graduate Spotlight</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                Proof, not promises.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link
              to="/transformations"
              data-testid="featured-all-stories-link"
              className="group inline-flex items-center gap-2 font-bold text-flame"
            >
              All transformations
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                  <img src={s.before} alt={`${s.name} at entry`} className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-night/85 px-3 py-1 font-mono text-[10px] tracking-[0.25em]">AGE 5</span>
                </div>
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mt-10">
                  <img src={s.after} alt={`${s.name} as graduate`} className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-flame px-3 py-1 font-mono text-[10px] tracking-[0.25em]">AGE 22</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <p className="font-mono text-xs tracking-[0.3em] text-flame font-bold">{s.years.toUpperCase()}</p>
                <h3 className="mt-3 font-display font-extrabold text-4xl tracking-tight" data-testid="featured-scholar-name">{s.name}</h3>
                <p className="mt-4 text-sand/70 text-lg leading-relaxed">{s.fact} — today, {s.role}.</p>
                <blockquote className="mt-6 border-l-2 border-flame pl-6 font-display font-bold text-xl leading-snug text-sand/90">
                  “{s.quote}”
                </blockquote>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex gap-2.5">
              {SCHOLARS.map((_, i) => (
                <button
                  key={i}
                  data-testid={`featured-dot-${i}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Show scholar ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${i === index ? "w-10 bg-flame" : "w-2 bg-sand/30 hover:bg-sand/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
    <section className="pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal><Eyebrow>The Signature Arc</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 mb-14 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-3xl">
            Fifteen years. Five milestones. Zero interruptions.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Timeline compact />
        </Reveal>
      </div>
    </section>
    <FeaturedScholar />
    <TrustedBy />
    <FieldFeed />
    <FinalCta />
  </main>
);

export default Home;
