import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const FB_ALBUMS = "https://www.facebook.com/responsiblecharity/photos_albums";

const IMG = {
  tuition: "https://images.unsplash.com/photo-1623303366639-0e330d7c3d9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMHN0dWR5JTIwc3BvcnRzJTIwZmllbGR0cmlwfGVufDB8fHx8MTc5MTMwOTc1OXww&ixlib=rb-4.1.0&q=85",
  arts: "https://images.unsplash.com/photo-1592060036126-1b6d5139dea4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBjaGlsZHJlbiUyMGFydCUyMGNsYXNzfGVufDB8fHx8MTc5MTMxMDMyNHww&ixlib=rb-4.1.0&q=85",
  sports: "https://images.unsplash.com/photo-1569173675610-42c361a86e37?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjBjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMHN0dWR5JTIwc3BvcnRzJTIwZmllbGR0cmlwfGVufDB8fHx8MTc5MTMwOTc1OXww&ixlib=rb-4.1.0&q=85",
  fieldtrip: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMHN0dWR5JTIwc3BvcnRzJTIwZmllbGR0cmlwfGVufDB8fHx8MTc5MTMwOTc1OXww&ixlib=rb-4.1.0&q=85",
  healthFamily: "https://images.unsplash.com/photo-1680778467822-6097c2bd8232?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwyfHxJbmRpYW4lMjBjb21tdW5pdHklMjBoZWFsdGglMjBjaGVja3VwJTIwd29ya3Nob3AlMjBkaXN0cmlidXRpb24lMjBzdXBwbGllc3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  healthCheckup: "https://images.unsplash.com/photo-1680759291617-2923935d803a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBjb21tdW5pdHklMjBoZWFsdGglMjBjaGVja3VwJTIwd29ya3Nob3AlMjBkaXN0cmlidXRpb24lMjBzdXBwbGllc3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  healthPlan: "https://images.unsplash.com/photo-1680759291357-9e1b771323d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjBjb21tdW5pdHklMjBoZWFsdGglMjBjaGVja3VwJTIwd29ya3Nob3AlMjBkaXN0cmlidXRpb24lMjBzdXBwbGllc3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  healthSupplies: "https://images.unsplash.com/photo-1778864874969-16e2432b2709?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjb21tdW5pdHklMjBoZWFsdGglMjBjaGVja3VwJTIwd29ya3Nob3AlMjBkaXN0cmlidXRpb24lMjBzdXBwbGllc3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  healthHygiene: "https://images.unsplash.com/photo-1572847748080-bac263fae977?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBzY2hvb2wlMjBjaGlsZHJlbiUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tJTIwbm90ZWJvb2t8ZW58MHx8fHwxNzg4OTM1NzIzfDA&ixlib=rb-4.1.0&q=85",
  healthWorkshop: "https://images.unsplash.com/photo-1719159381916-062fa9f435a6?crop=entropy&cs=srgb&fm=jpg&q=85",
  careerCounseling: "https://images.unsplash.com/photo-1714976694781-216bfc30214e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZSUyMGRlc2slMjBjYXJlZXIlMjB3b3Jrc2hvcCUyMGludGVydmlld3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  careerCv: "https://images.unsplash.com/photo-1686771416317-b964cc4e0002?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3NzF8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZSUyMGRlc2slMjBjYXJlZXIlMjB3b3Jrc2hvcCUyMGludGVydmlld3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  careerInterview: "https://images.unsplash.com/photo-1686771416537-bf4a4f263d88?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3NzF8MHwxfHNlYXJjaHwyfHxJbmRpYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZSUyMGRlc2slMjBjYXJlZXIlMjB3b3Jrc2hvcCUyMGludGVydmlld3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  careerInternship: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3NzF8MHwxfHNlYXJjaHxfHxJbmRpYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZSUyMGRlc2slMjBjYXJlZXIlMjB3b3Jrc2hvcCUyMGludGVydmlld3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  careerWorkshop: "https://images.unsplash.com/photo-1775113586139-b583cc93517f?crop=entropy&cs=srgb&fm=jpg&q=85",
  parentsWorkshop: "https://images.unsplash.com/photo-1680759291088-d3e935226178?crop=entropy&cs=srgb&fm=jpg&q=85",
};

const PILLARS = [
  {
    id: "education",
    index: "01",
    title: "Education",
    intro: "It starts with a game and carries a child all the way to graduation.",
    blocks: [
      {
        title: "THE ENTRANCE GAME",
        text: "Every scholar's story begins with play. Structured game competitions are how children enter AimGame.",
        img: "/assets/tl-1.jpg",
        alt: "Children gathered around a game board during an AimGame competition round",
      },
      {
        title: "ENGLISH-MEDIUM PRIVATE SCHOOLS",
        text: "Fully sponsored enrollment in schools these families could never access, with logistics managed so nothing gets in the way.",
        img: "/assets/tl-4.jpg",
        alt: "An AimGame scholar in her school uniform",
      },
      {
        title: "ONE-ON-ONE TUITION",
        text: "After school, every scholar gets personal attention from our tutors at our community centers.",
        img: IMG.tuition,
        alt: "A tutor and student working together over books",
      },
      {
        title: "MUSIC, ART & DANCE",
        text: "Classes and workshops that build creativity and confidence beyond the textbook.",
        img: IMG.arts,
        alt: "Children in a creative class beyond their textbooks",
      },
      {
        title: "PHYSICAL EDUCATION",
        text: "Sports and fitness that build healthy bodies and teamwork.",
        img: IMG.sports,
        alt: "Children in a group sports session",
      },
      {
        title: "FIELD TRIPS & MORE",
        text: "Outings and movie days that show children a world bigger than their neighborhood.",
        img: IMG.fieldtrip,
        alt: "A group of schoolchildren on an outing",
      },
    ],
    closing: "…and so much more.",
    albumLabel: "See the albums over the years",
  },
  {
    id: "healthcare",
    index: "02",
    title: "Healthcare",
    intro: "A child can't stay in school if their family can't stay healthy.",
    blocks: [
      {
        title: "CARE FOR THE WHOLE FAMILY",
        text: "Health support doesn't stop at the scholar. Parents are covered too, because a healthy household keeps a child in school.",
        img: IMG.healthFamily,
        alt: "A parent and child at a community health camp",
      },
      {
        title: "DIAGNOSIS & CHECK-UPS",
        text: "Regular check-ups and diagnosis for scholars and their parents, so problems are caught early.",
        img: IMG.healthCheckup,
        alt: "A health check-up day at a community center",
      },
      {
        title: "PREVENTIVE CARE PLANS",
        text: "Plans built around each family's needs, aimed at preventing illness before it becomes an emergency.",
        img: IMG.healthPlan,
        alt: "A staff member walking a parent through a care plan",
      },
      {
        title: "MEDICINES & MEDICAL PROCEDURES",
        text: "Prescriptions, treatments and small surgeries paid for, so no family has to choose between medical care and everything else.",
        img: IMG.healthSupplies,
        alt: "Medicine and care supplies stocked at a community center",
      },
      {
        title: "HYGIENE SUPPLIES & SANITARY NAPKINS",
        text: "Hygiene essentials are distributed and stocked at our centers all year, so girls never miss school.",
        img: IMG.healthHygiene,
        alt: "Schoolgirls together at a supply distribution day",
      },
      {
        title: "HEALTH WORKSHOPS",
        text: "Workshops for students and parents on the practical habits that keep families well.",
        img: IMG.healthWorkshop,
        alt: "A health workshop in session with a group of parents",
      },
    ],
    closing: "…and more.",
    albumLabel: "See the full Healthcare album",
  },
  {
    id: "employment",
    index: "03",
    title: "Employment",
    intro: "The finish line isn't graduation. It's the first day on the job.",
    blocks: [
      {
        title: "CAREER COUNSELING",
        text: "One-on-one guidance that helps each scholar choose a path that fits their strengths, well before college ends.",
        img: IMG.careerCounseling,
        alt: "A counselor in conversation with a student",
      },
      {
        title: "CV & PRESENTATION",
        text: "Hands-on help building a CV that shows what a scholar has achieved, and presenting themselves with confidence.",
        img: IMG.careerCv,
        alt: "A scholar working on documents with a mentor",
      },
      {
        title: "INTERVIEW PREPARATION",
        text: "Practice rounds and feedback, so the first real interview isn't the first interview.",
        img: IMG.careerInterview,
        alt: "A practice interview session across a table",
      },
      {
        title: "INTERNSHIPS THROUGH OUR NETWORK",
        text: "Introductions to friends and contacts in our network who open the door to real, on-the-job experience.",
        img: IMG.careerInternship,
        alt: "A young professional at an internship placement",
        partner: true,
      },
      {
        title: "REAL JOB CONNECTIONS",
        text: "The same network carries scholars from internship to employment, because a first job often comes through a first introduction.",
        img: "/assets/tl-5.jpg",
        alt: "An AimGame graduate presenting at her workplace",
      },
      {
        title: "INDUSTRY LEADER WORKSHOPS",
        text: "Workshops with professionals who share what their fields actually demand and how to get started.",
        img: IMG.careerWorkshop,
        alt: "A guest speaker in front of a group of scholars",
        partner: true,
      },
    ],
    closing: "…and more.",
    albumLabel: "See the full Employment album",
  },
];

const NAV_ITEMS = [
  { id: "education", label: "EDUCATION" },
  { id: "healthcare", label: "HEALTHCARE" },
  { id: "employment", label: "EMPLOYMENT" },
];

const PillarNav = ({ active, progress, onJump }) => (
  <nav
    aria-label="Pillar navigation"
    data-testid="pillar-nav"
    className="sticky top-20 z-40 bg-white/95 backdrop-blur-md shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)]"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <div className="flex items-center justify-center gap-6 sm:gap-16">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => onJump(e, item.id)}
            aria-current={active === item.id ? "true" : undefined}
            data-testid={`pillar-nav-${item.id}`}
            className={`relative h-14 inline-flex items-center font-mono text-[11px] sm:text-xs tracking-[0.2em] font-bold transition-colors duration-300 ${
              active === item.id ? "text-gold" : "text-ink/50 hover:text-ink"
            }`}
          >
            {item.label}
            <span
              className={`absolute bottom-3 left-0 right-0 h-0.5 bg-gold transition-opacity duration-300 ${
                active === item.id ? "opacity-100" : "opacity-0"
              }`}
            />
          </a>
        ))}
      </div>
    </div>
    <div
      data-testid="pillar-progress"
      className="absolute bottom-0 left-0 h-0.5 bg-gold/70"
      style={{ width: `${progress}%` }}
    />
  </nav>
);

const PillarSection = ({ pillar }) => (
  <section
    id={pillar.id}
    data-testid={`pillar-section-${pillar.id}`}
    className="scroll-mt-40 py-16 sm:py-20 border-t border-ink/10 first:border-t-0"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm font-bold text-flame">{pillar.index}</span>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-leaf uppercase">
            {pillar.title}
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <p data-testid={`pillar-intro-${pillar.id}`} className="mt-4 text-leaf font-semibold text-lg sm:text-xl max-w-2xl leading-relaxed">
          {pillar.intro}
        </p>
      </Reveal>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillar.blocks.map((b, i) => (
          <Reveal key={b.title} delay={0.04 + i * 0.05} className="h-full">
            <article
              data-testid={`pillar-card-${pillar.id}-${i}`}
              className="group h-full rounded-3xl bg-white border border-ink/10 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.3)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={b.img}
                  alt={b.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6">
                <p className="font-mono text-[10px] tracking-[0.25em] text-ink-muted font-bold">
                  {pillar.index}.{i + 1}
                </p>
                <h3 className="mt-2 font-display font-extrabold tracking-tight text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{b.text}</p>
                {b.partner && (
                  <Link
                    to="/csr-partners"
                    data-testid={`partner-link-${pillar.id}-${i}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-flame transition-colors hover:text-flame-dark"
                  >
                    Partner with us <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-ink-muted">
          {pillar.closing}{" "}
          <a
            href={FB_ALBUMS}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`album-link-${pillar.id}`}
            className="inline-flex items-center gap-1.5 font-bold text-flame transition-colors hover:text-flame-dark"
          >
            {pillar.albumLabel} <ArrowUpRight className="h-4 w-4" />
          </a>
        </p>
      </Reveal>
    </div>
  </section>
);

const Program = () => {
  const location = useLocation();
  const [active, setActive] = useState("education");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      let current = NAV_ITEMS[0].id;
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = id;
      });
      setActive(current);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -150, immediate: reduced });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (!location.hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(location.hash.slice(1));
      if (!el) return;
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -150, immediate: true });
      else el.scrollIntoView();
    }, 400);
    return () => clearTimeout(t);
  }, [location.hash]);

  return (
    <main data-testid="program-page">
      <section className="pt-44 sm:pt-60 pb-16 relative overflow-hidden grain">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <Reveal>
            <h1
              data-testid="work-header"
              className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
            >
              Everything It Takes to End Poverty in One Generation
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              data-testid="work-subheader"
              className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight"
            >
              Three pillars, fifteen years, and every step it takes to move a child out of poverty for good.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p data-testid="work-description" className="mt-8 max-w-3xl text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
              Education alone doesn't end poverty. Our scholars also need healthy families and a real path
              to a career. So the work rests on three pillars: education, healthcare, and employment.
              Explore each one below.
            </p>
          </Reveal>
        </div>
      </section>

      <div>
        <PillarNav active={active} progress={progress} onJump={jump} />
        {PILLARS.map((p) => (
          <PillarSection key={p.id} pillar={p} />
        ))}
      </div>

      <section data-testid="parents-band" className="bg-leaf-soft border-y border-leaf/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-leaf uppercase">
                Parents as Partners
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 font-display font-bold text-2xl sm:text-3xl text-flame tracking-tight">
                No child makes this journey alone.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 text-leaf-dark/80 text-lg leading-relaxed max-w-xl">
                Every scholar's progress is shared with a family. Parents join workshops at our centers,
                receive health support of their own, and stay involved through every milestone.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-3xl overflow-hidden border border-leaf/15 shadow-[0_30px_60px_-30px_rgba(15,70,35,0.4)] aspect-[4/3]">
              <img
                src={IMG.parentsWorkshop}
                alt="Parents gathered for a group workshop at a community center"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section data-testid="work-cta-band" className="bg-night text-sand relative grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-24 text-center">
          <Reveal>
            <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase">
              This is the work. <span className="text-flame">Now meet the results.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sand/70 text-lg max-w-2xl mx-auto">
              Fifteen years of games, school, care and careers, and the graduates it has built.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/transformations"
                data-testid="cta-graduates-btn"
                className="group inline-flex items-center gap-2 rounded-full bg-flame px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
              >
                Meet Our Graduates
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                data-testid="cta-talk-btn"
                className="inline-flex items-center gap-2 rounded-full border-2 border-sand/30 px-8 py-4 font-bold text-sand transition-colors duration-300 hover:border-flame hover:text-flame"
              >
                Let's Talk
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Program;
