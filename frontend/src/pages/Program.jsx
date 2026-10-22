import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Facebook } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import AlbumButtons from "@/components/AlbumButtons";

const IMG = {
  tuition: "https://images.unsplash.com/photo-1623303366639-0e330d7c3d9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMHN0dWR5JTIwc3BvcnRzJTIwZmllbGR0cmlwfGVufDB8fHx8MTc5MTMwOTc1OXww&ixlib=rb-4.1.0&q=85",
  arts: "https://images.unsplash.com/photo-1592060036126-1b6d5139dea4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBjaGlsZHJlbiUyMGFydCUyMGNsYXNzfGVufDB8fHx8MTc5MTMxMDMyNHww&ixlib=rb-4.1.0&q=85",
  sports: "https://images.unsplash.com/photo-1569173675610-42c361a86e37?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjBjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMHN0dWR5JTIwc3BvcnRzJTIwZmllbGR0cmlwfGVufDB8fHx8MTc5MTMwOTc1OXww&ixlib=rb-4.1.0&q=85",
  fieldtrip: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMHN0dWR5JTIwc3BvcnRzJTIwZmllbGR0cmlwfGVufDB8fHx8MTc5MTMwOTc1OXww&ixlib=rb-4.1.0&q=85",
  healthFamily: "https://images.unsplash.com/photo-1680778467822-6097c2bd8232?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwyfHxJbmRpYW4lMjBjb21tdW5pdHklMjBoZWFsdGglMjBjaGVja3VwJTIwd29ya3Nob3AlMjBkaXN0cmlidXRpb24lMjBzdXBwbGllc3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  healthCheckup: "https://images.unsplash.com/photo-1680759291617-2923935d803a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBjb21tdW5pdHklMjBoZWFsdGglMjBjaGVja3VwJTIwd29ya3Nob3AlMjBkaXN0cmlidXRpb24lMjBzdXBwbGllc3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  healthHygiene: "https://images.unsplash.com/photo-1572847748080-bac263fae977?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjBzY2hvb2wlMjBjaGlsZHJlbiUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tJTIwbm90ZWJvb2t8ZW58MHx8fHwxNzg4OTM1NzIzfDA&ixlib=rb-4.1.0&q=85",
  healthWorkshop: "https://images.unsplash.com/photo-1719159381916-062fa9f435a6?crop=entropy&cs=srgb&fm=jpg&q=85",
  careerCv: "https://images.unsplash.com/photo-1686771416317-b964cc4e0002?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3NzF8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZSUyMGRlc2slMjBjYXJlZXIlMjB3b3Jrc2hvcCUyMGludGVydmlld3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  careerInternship: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3NzF8MHwxfHNlYXJjaHxfHxJbmRpYW4lMjB5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG9mZmljZSUyMGRlc2slMjBjYXJlZXIlMjB3b3Jrc2hvcCUyMGludGVydmlld3xlbnwwfHx8fDE3OTEzMDk3NTl8MA&ixlib=rb-4.1.0&q=85",
  careerWorkshop: "https://images.unsplash.com/photo-1775113586139-b583cc93517f?crop=entropy&cs=srgb&fm=jpg&q=85",
  parentsWorkshop: "https://images.unsplash.com/photo-1680759291088-d3e935226178?crop=entropy&cs=srgb&fm=jpg&q=85",
};

const PILLARS = [
  {
    id: "education",
    index: "01",
    title: "Education",
    intro: "It starts with games and carries a child all the way to graduation.",
    blocks: [
      {
        title: "GAME COMPETITIONS",
        text: "Every scholar's story begins with play. Structured competitions across a rotation of games are how children begin their education journey with us.",
        img: "/assets/edu-1.jpg",
        alt: "Children gathered around a game board during an AimGame competition round",
        albums: [
          { label: "NATIONAL", url: "https://www.facebook.com/media/set/?set=a.894943257183384&type=3" },
        ],
      },
      {
        title: "QUALITY SCHOOLS",
        text: "Fully sponsored enrollment in private English-medium schools these families could never access, with logistics managed so nothing gets in the way.",
        img: "/assets/edu-2.jpg",
        alt: "AimGame scholars in their school uniforms with the RC team",
        albums: [
          { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.2511811812163179&type=3" },
          { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.1468170039860700&type=3" },
        ],
      },
      {
        title: "TUITIONS",
        text: "After school, every scholar gets personal attention from our tutors at our community centers.",
        img: "/assets/edu-3.jpg",
        alt: "Scholars studying with tutors at a community center",
        albums: [
          { label: "NATIONAL", url: "https://www.facebook.com/media/set/?set=a.1348426635168375&type=3" },
        ],
      },
      {
        title: "MUSIC, ART & DANCE",
        text: "Classes and workshops that build creativity and confidence beyond the textbook.",
        img: "/assets/edu-4.jpg",
        alt: "Children in a violin class at a community center",
        albums: [
          { label: "NATIONAL", url: "https://www.facebook.com/media/set/?set=a.637523422925370&type=3" },
        ],
      },
      {
        title: "PHYSICAL EDUCATION",
        text: "Sports and fitness that build healthy bodies and teamwork.",
        img: "/assets/edu-5.jpg",
        alt: "A yoga and fitness session with scholars at a community center",
        albums: [
          { label: "NATIONAL", url: "https://www.facebook.com/media/set/?set=a.1704141059596929&type=3" },
        ],
      },
      {
        title: "FIELD TRIPS & MORE",
        text: "Outings and movie days that show children a world bigger than their neighborhood.",
        img: "/assets/edu-6.jpg",
        alt: "Scholars and mentors on a field trip in front of the tour bus",
        albums: [
          { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.410205948990453&type=3" },
          { label: "MUMBAI", url: "https://www.facebook.com/media/set/?set=a.2062621347082230&type=3" },
          { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.1149537578390616&type=3" },
        ],
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
        title: "WORKSHOPS & PREVENTION PLANS",
        text: "Workshops and personalized prevention plans that teach families how to stay healthy and stop illness before it becomes an emergency.",
        img: "/assets/health-1.jpg",
        alt: "A health workshop in session for parents at a community center",
        albums: [
          { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.409889655688749&type=3" },
          { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.495728567104857&type=3" },
        ],
      },
      {
        title: "DIAGNOSIS, CHECK-UPS, MEDICINES & PROCEDURES",
        text: "Regular check-ups, treatments, and small surgeries for every scholar and their parents, so no family has to choose between healthcare and everything else.",
        img: "/assets/health-2.jpg",
        alt: "A doctor examining a scholar during a check-up day",
        albums: [
          { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.409889655688749&type=3" },
          { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.495728567104857&type=3" },
        ],
      },
      {
        title: "SANITARY NAPKINS & GENERAL HYGIENE",
        text: "Our quarterly hygiene packages and sanitary pad distribution keep daily essentials from becoming a luxury, protecting health and dignity for our students and the women in their communities.",
        img: "/assets/health-3.jpg",
        alt: "Scholars and team at a hygiene supplies distribution day",
        albums: [
          { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.409889655688749&type=3" },
          { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.495728567104857&type=3" },
        ],
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
        title: "CAREER COUNSELING & INDUSTRY WORKSHOPS",
        text: "Every scholar gets one-on-one guidance to find the path that fits their strengths, starting well before college ends. Industry leaders then share what their fields really demand and how to get started.",
        img: "/assets/emp-1.jpg",
        alt: "A mentor guiding scholars working on laptops during a career workshop",
        partner: true,
        albums: [
          { label: "NATIONAL", url: "https://www.facebook.com/media/set/?set=a.1349759245035114&type=3" },
        ],
      },
      {
        title: "CV PREPARATION & INTERVIEW TRAINING",
        text: "Every scholar builds a CV that shows what they have achieved, then practices presenting it with confidence. Mock interviews cover answers, body language, and voice, and workshops teach the unwritten rules of the workplace.",
        img: "/assets/emp-2.jpg",
        alt: "An AimGame graduate at his workplace, a hotel front desk",
        albums: [
          { label: "NATIONAL", url: "https://www.facebook.com/media/set/?set=a.1349759245035114&type=3" },
        ],
      },
      {
        title: "INTERNSHIPS & JOB CONNECTIONS",
        text: "Introductions through our network and beyond open the door to real, on-the-job internships. The same connections carry scholars from internship to employment, because a first job often comes through a first introduction.",
        img: "/assets/emp-3.jpg",
        alt: "A scholar in a one-on-one career conversation with an industry professional",
        partner: true,
        albums: [
          { label: "NATIONAL", url: "https://www.facebook.com/media/set/?set=a.1349759245035114&type=3" },
        ],
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
  { id: "schools", label: "SCHOOLS & COLLEGES" },
  { id: "parents", label: "PARENTS AS PARTNERS" },
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
              className="group h-full rounded-3xl bg-white border border-ink/10 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.3)] flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden shrink-0">
                <img
                  src={b.img}
                  alt={b.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-extrabold tracking-tight text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{b.text}</p>
                <div className="mt-auto pt-4">
                  {b.partner && (
                    <Link
                      to="/csr-partners"
                      data-testid={`partner-link-${pillar.id}-${i}`}
                      className="mb-3 inline-flex items-center gap-1.5 text-sm font-bold text-flame transition-colors hover:text-flame-dark"
                    >
                      Partner with us <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                  {b.albums && (
                    <div className="flex flex-wrap gap-2">
                      {b.albums.map((a) => (
                        <a
                          key={a.label}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`block-album-${pillar.id}-${i}-${a.label.toLowerCase()}`}
                          onClick={() => {
                            window.dataLayer = window.dataLayer || [];
                            window.dataLayer.push({ event: "album_click", page: "our-work", block: `${pillar.id}-${i}`, city: a.label });
                          }}
                          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-leaf-soft border border-leaf/25 px-4 font-mono text-[10px] tracking-[0.15em] font-bold text-leaf transition-colors duration-300 hover:bg-leaf hover:text-white"
                        >
                          <Facebook className="h-3 w-3" />
                          {a.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-ink-muted">{pillar.closing}</p>
        <AlbumButtons page="our-work" block={pillar.id} align="start" />
      </Reveal>
    </div>
  </section>
);

const PARTNER_LOGOS = [
  { src: "/assets/partner-logo-1.png", name: "The Modern Academy" },
  { src: "/assets/partner-logo-2.jpg", name: "D Y Patil School of Hospitality & Tourism Studies, Navi Mumbai" },
  { src: "/assets/partner-logo-3.png", name: "Indira Institute of Management PGDM" },
  { src: "/assets/partner-logo-4.png", name: "South City International School" },
  { src: "/assets/partner-logo-5.png", name: "IHM Institute of Hotel Management Hyderabad" },
  { src: "/assets/partner-logo-6.png", name: "I.P. Memorial School, Liluah Howrah" },
];

const SchoolsPillar = () => (
  <section
    id="schools"
    data-testid="pillar-section-schools"
    className="scroll-mt-40 py-16 sm:py-20 border-t border-ink/10"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm font-bold text-flame">04</span>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-leaf uppercase">
            Schools and Colleges
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <p data-testid="pillar-intro-schools" className="mt-4 text-leaf font-semibold text-lg sm:text-xl max-w-2xl leading-relaxed">
          Our scholars study at accredited private schools, colleges and universities with years of service
          across India. These institutions are pillars of their communities, and they understand our
          students' backgrounds and challenges. Together, year after year, we help every scholar succeed.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {PARTNER_LOGOS.map((l, i) => (
            <div
              key={l.src}
              data-testid={`education-partner-logo-${i}`}
              className="rounded-2xl border border-ink/10 bg-white px-6 py-6 flex items-center justify-center"
            >
              <img src={l.src} alt={`${l.name} logo`} className="h-20 w-full object-contain" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.2511811812163179&type=3" },
            { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.2511811812163179&type=3" },
          ].map((a) => (
            <a
              key={a.label}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`schools-album-${a.label.toLowerCase()}`}
              onClick={() => {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: "album_click", page: "our-work", block: "schools", city: a.label });
              }}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-leaf-soft border border-leaf/25 px-4 font-mono text-[10px] tracking-[0.15em] font-bold text-leaf transition-colors duration-300 hover:bg-leaf hover:text-white"
            >
              <Facebook className="h-3 w-3" />
              {a.label}
            </a>
          ))}
        </div>
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
              Five pillars, fifteen years, and every step it takes to move a child out of poverty for good.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p data-testid="work-description" className="mt-8 max-w-3xl text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
              Education alone doesn't end poverty. Our scholars also need healthy families, a real path
              to a career, strong institutions, and parents beside them. So the work rests on five pillars:
              education, healthcare, employment, schools &amp; colleges, and parents as partners.
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

      <SchoolsPillar />

      <section id="parents" data-testid="parents-band" className="bg-leaf-soft border-y border-leaf/15 scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm font-bold text-flame">05</span>
                <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-leaf uppercase">
                  Parents as Partners
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 text-leaf-dark/80 text-lg leading-relaxed max-w-xl">
                Parents are with us from day one. They're kept in the loop on every decision, visited at home
                by our team, and welcome at our centers for workshops and updates on their child's grades.
                Healthcare support extends to them too. When a family is part of the program, what starts in
                the classroom carries on at home.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.1808015935876107&type=3" },
                  { label: "MUMBAI", url: "https://www.facebook.com/media/set/?set=a.1808015935876107&type=3" },
                  { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.495665887111125&type=3" },
                ].map((a) => (
                  <a
                    key={a.label}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`parents-album-${a.label.toLowerCase()}`}
                    onClick={() => {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({ event: "album_click", page: "our-work", block: "parents", city: a.label });
                    }}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-night px-6 font-mono text-xs tracking-[0.15em] font-bold text-sand transition-colors duration-300 hover:bg-flame"
                  >
                    <Facebook className="h-3.5 w-3.5" />
                    {a.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-3xl overflow-hidden border border-leaf/15 shadow-[0_30px_60px_-30px_rgba(15,70,35,0.4)] aspect-[4/3]">
              <img
                src="/assets/parents-meeting-2.jpg"
                alt="Parents gathered for a group meeting with the Responsible Charity Society team"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Program;
