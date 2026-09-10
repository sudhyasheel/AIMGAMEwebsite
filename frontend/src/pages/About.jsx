import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { TRUST_SIGNALS } from "@/data/content";

const About = () => (
  <main data-testid="about-page">
    <section className="pt-52 sm:pt-72 pb-20 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal><Eyebrow>About & Trust</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
            Calm where it counts. <span className="text-leaf">Credible by design.</span>
          </h1>
        </Reveal>
      </div>
    </section>

    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6 text-ink-muted leading-relaxed text-base sm:text-lg">
          <Reveal>
            <p>
              <span className="font-display font-bold text-ink text-xl">Responsible Charity Society</span> is a
              registered Indian NGO with a single, sharpened focus: proving that poverty can be ended inside
              one generation when a child's education is never interrupted.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              Its flagship program, <span className="font-semibold text-flame">AimGame — Life-Changing
              Scholarships</span>, began with a simple observation: short-term help produces short-term
              change. So RC Society built the opposite — a fifteen-year commitment that starts with a board
              game at age five and ends with a college degree and a first professional salary at twenty-two.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p>
              The society has held 80G certification continuously since 2012, is audited annually, and
              reports to partners scholar by scholar — attendance, milestones, outcomes — because trust is
              not a section on a website. It is a paper trail.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div data-testid="trust-badge-card" className="rounded-3xl bg-night text-sand p-10 relative overflow-hidden grain">
              <div className="absolute inset-0 dot-grid-light opacity-30 pointer-events-none" />
              <div className="relative">
                <BadgeCheck className="h-10 w-10 text-flame" />
                <p className="mt-6 font-mono text-xs tracking-[0.3em] text-sand/60">REGISTRATION</p>
                <p className="mt-2 font-display font-extrabold text-4xl">80G · Since 2012</p>
                <p className="mt-4 text-sand/70 text-sm leading-relaxed">
                  All donations to Responsible Charity Society are eligible for tax deduction under Section
                  80G of the Income Tax Act, 1961. Receipts are issued by RC Society as the receiving entity.
                </p>
                <div className="mt-8 pt-6 border-t border-sand/15 font-mono text-xs tracking-[0.2em] text-leaf font-bold">
                  RESPONSIBLE CHARITY SOCIETY · REGISTERED INDIAN NGO
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <Marquee />

    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal><Eyebrow>Transparency Signals</Eyebrow></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 mb-14 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-2xl">
            Evidence, not sentiment.
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {TRUST_SIGNALS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.07}>
              <div data-testid={`trust-signal-${i}`} className="h-full rounded-3xl bg-white border border-ink/10 p-8 transition-all duration-500 hover:border-leaf/40 hover:-translate-y-1">
                <span className="font-display font-extrabold text-4xl text-leaf/25">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display font-bold text-xl">{t.title}</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <div className="mt-16 text-center">
            <Link
              to="/partner"
              data-testid="about-cta-partner"
              className="group inline-flex items-center gap-3 rounded-full bg-flame px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
            >
              Partner With a Proven System
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
);

export default About;
