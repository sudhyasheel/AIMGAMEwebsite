import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Facebook } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import AlbumButtons from "@/components/AlbumButtons";

const PILLARS = [
  {
    id: "education",
    index: "01",
    title: "Education",
    intro: "It starts with games and carries a child all the way to graduation. Game competitions open the door, scholarships fund quality schools and colleges, and tuitions, music, art, sports and field trips give every scholar the skills and confidence to thrive.",
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
        title: "MILESTONES",
        text: "Five milestones mark every scholar's journey, from Bronze to Diamond. See each achievement celebrated, step by step.",
        img: "/assets/work-milestones.jpg",
        alt: "A graduation milestone celebration poster for an AimGame scholar",
        albums: [
          { label: "NATIONAL", url: "https://www.facebook.com/media/set/?set=a.2477953108882383&type=3" },
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
        title: "FITNESS & SPORTS",
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
    index: "03",
    title: "Health & Wellness",
    intro: "A child can't stay in school if their family can't stay healthy. Yoga, meditation and wellness workshops build healthy habits, preventive care and treatment catch problems early, and hygiene supplies protect health and dignity.",
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
    index: "05",
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
  { id: "schools", label: "SCHOOLS & COLLEGES" },
  { id: "healthcare", label: "HEALTH & WELLNESS" },
  { id: "parents", label: "PARENT PARTNERSHIP" },
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
        <p data-testid={`pillar-intro-${pillar.id}`} className="mt-4 text-leaf font-semibold text-xl sm:text-2xl leading-relaxed">
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

const SCHOOLS_BLOCKS = [
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
    title: "COLLEGES & UNIVERSITIES",
    text: "Fully sponsored admission to accredited colleges and universities across India, in courses that fit each scholar's strengths, with fees and logistics managed so nothing gets in the way.",
    img: "/assets/work-colleges.jpg",
    alt: "AimGame scholars and team at the Symbiosis Institute of Management Studies campus",
    albums: [
      { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.2511811812163179&type=3" },
      { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.2511811812163179&type=3" },
    ],
  },
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
          <span className="font-mono text-sm font-bold text-flame">02</span>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-leaf uppercase">
            Schools &amp; Colleges
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <p data-testid="pillar-intro-schools" className="mt-4 text-leaf font-semibold text-xl sm:text-2xl leading-relaxed">
          Our scholars study at accredited private schools, colleges and universities with years of service
          across India. These institutions are pillars of their communities, and they understand our
          students' backgrounds and challenges. Together, year after year, we help every scholar succeed.
        </p>
      </Reveal>

      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        {SCHOOLS_BLOCKS.map((b, i) => (
          <Reveal key={b.title} delay={0.04 + i * 0.05} className="h-full">
            <article
              data-testid={`pillar-card-schools-${i}`}
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
                  <div className="flex flex-wrap gap-2">
                    {b.albums.map((a) => (
                      <a
                        key={a.label}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`block-album-schools-${i}-${a.label.toLowerCase()}`}
                        onClick={() => {
                          window.dataLayer = window.dataLayer || [];
                          window.dataLayer.push({ event: "album_click", page: "our-work", block: `schools-${i}`, city: a.label });
                        }}
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-leaf-soft border border-leaf/25 px-4 font-mono text-[10px] tracking-[0.15em] font-bold text-leaf transition-colors duration-300 hover:bg-leaf hover:text-white"
                      >
                        <Facebook className="h-3 w-3" />
                        {a.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-2">
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

      <Reveal delay={0.12}>
        <AlbumButtons page="our-work" block="schools" align="start" />
      </Reveal>
    </div>
  </section>
);

const PARENTS_BLOCKS = [
  {
    title: "IN THE LOOP FROM DAY ONE",
    text: "Parents are with us from day one, kept in the loop on every decision about their child's education and care.",
    img: "/assets/parents-meeting-3.jpg",
    alt: "A parents' meeting with the Responsible Charity Society team in Kolkata",
    albums: [
      { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.116071365070581&type=3" },
      { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.495665887111125&type=3" },
      { label: "MUMBAI", url: "https://www.facebook.com/media/set/?set=a.1808015935876107&type=3" },
    ],
  },
  {
    title: "COMMUNITY OUTREACH",
    text: "Our staff, tutors and mentors visit families at home, right in the community, to check in, share each scholar's progress and talk through any challenges together.",
    img: "/assets/work-outreach.jpg",
    alt: "An RC team member on a home visit with a scholar's family",
    albums: [
      { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.116071365070581&type=3" },
      { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.495665887111125&type=3" },
      { label: "MUMBAI", url: "https://www.facebook.com/media/set/?set=a.1808015935876107&type=3" },
    ],
  },
  {
    title: "OPEN DOORS AT OUR CENTERS",
    text: "Our community centers are open to parents too. They come for supplies, updates on how their child is doing in school and workshops, and they talk with our staff, so every visit keeps the family involved.",
    img: "/assets/work-centers.jpg",
    alt: "Parents gathered for a workshop at an RC community center",
    albums: [
      { label: "KOLKATA", url: "https://www.facebook.com/media/set/?set=a.116071365070581&type=3" },
      { label: "PUNE", url: "https://www.facebook.com/media/set/?set=a.495665887111125&type=3" },
      { label: "MUMBAI", url: "https://www.facebook.com/media/set/?set=a.1808015935876107&type=3" },
    ],
  },
];

const ParentsPillar = () => (
  <section
    id="parents"
    data-testid="pillar-section-parents"
    className="scroll-mt-40 py-16 sm:py-20 border-t border-ink/10"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <Reveal>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm font-bold text-flame">04</span>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-leaf uppercase">
            Parent Partnership
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p data-testid="pillar-intro-parents" className="mt-4 text-leaf font-semibold text-xl sm:text-2xl leading-relaxed">
          Parents are with us from day one. They're kept in the loop on every decision, visited at home
          by our team, and welcome at our centers for workshops and updates on their child's grades.
          Healthcare support extends to them too. When a family is part of the program, what starts in
          the classroom carries on at home.
        </p>
      </Reveal>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARENTS_BLOCKS.map((b, i) => (
          <Reveal key={b.title} delay={0.04 + i * 0.05} className="h-full">
            <article
              data-testid={`pillar-card-parents-${i}`}
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
                  <div className="flex flex-wrap gap-2">
                    {b.albums.map((a) => (
                      <a
                        key={a.label}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`block-album-parents-${i}-${a.label.toLowerCase()}`}
                        onClick={() => {
                          window.dataLayer = window.dataLayer || [];
                          window.dataLayer.push({ event: "album_click", page: "our-work", block: `parents-${i}`, city: a.label });
                        }}
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-leaf-soft border border-leaf/25 px-4 font-mono text-[10px] tracking-[0.15em] font-bold text-leaf transition-colors duration-300 hover:bg-leaf hover:text-white"
                      >
                        <Facebook className="h-3 w-3" />
                        {a.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <AlbumButtons page="our-work" block="parents" align="start" />
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
            <p data-testid="work-description" className="mt-8 text-leaf font-semibold text-xl sm:text-2xl leading-relaxed">
              Education alone doesn't end poverty. Our scholars also need healthy families, a real path
              to a career, strong institutions, and parents beside them. So the work rests on five pillars:
              education, schools &amp; colleges, health &amp; wellness, parent partnership, and employment.
              Explore each one below.
            </p>
          </Reveal>
        </div>
      </section>

      <div>
        <PillarNav active={active} progress={progress} onJump={jump} />
        <PillarSection pillar={PILLARS[0]} />
        <SchoolsPillar />
        <PillarSection pillar={PILLARS[1]} />
        <ParentsPillar />
        <PillarSection pillar={PILLARS[2]} />
      </div>
    </main>
  );
};

export default Program;
