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
- 6 pages: Home, The Program, Transformations, Partner/Donate, About/Trust, Contact
- Signature 15-year interactive timeline (horizontal desktop / vertical mobile, expandable milestones)
- Before/after scholar gallery (no slider gimmick)
- Gated donation flow: donor type → threshold logic (min ₹1,000; ≥₹1L or CSR/HNI → qualifying conversation)
- Routed contact form; admin view of submissions
- 80G/registration trust signals; CSR partner strip; social feed

## Implemented (2026-09-09)
- All 6 public pages + /admin panel (passcode: rc-aimgame-admin-2026)
- Kinetic hero with masked line-by-line reveal, parallax logo card, dot-grid motif from logo
- Editorial marquee, numbered manifesto chapters, Lenis momentum scroll, scroll-reveals throughout
- Full interactive timeline with milestone detail panels; holistic model accordion
- Transformations gallery with 5 placeholder scholars (MOCKED content/photos)
- Gated partner flow with SIMULATED payment, CSR/HNI qualifying forms → DB
- Routed contact form → DB; admin dashboard with kind filters and counts
- Mocked "from the field" feed and placeholder CSR partner wordmarks (MOCKED)

## Prioritized Backlog
- P0: Real Razorpay integration (India gateway) replacing simulated payment
- P0: Real scholar stories, photos and impact numbers from RC team
- P1: Resend email routing for submissions (managed integration available)
- P1: Real CSR partner logos and live Instagram embed
- P2: 20–30s graduate video clips paired with childhood photos
- P2: CMS-editable content for scholars/partners/milestones
