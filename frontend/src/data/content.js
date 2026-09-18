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
    age: "YEAR 1",
    year: "Start · Age 5",
    title: "Start Program / School Enrollment",
    teaser: "Entry through games, not exams. English-medium schooling begins.",
    detail:
      "Children enter AimGame through games and play-based engagement, not formal testing — the board game reveals focus, curiosity and grit. From day one, each scholar moves into English-medium private schooling, fully sponsored, with the family signed on as partners.",
    chips: ["Play-based selection", "English-medium enrollment", "Fully sponsored from day one"],
  },
  {
    age: "YEAR 3",
    year: "Settling In",
    title: "Conversational English Unlocked",
    teaser: "Daily immersion turns a second language into a working one.",
    detail:
      "With fees, transport, books and tuition fully managed, scholars simply learn. By Year 3 the immersion compounds: conversational English is unlocked, classroom confidence rises, and parents — co-signatories to the program — keep the rhythm at home.",
    chips: ["Managed logistics & tuition", "Daily English immersion", "Parents as active partners"],
  },
  {
    age: "YEAR 6",
    year: "First Big Hurdle",
    title: "Graduates Class 10",
    teaser: "Board exams cleared with tuitions and the full activity layer.",
    detail:
      "The mid-secondary years carry the academic load: Class 10 board exams, structured tuitions, and the full activity layer — arts, music, sports and field trips — that keeps ambition alive. Health and family services extend to parents so the household stays stable.",
    chips: ["Class 10 board exams", "Tuitions & mentoring", "Arts, music, sport & field trips"],
  },
  {
    age: "YEAR 8",
    year: "School Complete",
    title: "High School Graduation",
    teaser: "Schooling complete — the shift to higher education begins.",
    detail:
      "Scholars graduate high school and transition into higher education with continued logistics and family support: aptitude mapping, college applications, entrance-exam preparation and fee coverage, each step managed by the program.",
    chips: ["High school graduate", "College applications managed", "Family services continue"],
  },
  {
    age: "YEAR 13–15",
    year: "The After",
    title: "College Graduate",
    teaser: "Degree in hand, first professional job — poverty ends here.",
    detail:
      "The scholar graduates college and enters a professional career — the 'after' in the before/after story. Placement support and early-career guidance carry them across the last mile to a first salary, ending the family's relationship with poverty in one generation.",
    chips: ["College degree completed", "Placement support", "First professional salary"],
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
    before: "/assets/started.jpg",
    after: "/assets/going.jpg",
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
    title: "The Solution",
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
