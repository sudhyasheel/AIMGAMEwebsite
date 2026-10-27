import { MapPin, Medal } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PANEL_COLORS, chevronClip } from "@/components/JourneyGraphic";

const GRADUATES = [
  {
    name: "Vishnu Dore",
    degree: "Bachelor of Commerce",
    city: "Pune",
    photos: ["/assets/scholar-b-1.jpg", "/assets/scholar-b-2.jpg", "/assets/scholar-b-3.jpg", "/assets/scholar-b-4.jpg", "/assets/scholar-b-5.jpg"],
  },
  {
    name: "Neha Prajapati",
    degree: "Bachelor of Commerce (B.Com.)",
    city: "Pune",
    photos: ["/assets/scholar-e-1.jpg", "/assets/scholar-e-2.jpg", "/assets/scholar-e-3.jpg", "/assets/scholar-e-4.jpg", "/assets/scholar-e-5.jpg"],
  },
  {
    name: "Sk. Karim",
    degree: "B.Sc. Hotel Management",
    city: "Kolkata",
    photos: ["/assets/scholar-c-1.jpg", "/assets/scholar-c-2.jpg", "/assets/scholar-c-3.jpg", "/assets/scholar-c-4.jpg", "/assets/scholar-c-5.jpg"],
  },
  {
    name: "Firdus Ali",
    degree: "Bachelor of Business Administration",
    city: "Kolkata",
    photos: ["/assets/scholar-d-1.jpg", "/assets/scholar-d-2.jpg", "/assets/scholar-d-3.jpg", "/assets/scholar-d-4.jpg", "/assets/scholar-d-5.jpg"],
  },
];

const CLUB_TIERS = [
  {
    tier: "DIAMOND",
    sub: "COLLEGE GRADUATES",
    color: "text-cyan-500",
    students: [
      { name: "Vishnu Dore", city: "Pune", cls: "College Graduate" },
      { name: "Neha Prajapati", city: "Pune", cls: "College Graduate" },
      { name: "Firdus Ali", city: "Kolkata", cls: "College Graduate" },
      { name: "Sheikh Karim", city: "Kolkata", cls: "College Graduate" },
    ],
  },
  {
    tier: "PLATINUM",
    sub: "ATTENDING COLLEGE",
    color: "text-slate-400",
    students: [
      { name: "Siddhu Bhatgeri", city: "Pune", cls: "College" },
      { name: "Karan Rajbhar", city: "Pune", cls: "College" },
      { name: "Anjali Prajapati", city: "Pune", cls: "College" },
      { name: "Aijaj Shaikh", city: "Pune", cls: "College" },
      { name: "Nagma Khatoon", city: "Kolkata", cls: "College" },
      { name: "Md Zeeshan", city: "Kolkata", cls: "College" },
      { name: "Amrin Khatoon", city: "Kolkata", cls: "College" },
      { name: "Md Shahnawaz", city: "Kolkata", cls: "College" },
      { name: "Ayesha Parveen", city: "Pune", cls: "College" },
      { name: "Md Obaidullah Ansari", city: "Kolkata", cls: "College" },
    ],
  },
  {
    tier: "GOLD",
    sub: "CLASSES X - XII",
    color: "text-amber-500",
    students: [
      { name: "Shreya Chaurasiya", city: "Mumbai", cls: "Class XII" },
      { name: "Jiya Mishra", city: "Mumbai", cls: "Class XII" },
      { name: "Daraksha Parveen", city: "Kolkata", cls: "Class XII" },
      { name: "Goushia Takrim", city: "Kolkata", cls: "Class XII" },
      { name: "Sameer Ali", city: "Kolkata", cls: "Class XII" },
      { name: "Renuka Subhedar", city: "Pune", cls: "Class XI" },
      { name: "Md Jasimuddin", city: "Kolkata", cls: "Class XI" },
      { name: "Aliya Adiba", city: "Kolkata", cls: "Class XI" },
      { name: "Kainath Parveen", city: "Kolkata", cls: "Class XI" },
      { name: "SK Miraz", city: "Kolkata", cls: "Class XI" },
    ],
  },
  {
    tier: "SILVER",
    sub: "CLASSES IX - X",
    color: "text-gray-400",
    students: [
      { name: "Muskan Sah", city: "Pune", cls: "Class X" },
      { name: "Sarifun Nisha", city: "Kolkata", cls: "Class X" },
      { name: "Muskan Sheikh", city: "Pune", cls: "Class IX" },
      { name: "Divya Prajapati", city: "Pune", cls: "Class IX" },
      { name: "Arshi Khatoon", city: "Kolkata", cls: "Class IX" },
      { name: "Md. Saif", city: "Kolkata", cls: "Class IX" },
    ],
  },
  {
    tier: "BRONZE",
    sub: "CLASSES VI - VIII",
    color: "text-orange-600",
    students: [
      { name: "Rakshita Bhatgeri", city: "Pune", cls: "Class VIII" },
      { name: "Shahnawaz Shaikh", city: "Pune", cls: "Class VII" },
      { name: "Mantasha Khatoon", city: "Kolkata", cls: "Class VI" },
      { name: "Ayyan Alam", city: "Kolkata", cls: "Class VI" },
      { name: "Hayatun Khatoon", city: "Kolkata", cls: "Class VI" },
    ],
  },
];

const GraduateRows = () => (
  <section data-testid="results-graduates" className="pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">OUR GRADUATES · NAME & DEGREE</p>
      </Reveal>
      <div className="mt-8 space-y-14">
        {GRADUATES.map((g, gi) => (
          <Reveal key={g.name} delay={0.05}>
            <div data-testid={`graduate-row-${g.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display font-extrabold tracking-tight text-2xl text-ink">{g.name}</h3>
                <span className="font-mono text-[11px] tracking-[0.2em] font-bold text-flame">
                  {g.city.toUpperCase()} · COLLEGE GRADUATE
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-ink-muted">{g.degree}</p>
              <div className="mt-4 overflow-x-auto no-scrollbar">
                <div className="flex min-w-[760px] sm:min-w-0" style={{ gap: "2%" }}>
                  {g.photos.map((src, i) => (
                    <div
                      key={i}
                      data-testid={`graduate-${gi}-photo-${i}`}
                      className="relative flex-1 aspect-[1.263/1]"
                      style={{ clipPath: chevronClip(i === 0), backgroundColor: PANEL_COLORS[i] }}
                    >
                      <img
                        src={src}
                        alt={`${g.name} — scholar journey photo ${i + 1}`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ clipPath: chevronClip(i === 0) }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const clubPhoto = (name) =>
  `/assets/students/${name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-+|-+$/g, "")}.jpg`;

const StudentClubs = () => (
  <section data-testid="results-student-clubs" className="bg-white text-ink border-t border-ink/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">STUDENT CLUBS</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl uppercase text-ink">
          The scholars on the path right now
        </h2>
      </Reveal>
      <div className="mt-10">
        {CLUB_TIERS.map((t, ti) => (
          <Reveal key={t.tier} delay={0.04}>
            <div
              data-testid={`club-tier-${t.tier.toLowerCase()}`}
              className="flex flex-col sm:flex-row gap-6 sm:gap-10 border-t border-ink/10 py-10 first:border-t-0 first:pt-0"
            >
              <div className="sm:w-48 shrink-0 flex sm:flex-col items-center sm:items-start gap-4">
                <Medal className={`h-14 w-14 ${t.color}`} />
                <div className="sm:text-left">
                  <h3 className="font-display font-extrabold tracking-wide text-2xl text-ink">{t.tier}</h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-ink-muted">{t.sub}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-8 flex-1">
                {t.students.map((s, si) => (
                  <div
                    key={s.name}
                    data-testid={`club-student-${ti}-${si}`}
                    className="flex flex-col items-center text-center w-24"
                  >
                    <div data-testid={`club-student-photo-${ti}-${si}`} className="h-20 w-20 rounded-full border-2 border-gold overflow-hidden bg-sand shadow-none">
                      <img
                        src={clubPhoto(s.name)}
                        alt={`${s.name}, ${s.cls}, ${s.city}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-2 text-xs font-bold text-ink leading-tight">{s.name}</p>
                    <p className="mt-1 text-[10px] font-semibold text-flame inline-flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" />
                      {s.city}
                    </p>
                    <span className="mt-1.5 rounded-full border border-ink/20 px-2 py-0.5 font-mono text-[9px] tracking-wider text-ink-muted">
                      {s.cls}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

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
          <p data-testid="results-description" className="mt-8 text-leaf font-semibold text-xl sm:text-2xl leading-relaxed">
            Each of our graduates began as a child playing a game. Today they hold a college degree. The
            scholars below them are on the same path, one milestone at a time.
          </p>
        </Reveal>
      </div>
    </section>

    <GraduateRows />
    <StudentClubs />
  </main>
);

export default Transformations;
