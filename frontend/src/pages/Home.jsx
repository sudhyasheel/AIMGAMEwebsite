import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, HeartPulse, Briefcase } from "lucide-react";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { MILESTONES } from "@/data/content";

const TIMELINE_PHOTOS = [
  { src: "/assets/tl-1.jpg", alt: "Young scholar playing connect-four at program entry" },
  { src: "/assets/tl-2.jpg", alt: "Scholar in her early program years" },
  { src: "/assets/tl-3.jpg", alt: "Scholar grown confident through the program" },
  { src: "/assets/tl-4.jpg", alt: "Scholar in school uniform, high school years" },
  { src: "/assets/tl-5.jpg", alt: "AimGame college graduate presenting" },
];

const CHEVRON_COLORS = ["#E8490F", "#C2410C", "#9A6A0A", "#1E7A3C", "#0F4623"];

const CHEVRON_ICONS = [
  "/assets/icon-1.png",
  "/assets/icon-2.png",
  "/assets/icon-3.png",
  "/assets/icon-4.png",
  "/assets/icon-5.png",
];

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

const PillarRow = () => {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-10" data-testid="holistic-core">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {PILLARS.map((p, i) => (
          <button
            key={p.id}
            data-testid={`pillar-${p.id}`}
            onClick={() => setOpen(i)}
            className={`flex items-center gap-5 rounded-2xl bg-white px-8 py-6 border-2 shadow-[0_14px_36px_-16px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-0.5 ${
              open === i ? "border-flame" : "border-ink/5"
            }`}
          >
            <p.icon className={`h-7 w-7 shrink-0 ${open === i ? "text-flame" : "text-leaf"}`} />
            <span className="font-display font-extrabold tracking-wide text-lg text-left">{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const chevronClip = (first) =>
  first
    ? "polygon(0 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 0 100%)"
    : "polygon(0 0, calc(100% - 26px) 0, 100% 50%, calc(100% - 26px) 100%, 0 100%, 26px 50%)";

const ChevronTimeline = () => (
  <div data-testid="hero-journey-wrap" className="mt-10">
    <div className="flex overflow-x-auto no-scrollbar pb-1">
      {MILESTONES.map((m, i) => (
        <Link
          key={m.title}
          to={`/program?m=${i}`}
          data-testid={`hero-journey-zone-${i}`}
          aria-label={`Explore ${m.title} on the program page`}
          className={`group block shrink-0 w-52 sm:w-auto sm:flex-1 ${i > 0 ? "-ml-5" : ""}`}
        >
          <div
            className="relative h-36 sm:h-44 lg:h-52 bg-white transition-transform duration-300 group-hover:-translate-y-1"
            style={{ clipPath: chevronClip(i === 0) }}
          >
            <div className={`absolute ${i === 0 ? "inset-[12px]" : "inset-[6px]"}`} style={{ clipPath: chevronClip(i === 0) }}>
              <img
                src={TIMELINE_PHOTOS[i].src}
                alt={TIMELINE_PHOTOS[i].alt}
                data-testid={`hero-journey-photo-${i}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>

    <div className="relative mt-6">
      <div className="absolute left-0 right-0 top-7 h-[3px] rounded-full bg-gradient-to-r from-flame via-gold to-leaf-dark" />
      <div className="relative flex">
        {MILESTONES.map((m, i) => (
          <Link
            key={m.title}
            to={`/program?m=${i}`}
            data-testid={`hero-journey-icon-${i}`}
            aria-label={`Explore ${m.title} on the program page`}
            className="group flex-1 flex flex-col items-center text-center px-1"
          >
            <span
              className="relative z-10 h-14 w-20 rounded-xl inline-flex items-center justify-center shadow-md px-4 py-3 ring-8 ring-sand transition-transform duration-300 group-hover:-translate-y-1"
              style={{ backgroundColor: CHEVRON_COLORS[i] }}
            >
              <img src={CHEVRON_ICONS[i]} alt="" className="h-full w-full object-contain" data-testid={`chevron-icon-${i}`} />
            </span>
            <span className="mt-2.5 font-mono text-[10px] tracking-[0.15em] font-bold" style={{ color: CHEVRON_COLORS[i] }}>
              {m.age}
            </span>
            <span className="mt-1.5 text-[11px] font-bold leading-tight text-ink">{m.title}</span>
          </Link>
        ))}
      </div>
    </div>

    <PillarRow />
  </div>
);

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
        <p data-testid="hero-subheader" className="mt-5 font-display font-bold tracking-tight text-xl sm:text-2xl text-flame">
          From Poverty to Prosperity in 15 Years or Less
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <ChevronTimeline />
      </Reveal>

      <Reveal delay={0.28}>
        <p data-testid="hero-description" className="mt-14 text-xl sm:text-2xl leading-relaxed font-semibold text-leaf">
          AimGame uses structured game competitions to identify, develop, and select high-potential children
          from slum communities in India for our 15-year scholarship program, providing education, healthcare,
          and employment support through college graduation. Created and managed by Responsible Charity
          Society, AimGame is built to eradicate poverty in one generation.
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
