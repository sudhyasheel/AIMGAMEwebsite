# PRD — Responsible Charity Society · AimGame Website

## Original Problem Statement
"make me a fully functional website with the brief as in the uploaded pdf. logo to be used is uploaded as image. Use an orange and Green colour theme. some sites for broad reference. https://www.teachforindia.org/ and https://www.ambujafoundation.org/"

Brief (from PDF): A rebooted website for Responsible Charity (RC) Society, a registered Indian NGO (80G certified since 2012), focused solely on its flagship program AimGame — Life-Changing Scholarships: a 15-year education program taking a child from play-based entry at age 5 to college-graduate professional at 22. Confident, declarative, typography-led design; the 15-year timeline is the signature visual; gated India-only donation flow framed as partnership-building; routed contact form; credibility signals throughout.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll), shadcn/ui, Syne/Plus Jakarta Sans/JetBrains Mono
- Backend: FastAPI + MongoDB (motor), `/api` prefix
  - POST /api/submissions — stores donations, CSR/HNI qualifying inquiries, contact messages
  - GET /api/submissions — admin-only via `x-admin-key` header (ADMIN_KEY in backend/.env)
- Logo: user-uploaded image at /app/frontend/public/assets/logo.png
- Colors: flame orange #E8490F, leaf green #166534, warm sand #FAF8F5, night #0B1320

## User Personas
- CSR decision-maker evaluating credibility and wanting a qualifying conversation
- Individual Indian donor (₹1,000+ gifts, 80G receipt)
- HNI exploring full-arc sponsorship
- Volunteer / job seeker / general visitor using routed contact
- RC team member reviewing submissions in the admin panel

## Core Requirements (static)
- 7 pages: Home, The Program, Transformations, Partner/Donate, CSR Partners, About/Trust, Contact
- Signature 15-year interactive timeline (horizontal desktop / vertical mobile, expandable milestones)
- Before/after scholar gallery (no slider gimmick)
- Gated donation flow: donor type → threshold logic (min ₹1,000; ≥₹1L or CSR/HNI → qualifying conversation)
- Routed contact form; admin view of submissions
- 80G/registration trust signals; CSR partner strip; social feed
- Standardized page headers everywhere: left-aligned green uppercase H1 + orange subheader (text-3xl sm:text-4xl), max-w-7xl px-4 sm:px-8 lg:px-16, pt-44 sm:pt-60, grain + dot-grid

## Implemented (2026-09-09)
- All 6 public pages + /admin panel (passcode: rc-aimgame-admin-2026)
- Kinetic hero with masked line-by-line reveal, parallax logo card, dot-grid motif from logo
- Editorial marquee, numbered manifesto chapters, Lenis momentum scroll, scroll-reveals throughout
- Full interactive timeline with milestone detail panels; holistic model accordion
- Transformations gallery with 5 placeholder scholars (MOCKED content/photos)
- Gated partner flow with SIMULATED payment, CSR/HNI qualifying forms → DB
- Routed contact form → DB; admin dashboard with kind filters and counts
- Mocked "from the field" feed and placeholder CSR partner wordmarks (MOCKED)

## Implemented (2026-07-10)
- NEW dedicated CSR Partners page (/csr-partners): "A Win-Win Partnership" header, "More Than a Donation. A Relationship." subheader, 3 green description paragraphs (₹1,00,000 threshold), CSR contact form (kind=csr → DB), credentials strip (80G, CSR Approved, Utilization Certificates, Customized Impact Reports, Annual Reports, Registered Credentials)
- Contact page redesigned: "Let's Talk" + "Before we do, let's make sure we're the right fit." + green fit-check copy (₹10,000 individual / ₹1,00,000 CSR thresholds), routing rows to contact form / CSR page / Internships, routed topic form retained
- Headers standardized (left-aligned, green/orange) on Donate + CSR Partners; subheaders enlarged to text-2xl sm:text-3xl site-wide
- Our Story collage: 5 photos per row spanning the full subheader width end-to-end (grid-cols-5, ~221px tiles on desktop)
- Navbar CSR PARTNERS link now routes to /csr-partners

## Implemented (2026-07-10, part 2)
- Subheaders enlarged again to text-3xl sm:text-4xl site-wide (+20%)
- Our Story collage: 5-across grid spanning the subheader width end-to-end
- Homepage timeline: icon boxes now mirror chevron geometry exactly (same widths/overlaps) — boxes 1-4 left-aligned to their chevron's left edge, box 5 right-aligned flush with the last chevron's arrow tip; boxes lengthened (w-24), chevron icons +31% (42px), pillar icons h-9; both rows share one horizontal scroll container on mobile so they stay aligned

- Internships paragraphs switched to RC green semibold text-lg sm:text-xl, matching paragraph copy on Contact/CSR pages
- Homepage: removed the EDUCATION/HEALTHCARE/EMPLOYMENT pillar segment below the timeline
- Our Story: added 5 user-uploaded team photos (story-10..14.jpg, normalized to 1200x1200 JPG) after the last tile — collage now 14 photos in 5/5/4 rows

- Homepage: main journey graphic replaced with user-uploaded banner (hero-timeline.jpg, 1600x535); 5 invisible hotspot links preserve milestone deep-links to /program?m=0..4; horizontal scroll on mobile for readability
- Homepage: hero description updated to new "Created and managed by Responsible Charity Society..." copy, enlarged to text-2xl sm:text-3xl, gap to graphic tightened (mt-8)

## Implemented (2026-07-11)
- THE WORK page fully rebuilt per user spec: new header/subheader/description, three pillar sections (Education 01, Healthcare 02, Employment 03) each with intro line + 6 photo blocks in 3x2 grid + Facebook album link (facebook.com/responsiblecharity/photos_albums, new tab, noopener)
- Sticky pillar nav (Education/Healthcare/Employment): pins under main navbar after hero, gold scroll-spy active state + underline, gold progress line, lenis offset jumps, hash anchors (/program#education etc.), aria-current + keyboard support
- Employment blocks 4 & 6 carry "Partner with us" links to /csr-partners
- Parents as Partners band (light green) + dark closing CTA band (Meet Our Graduates → /transformations, Let's Talk → /contact)
- Photos: real RC assets for entrance game/school/graduate blocks, curated dignified Unsplash photos for the rest (all URLs verified HTTP 200)
- Old milestone Timeline/Marquee/layers accordion removed from /program (homepage hotspots still route to /program?m=N)

## Prioritized Backlog
- P0: Real Razorpay integration (India gateway) replacing simulated payment
- P0: Real scholar stories, photos and impact numbers from RC team
- P1: Resend email routing for submissions (managed integration available)
- P1: Real CSR partner logos and live Instagram embed
- P2: 20–30s graduate video clips paired with childhood photos
- P2: CMS-editable content for scholars/partners/milestones
