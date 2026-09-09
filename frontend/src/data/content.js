const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const STATS = [
  { value: "15", label: "Years per scholar, entry to first salary" },
  { value: "5 → 22", label: "Ages a scholar travels with AimGame" },
  { value: "2012", label: "80G certified — tax-deductible giving" },
  { value: "100%", label: "Of education sponsored, end to end" },
];

export const MARQUEE_ITEMS = [
  "80G CERTIFIED SINCE 2012",
  "15-YEAR FULL-CYCLE SCHOLARSHIP",
  "ENTRY AT 5 · GRADUATE AT 22",
  "EVERY RUPEE TRACKED",
  "PARTNERSHIPS, NOT DONATIONS",
  "ONE GENERATION IS ALL IT TAKES",
];

export const MILESTONES = [
  {
    age: "5–6",
    year: "Year 0",
    title: "Entry — Play-Based Selection",
    teaser: "Children are identified through structured play, not exams.",
    detail:
      "AimGame begins with a board game, not a test. Children aged five are observed in structured, play-based sessions that reveal focus, curiosity and grit — the traits that predict a fifteen-year journey. Families sign a partnership agreement, and from that day every barrier to schooling is removed.",
    chips: ["Play-based assessment", "Family partnership signed", "Full sponsorship begins"],
  },
  {
    age: "7–10",
    year: "Years 2–5",
    title: "School Transition",
    teaser: "Admission to English-medium private schooling, fully managed.",
    detail:
      "Each scholar is admitted to an English-medium private school. AimGame manages the entire surface area of schooling — admission, fees, transport, uniforms, books, tuition — so the child's only job is to learn, and the family's only job is to encourage.",
    chips: ["English-medium admission", "Fees, transport, books covered", "Dedicated tuition support"],
  },
  {
    age: "11–15",
    year: "Years 6–10",
    title: "Mid-Secondary",
    teaser: "Enrichment widens the world: art, music, sport, field trips.",
    detail:
      "The middle years decide whether a child merely attends school or belongs to it. Scholars get after-school enrichment — field trips, music and art classes, physical education — while health check-ups and family services extend to parents, keeping the whole household stable.",
    chips: ["Field trips & arts", "Physical education", "Family health services"],
  },
  {
    age: "16–18",
    year: "Years 11–13",
    title: "College Entry",
    teaser: "Exam prep, applications and mentoring toward a degree.",
    detail:
      "AimGame treats college admission as an engineering problem: aptitude mapping, entrance-exam preparation, application management and fee coverage, paired with one-to-one mentoring so each scholar chooses a degree that converts into a profession.",
    chips: ["Entrance exam prep", "Applications & fees managed", "1:1 career mentoring"],
  },
  {
    age: "19–22",
    year: "Years 14–15",
    title: "Graduation & First Job",
    teaser: "Degree complete. Placement support. First professional salary.",
    detail:
      "The arc closes where it was always meant to: a college degree and a first professional job. Placement support, interview preparation and early-career guidance carry the scholar across the last mile — the moment a family's relationship with poverty ends, permanently.",
    chips: ["Degree completion", "Placement support", "First professional salary"],
  },
];

export const LAYERS = [
  {
    title: "Fully Sponsored Education",
    body: "From play-based entry to English-medium private schooling and on to college — every fee, every year, for fifteen years.",
  },
  {
    title: "Managed Logistics & Tuition",
    body: "Transport, uniforms, books, stationery and dedicated tuition support, handled end-to-end so nothing interrupts attendance.",
  },
  {
    title: "After-School Enrichment",
    body: "Field trips, music and art classes, and physical education — the experiences that turn attendance into ambition.",
  },
  {
    title: "Health & Family Services",
    body: "Medical support and family services extended to parents, because a scholar's progress is only as stable as the household behind them.",
  },
  {
    title: "Parent Partnership",
    body: "Parents are co-signatories to the program, not spectators — a complete parent-program partnership, never a one-way benefit.",
  },
];

export const SCHOLARS = [
  {
    name: "Ananya Deshmukh",
    before: img("photo-1503454537195-1dcabb73ffb9"),
    after: img("photo-1573496359142-b8d87734a5a2"),
    years: "14 years in program",
    fact: "First in her family to graduate · B.Com",
    role: "Audit Associate, Pune",
    quote: "AimGame didn't fund my education. It redesigned my family's future.",
  },
  {
    name: "Rohit Pawar",
    before: img("photo-1471286174890-9c112ffca5b4"),
    after: img("photo-1495995424756-6a5a3f9e7543"),
    years: "13 years in program",
    fact: "First engineer in his settlement · B.E. Mechanical",
    role: "Graduate Engineer, automotive OEM",
    quote: "The games at five taught me to think. The scholarship taught me to build.",
  },
  {
    name: "Meena Khatun",
    before: img("photo-1488521787991-ed7bbaae773c"),
    after: img("photo-1580489944761-15a19d654956"),
    years: "12 years in program",
    fact: "First girl in her family to finish school · B.Sc Nursing",
    role: "Staff Nurse, city hospital",
    quote: "My mother cleaned hospital wards. I now run one of them.",
  },
  {
    name: "Sandeep Yadav",
    before: img("photo-1503676260728-1c00da094a0b"),
    after: img("photo-1541339907198-e08756dedf3f"),
    years: "12 years in program",
    fact: "First graduate in his extended family · B.Sc Computer Science",
    role: "Software Trainee, IT services",
    quote: "Fifteen years sounded impossible at five. At twenty-two, it feels inevitable.",
  },
  {
    name: "Priya Nair",
    before: img("photo-1542810634-71277d95dcbb"),
    after: img("photo-1462536943532-57a629f6cc60"),
    years: "15 years in program · first AimGame cohort",
    fact: "B.Ed · Returned to teach in the same school network",
    role: "Primary School Teacher",
    quote: "AimGame carried me for fifteen years. Now I carry the next five-year-olds.",
  },
];

export const PARTNERS = [
  "MERIDIAN CEMENTS",
  "KAVERI TEXTILES",
  "NEXPOINT LOGISTICS",
  "SONA AGRO FOODS",
  "TRIDENT PHARMA",
];

export const FEED = [
  {
    image: img("photo-1572847748080-bac263fae977", 600),
    caption: "Saturday enrichment: the mid-secondary cohort at the science centre, arguing over the physics exhibit.",
    time: "2 days ago",
  },
  {
    image: img("photo-1497486751825-1233686d5d80", 600),
    caption: "Entrance-exam season. Our college-entry batch logs its sixth mock test — scores up 31% since January.",
    time: "5 days ago",
  },
  {
    image: img("photo-1509062522246-3755977927d7", 600),
    caption: "New intake day. Forty five-year-olds, one board game, and the start of fifteen-year journeys.",
    time: "1 week ago",
  },
  {
    image: img("photo-1659985281435-d8d3ea55b55c", 600),
    caption: "Priya's first paycheck framed at our office wall — scholar number one of cohort one, now a teacher.",
    time: "2 weeks ago",
  },
];

export const MANIFESTO = [
  {
    index: "01",
    title: "The Problem",
    body: "Poverty is not a lack of effort. It is a lack of runway. A bright child in a low-income home gets one interrupted year — a fee unpaid, a bus missed, a fever untreated — and the whole trajectory collapses.",
  },
  {
    index: "02",
    title: "The Wager",
    body: "AimGame removes every interruption for fifteen consecutive years: school, tuition, transport, health, mentoring — from a play-based entry at five to a college degree and a first professional salary at twenty-two.",
  },
  {
    index: "03",
    title: "The Proof",
    body: "Scholars who entered at five now hold degrees, salaries and a family tree that will never be poor again. One generation is all it takes — if one generation is fully carried.",
  },
];

export const TRUST_SIGNALS = [
  {
    title: "80G certified since 2012",
    body: "Every donation to Responsible Charity Society is tax-deductible under Section 80G of the Income Tax Act — certified continuously since 2012.",
  },
  {
    title: "A registered Indian NGO",
    body: "Donations are received by Responsible Charity Society, the registered entity. AimGame is its flagship program — receipts always reference RC Society as the receiving entity.",
  },
  {
    title: "Scholar-wise reporting",
    body: "CSR partners receive scholar-level progress reports — attendance, milestones, outcomes — not aggregate brochures.",
  },
  {
    title: "Audited annually",
    body: "Accounts are audited every financial year and statements are shared with partners on request.",
  },
];

export const MIN_DONATION = 1000;
export const CONVERSATION_THRESHOLD = 100000;
