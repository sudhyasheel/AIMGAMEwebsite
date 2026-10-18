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

## Implemented (2026-07-12)
- RESULTS page rebuilt: "The Proof: From Poverty to College Graduate" header, 4 graduate profiles (2 real before/after diptychs + 2 curated placeholders), "Right Behind Them" scholars strip (YEAR 1/3/6/8), green CTA band (Donate → /partner, Partner With Us → /csr-partners)
- OUR STORY: added "Our Community Centers" section (Kolkata + Pune cards) after story text
- DONATE page: new header "Donate Today and Be Part of the Journey" + subheader + description + CSR partnership link; Priority Giving flow — gifts ≥ ₹1,00,000 route to Giving Desk panel (headline/body/back-line per spec) with contact-method + gift-range form (kind=hni, via=giving-desk); trust cards now: Indian Registered Non-Profit, 80G Certified, CSR Approved, Sec 135 Compliance
- Footer: real social links (FB/IG/LinkedIn/YouTube @responsiblecharity, new tab), 4 certification items, full 7-link menu repeated, disclaimer & terms line
- Footer testid regex fixed to handle digits/apostrophes

- THE WORK restructure (v2): Education keeps 6 blocks (3x2); Healthcare reduced to 3 blocks in one row (family care, check-ups, hygiene); Employment reduced to 3 blocks in one row (internships+partner link, real job connections, industry workshops+partner link); album links restyled as buttons; NEW mid-width Education Partners band (6 logo slots — PLACEHOLDERS awaiting school/college logos) between Employment and Parents band

- THE WORK block copy finalized per user spec: Education (Game Competitions, Quality Schools, Tuitions, Music/Art/Dance, Physical Education, Field Trips & More; intro "It starts with games..."), Healthcare 3 blocks (Workshops & Prevention Plans / Diagnosis, Check-ups, Medicines & Procedures / Sanitary Napkins & General Hygiene), Employment 3 blocks (Career Counseling & Industry Workshops / CV Preparation & Interview Training / Internships & Job Connections, partner links on 1 & 3). Drive folder image sources are not publicly accessible — current photos kept until user shares files

- Education Partners band: final description copy + Kolkata/Pune album buttons; Parents as Partners band: final "Parents are with us from day one..." copy + Kolkata/Pune/Mumbai album buttons (all album buttons point to the RC Facebook albums tab until per-city album URLs are shared)

- Album Buttons system built to spec: shared reusable component (src/components/AlbumButtons.jsx) driven by a link index (src/data/albums.js — page/block/label/city/url/verified/checked columns, no code change needed to update links); unverified rows hidden; single "See more photos" button when cities share an album; Facebook icon + new tab + noopener; 44px tap targets; click tracking via window.dataLayer (album_click with page/block/city); used on all 3 pillars, Education Partners, Parents band, and Our Community Centers
- Closing CTA band and sticky pillar nav re-confirmed against the developer brief (already matching: 3 nav items only, pin under header, gold active + underline, progress line, aria-current, reduced-motion instant jump)

- NEW top-level page OUR COMMUNITY CENTERS (/community-centers): standardized header/subheader + new day-to-day description, Kolkata (01, larger) and Pune (02) sections with 3 curated center-scene photos each + album buttons (Drive folders shared by user are not public — real center photos pending); nav tab added after OUR STORY; footer menu updated; navbar tightened (13px, nowrap) so all 8 tabs fit one row

- Internships: header now "Show Up. Play. Teach. Repeat!", new 4-paragraph description copy, 3 curated intern-themed photos (intern teaching/play/classroom) — Drive folder not public, real photos pending
- CSR Partners: credentials strip now 7 items per spec (Indian Registered Non-Profit Organization, 80G Tax Deductible, CSR Approved, Sec 135 Compliance, Utilization Certificates, Customized Impact Reports, Annual Reports & Financials)
- Footer: "80G CERTIFIED" → "80G TAX DEDUCTIBLE"; new 80G eligibility line (Section 80G, Income Tax Act 1961 — Reg. No. and validity dates pending from user)

- Community Centers merged INTO Our Story page (after staff photos + story text): full description copy, Center 01 Kolkata / Center 02 Pune sections with 3 photos each + per-center album buttons; standalone /community-centers page, nav tab, route and footer link removed

- Homepage hero graphic is now a two-phase animation: 12 real game-competition photos (sliced from user-uploaded grid into hero-grid-1..12.jpg, 300px tiles) flip in one by one (rotateY, 0.12s stagger), hold 5 seconds, then the timeline banner wipes in left-to-right (clip-path inset, 1.2s) with the 5 milestone hotspot links intact; reduced-motion skips straight to the banner

- Animation slowed 50%: flips 1.0s each, banner wipe 2.4s left-to-right
- Nav labels: THE WORK → OUR WORK, THE RESULTS → RESULTS (footer menu synced)
- Footer: socials now FB/IG/LinkedIn only at double size (88px circles), certification strip expanded to all 7 items, AimGame brand enlarged, "80G CERTIFIED SINCE 2012" line removed, disclaimer font enlarged

- Hero sequence v2: 12 photos flip in (1.0s staggered), hold 5s, then flip OUT column-by-column left→right (0.45s/column + 0.8s), while the timeline banner reveals left→right at the same sweep speed chasing the disappearance
- Footer certifications doubled: 20px text + 32px icons in their own 4-col grid row

- OUR WORK blocks: removed 01.1 numbering; real uploaded photos in Education blocks 1-4 (edu-1 game, edu-2 school, edu-3 tuitions, edu-4 violin); per-block album pill buttons with Facebook icon + click tracking: Game Competitions NATIONAL, Quality Schools KOLKATA+PUNE, Tuitions NATIONAL, Music NATIONAL, PE NATIONAL, Field Trips KOLKATA+MUMBAI+PUNE (exact user-provided FB media-set URLs)
- Footer certification text 40% smaller (12px, icons 20px to match)

- Real RC photos now in all Education blocks (edu-1..6: game, school, tuitions, violin, PE yoga, field trip bus) and all Healthcare blocks (health-1 workshop, health-2 check-up, health-3 hygiene distribution); Healthcare blocks got KOLKATA+PUNE album pills (workshops album + Pune album) per user URLs

- Employment blocks: real photos in upload sequence (emp-1 laptop mentoring, emp-2 Marriott front desk, emp-3 studio conversation) + NATIONAL album pill on all 3 (user-provided FB album)
- All card hyperlink boxes bottom-aligned to the same level (pills last in card flow, partner links above them)
- Education Partners band: first 2 real logos in (The Modern Academy, DY Patil School of Hospitality & Tourism Studies Navi Mumbai), 4 placeholder slots remain
- All 12 pillar blocks now use real RC photos

- Parents as Partners: real group-meeting photo; 3 city album buttons (KOLKATA/PUNE/MUMBAI) with user-provided FB album URLs via the link index; "See more photos" removed
- Education Partners: all 6 real logos in (Modern Academy, DY Patil Hospitality, Indira PGDM, South City International, IHM Hyderabad, I.P. Memorial)
- Homepage: new description copy ("Created by Responsible Charity Society..."), grid hold shortened to 2.5s
- Nav menu font bumped to 14px

- Hero banner now has a live ScholarStrip overlay: 5 chevron panels (same shape, orange/green/yellow colors, vignette, matching the banner geometry) crossfading every 2.5s between scholar set A (girl, tl-1..5) and set B (Vishnu: scholar-b-1..5 — connect-four, guitar, teen portrait, college admission, graduation); milestone hotspots preserved

## Prioritized Backlog
- P0: Real Razorpay integration (India gateway) replacing simulated payment
- P0: Real scholar stories, photos and impact numbers from RC team
- P1: Resend email routing for submissions (managed integration available)
- P1: Real CSR partner logos and live Instagram embed
- P2: 20–30s graduate video clips paired with childhood photos
- P2: CMS-editable content for scholars/partners/milestones
- Scholar set B reprocessed (Oct 16): scholar-b-1..5 backgrounds removed via rembg (isnet-general-use for the group scene, u2net + alpha matting for portraits), subjects recomposed bottom-centered on 1200x950 canvases (~1.26:1 to match chevron panel aspect, prevents object-cover cropping heads) with radial-gradient backgrounds in the exact panel colors (#E8490F/#1E7A3C/#F2A500). This removed the "colour shadow lines" (real photo backgrounds clashing inside colored chevrons). Verified in browser: both rotation states render cleanly. Originals backed up at /tmp/scholar-bak (ephemeral)
- Scholar set B fixes round 2 (Oct 16): scholar-b-2 redone with u2net + gentler alpha matting (erode 6, low-threshold trim) so the hair top is no longer sliced; scholar-b-5 redone with isnet-general-use + gentle matting for clean edges (mortarboard/garland intact, ghost smudges removed, subject enlarged to 94% canvas height); CSS vignette overlay removed from the ScholarStrip chevron panels per user request ("remove the shadow colour lines from the shapes"). Verified in browser at both rotation states
- Scholar strip (Oct 16, round 3): removed the 3% inset on chevron panel images so photos fill the full chevron shape — eliminates the "double colour outline" (bright frame band + dark photo edge). Verified both rotation states render as clean single-tone chevrons
- Scholar strip (Oct 16, round 4): flattened ALL 10 chevron photos (tl-1..5 and scholar-b-1..5) to solid panel colors with rembg cutouts — no gradients, vignettes or dark edges remain, so shapes have no border/shadow at all. tl originals backed up at /tmp/tl-bak (ephemeral). Verified both rotation states in browser
- Scholar strip (Oct 16): user rejected the flat-solid-colour version; reverted all 10 chevron photos to the pre-flatten state — soft radial-gradient backgrounds in panel colours, full-bleed images (no inset frame), no CSS vignette. Current state: tl-1..5 original photos, scholar-b 1=scene/2=guitar(full hair fix)/3=teen/4=black shirt/5=graduate(clean isnet cutout). Verified in browser
- Scholar strip (Oct 17): added THIRD rotating set (Karim's journey) as scholar-c-1..5 — scoreboard boy (scoreboard preserved via mask-union, second person removed), guitar teen, AimGame t-shirt portrait, blue kurta (from graduate graphic), graduation on lawn (certificate preserved via mask-union). Same pipeline: rembg cutouts on panel-colour gradient canvases (1200x950), bottom-anchored. Home.jsx SCHOLAR_SETS now has 3 entries; rotation cycles A→B→C every 2.5s. Verified all three states in browser. Source uploads: "1 (4).JPG", "2 (4).webp", "3 (4).webp", "4 (4).jpg", "Screenshot 2026-10-17 at 10.44.40 AM.png" in asset store
- Scholar strip (Oct 17): added FOURTH rotating set (Firdous's journey) as scholar-d-1..5 — scoreboard boy (board kept via rect-union), guitar teen (chair/stand-guitar/ghosts removed via targeted mask cleanup + gradient paint-over on composite), schoolboy at bank, maroon-shirt portrait (from college-admission graphic), graduate with scroll. Rotation now cycles 4 sets every 2.5s. Verified set D renders + full loop in browser. Source uploads: "1.jpeg", "2 (6).webp", "3 (6).webp", "4.jpeg", "Screenshot 2026-10-17 at 12.32.52 PM.png"
- Scholar strip (Oct 17): removed the dark shadow rim from ALL shapes — reprocessed all 20 chevron photos (tl + scholar-b/c/d) so backgrounds keep the soft centre glow but fade to the EXACT panel colour at edges (edge factor 1.0, was 0.62). Same cutouts/compositions as before. Full pipeline saved at /app/.image-sources/reprocess_all.py; all 20 original source photos persisted in /app/.image-sources/set{a,b,c,d}/ (survive pod restarts, unlike /tmp). Verified in browser
- Scholar strip (Oct 17, final edge fix): tightened the background glow (pure glow within 30% radius, exact panel colour from 75% outward) so no lighter/darker colour band approaches the chevron outline — shapes read as one clean flat colour at the edges. Applied to all 20 photos via /app/.image-sources/reprocess_all.py. Verified with close-up browser captures of the chevron edges
- Scholar strip (Oct 17): backgrounds now use a smooth vertical gradient (28% light tint of panel colour at top -> exact panel colour at bottom) for all 20 photos — visible gradient inside each shape with no colour band at the outline. Gap between chevron shapes increased 0.8% -> 2% in Home.jsx ScholarStrip. Verified in browser
- Scholar strip ROOT CAUSE found (Oct 17): the recurring "colour border/shadow lines" on shapes were the BAKED chevron panels inside hero-timeline.jpg peeking out from behind the overlay strip (slight misalignment). Fixed by painting the banner's baked photo area (top ~256 rows) cream — original saved at /app/.image-sources/hero-timeline-orig.jpg. Now only the overlay strip renders photos; alignment can never echo. Also made the photo gradient more dramatic (48% light tint at top -> panel colour at bottom). Verified with edge close-ups
- Results page (Oct 17): removed the graduate before/after grid and "scholars on the path" grid; the homepage journey graphic (timeline banner + 5 chevron panels rotating 4 scholar sets every 2.5s + milestone link zones) now sits under the intro text. Graphic extracted into shared component /app/frontend/src/components/JourneyGraphic.jsx (ScholarStrip + JourneyGraphic); Home.jsx consumes it (intro animation stays homepage-only). Verified rotation on both pages
- Banner fix (Oct 17): the timeline arrow's head (top right of hero-timeline.jpg) was clipped when the baked photo area was painted cream; restored by re-pasting only the original arrow-green pixels in the shaft/head polygon region right of the cap icon. Verified on the live hero
- Our Story centers (Oct 17): Kolkata center now shows 3 REAL uploaded photos (music room/Slum Jam, laptop room, dominoes) as center-kolkata-1..3.jpg, originals in /app/.image-sources/centers/. Kolkata "See more photos" button now links to FB album a.621972941147085 (edited in /app/frontend/src/data/albums.js, our-story/kolkata row). Pune still uses curated placeholders
- Our Story centers (Oct 17): Pune center now shows 3 REAL uploaded photos (principles wall with staff, snack circle, scholar family wall) as center-pune-1..3.jpg, originals in /app/.image-sources/centers/. Pune "See more photos" links to FB album a.2369685556375806. Both centers now use real photos + dedicated album links
- Our Story + Footer (Oct 18): 3 team-member B&W collages added to staff grid (story-15/16/17.jpg, 17 tiles total; originals in /app/.image-sources/team/). Footer: replaced logo-box+wordmark with uploaded logo on transparent bg (/assets/aimgame-logo-transparent.png, bg keyed out via luminance threshold); certification keywords now share one aligned row with the social icons; all below-the-line text unified to text-xs (disclaimer was text-sm/base)
