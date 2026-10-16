import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { MILESTONES } from "@/data/content";

const SCHOLAR_SETS = [
  ["/assets/tl-1.jpg", "/assets/tl-2.jpg", "/assets/tl-3.jpg", "/assets/tl-4.jpg", "/assets/tl-5.jpg"],
  ["/assets/scholar-b-1.jpg", "/assets/scholar-b-2.jpg", "/assets/scholar-b-3.jpg", "/assets/scholar-b-4.jpg", "/assets/scholar-b-5.jpg"],
];
const PANEL_COLORS = ["#E8490F", "#1E7A3C", "#F2A500", "#E8490F", "#1E7A3C"];
const SET_ROTATE_MS = 2500;

const chevronClip = (first) =>
  first
    ? "polygon(0 0, calc(100% - 12%) 0, 100% 50%, calc(100% - 12%) 100%, 0 100%)"
    : "polygon(0 0, calc(100% - 12%) 0, 100% 50%, calc(100% - 12%) 100%, 0 100%, 12% 50%)";

const ScholarStrip = () => {
  const [setIdx, setSetIdx] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => setSetIdx((s) => (s + 1) % SCHOLAR_SETS.length), SET_ROTATE_MS);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      data-testid="hero-scholar-strip"
      className="absolute top-[2.5%] h-[44.5%] left-[1.75%] right-[1.75%] flex"
      style={{ gap: "0.8%" }}
    >
      {PANEL_COLORS.map((color, i) => (
        <div
          key={i}
          data-testid={`hero-scholar-panel-${i}`}
          className="relative flex-1"
          style={{ clipPath: chevronClip(i === 0), backgroundColor: color }}
        >
          {SCHOLAR_SETS.map((set, s) => (
            <img
              key={s}
              src={set[i]}
              alt=""
              aria-hidden={s !== setIdx}
              className="absolute object-cover transition-opacity duration-700"
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: chevronClip(i === 0),
                opacity: s === setIdx ? 1 : 0,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const GRID_PHOTOS = Array.from({ length: 12 }, (_, i) => `/assets/hero-grid-${i + 1}.jpg`);
const FLIP_STAGGER = 0.12;
const FLIP_DURATION = 1.0;
const HOLD_MS = 2500;
const EXIT_COL_STAGGER = 0.45;
const EXIT_DURATION = 0.8;
const EXIT_SWEEP = 5 * EXIT_COL_STAGGER + EXIT_DURATION;

const HeroGraphic = () => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setExiting(true);
      return;
    }
    const flipDone = (GRID_PHOTOS.length - 1) * FLIP_STAGGER * 1000 + FLIP_DURATION * 1000;
    const t = setTimeout(() => setExiting(true), flipDone + HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div data-testid="hero-journey-wrap" className="mt-10">
      <div className="overflow-x-auto no-scrollbar">
        <div className="relative min-w-[900px] sm:min-w-0">
          <div className="relative aspect-[3/1] rounded-2xl overflow-hidden">
            <div data-testid="hero-grid-flip" className="absolute inset-0 grid grid-cols-6 grid-rows-2 gap-1.5 sm:gap-2">
              {GRID_PHOTOS.map((src, i) => (
                <motion.div
                  key={src}
                  data-testid={`hero-grid-photo-${i}`}
                  className="relative overflow-hidden rounded-lg bg-white"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={exiting ? { rotateY: -90, opacity: 0 } : { rotateY: 0, opacity: 1 }}
                  transition={
                    exiting
                      ? { delay: (i % 6) * EXIT_COL_STAGGER, duration: EXIT_DURATION, ease: "easeIn" }
                      : { delay: i * FLIP_STAGGER, duration: FLIP_DURATION, ease: "easeOut" }
                  }
                  style={{ transformPerspective: 600, backfaceVisibility: "hidden" }}
                >
                  <img
                    src={src}
                    alt={`AimGame game competition moment ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="absolute inset-0 z-10"
              initial={false}
              animate={exiting ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: EXIT_SWEEP, delay: exiting ? EXIT_COL_STAGGER : 0, ease: [0.77, 0, 0.18, 1] }}
            >
              <img
                src="/assets/hero-timeline.jpg"
                alt="The AimGame journey: Year 1 Start Program and School Enrollment, Year 3 Conversational English Unlocked, Year 6 Graduates Class 10, Year 8 High School Graduation, Year 13-15 College Graduate"
                data-testid="hero-timeline-graphic"
                className="h-full w-full object-cover"
              />
              <ScholarStrip />
              <div className="absolute inset-0 flex">
                {MILESTONES.map((m, i) => (
                  <Link
                    key={m.title}
                    to={`/program?m=${i}`}
                    data-testid={`hero-journey-zone-${i}`}
                    aria-label={`Explore ${m.title} on the program page`}
                    className="block flex-1"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => (
  <section data-testid="hero-section" className="relative overflow-hidden pt-44 sm:pt-60 pb-24 lg:pb-32 grain">
    <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
    <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-flame/10 blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <h1 data-testid="hero-header" className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase">
        <MaskedLine delay={0.1}>Poverty Eradication</MaskedLine>
        <MaskedLine delay={0.25}>in One Generation.</MaskedLine>
      </h1>

      <Reveal delay={0.35}>
        <p data-testid="hero-subheader" className="mt-5 font-display font-bold tracking-tight text-3xl sm:text-4xl text-flame">
          From Poverty to Prosperity in 15 Years or Less
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <HeroGraphic />
      </Reveal>

      <Reveal delay={0.28}>
        <p data-testid="hero-description" className="mt-8 text-2xl sm:text-3xl leading-relaxed font-semibold text-leaf">
          Created by Responsible Charity Society, AimGame is a 15-year scholarship program for
          underprivileged children in India. Students are selected through structured competitions in a
          variety of games and supported with education, healthcare, and employment assistance through
          college graduation, achieving poverty eradication in one generation.
        </p>
      </Reveal>
    </div>
  </section>
);

const Home = () => (
  <main data-testid="home-page">
    <Hero />
  </main>
);

export default Home;
