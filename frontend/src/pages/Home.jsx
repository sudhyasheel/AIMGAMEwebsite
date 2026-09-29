import { Link } from "react-router-dom";
import { Reveal, MaskedLine } from "@/components/Reveal";
import { MILESTONES } from "@/data/content";

const HeroGraphic = () => (
  <div data-testid="hero-journey-wrap" className="mt-10">
    <div className="overflow-x-auto no-scrollbar">
      <div className="relative min-w-[900px] sm:min-w-0">
        <img
          src="/assets/hero-timeline.jpg"
          alt="The AimGame journey: Year 1 Start Program and School Enrollment, Year 3 Conversational English Unlocked, Year 6 Graduates Class 10, Year 8 High School Graduation, Year 13-15 College Graduate"
          data-testid="hero-timeline-graphic"
          className="w-full h-auto rounded-2xl"
        />
        <div className="absolute inset-0 flex">
          {MILESTONES.map((m, i) => (
            <Link
              key={m.title}
              to={`/program?m=${i}`}
              data-testid={`hero-journey-zone-${i}`}
              aria-label={`Explore ${m.title} on the program page`}
              className="block flex-1"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section data-testid="hero-section" className="relative overflow-hidden pt-44 sm:pt-60 pb-24 lg:pb-32 grain">
    <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
    <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-flame/10 blur-3xl pointer-events-none" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
      <h1 data-testid="hero-header" className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase">
        <MaskedLine delay={0.1}>Poverty Eradication</MaskedLine>
        <MaskedLine delay={0.25}>in One Generation.</MaskedLine>
      </h1>

      <Reveal delay={0.35}>
        <p data-testid="hero-subheader" className="mt-5 font-display font-bold tracking-tight text-3xl sm:text-4xl text-flame">
          From Poverty to Prosperity in 15 Years or Less
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <HeroGraphic />
      </Reveal>

      <Reveal delay={0.28}>
        <p data-testid="hero-description" className="mt-8 text-2xl sm:text-3xl leading-relaxed font-semibold text-leaf">
          Created and managed by Responsible Charity Society, AimGame uses competitive play to select children
          from slum communities in India for an immersive 15-year scholarship program, providing access to
          quality education, healthcare, and employment support through college graduation with a clear path
          to poverty eradication in one generation.
        </p>
      </Reveal>
    </div>
  </section>
);

const Home = () => (
  <main data-testid="home-page">
    <Hero />
  </main>
);

export default Home;
