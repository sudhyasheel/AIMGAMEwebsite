import { Reveal } from "@/components/Reveal";

const STORY_PHOTOS = [
  { src: "/assets/story-1.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-2.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-3.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-4.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-5.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-6.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-7.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-8.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-9.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-10.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-11.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-12.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-13.jpg", alt: "Responsible Charity Society team member" },
  { src: "/assets/story-14.jpg", alt: "Responsible Charity Society team member" },
];

const STORY_TEXT = [
  "In late 2010, a group of friends came together in India and saw something that stayed with them: children with real potential, families with real determination, and no real system built to help them break the cycle of poverty for good. So they built one.",
  "What began as informal, grassroots volunteer work grew into Responsible Charity Society: a structured, 15-year model now spanning Kolkata, Pune, and Mumbai, guided over the years by a shared vision that education alone isn't enough. Lasting change takes education, healthcare, family support, and consistent mentorship, sustained over the entire span of a childhood.",
  "Today, that vision lives on through AimGame, our flagship program, carried forward by a growing team of local staff, mentors, and partners who make it work every day.",
];

const About = () => (
  <main data-testid="about-page">
    <section className="pt-44 sm:pt-60 pb-24 lg:pb-32 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div>
          <Reveal>
            <h1
              data-testid="story-header"
              className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
            >
              From Grassroots to Reality
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              data-testid="story-subheader"
              className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight"
            >
              A shared vision turned into real solutions for children and families living in poverty.
            </p>
          </Reveal>
        </div>

        <div data-testid="story-collage" className="mt-14 grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
          {STORY_PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={0.05 + i * 0.04}>
              <div
                data-testid={`story-photo-${i}`}
                className="group w-full overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading={i < 5 ? "eager" : "lazy"}
                  className="h-full w-full object-cover aspect-square transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 max-w-6xl mx-auto space-y-7">
          {STORY_TEXT.map((para, i) => (
            <Reveal key={i} delay={0.08 + i * 0.08}>
              <p data-testid={`story-paragraph-${i}`} className="text-leaf font-semibold text-xl sm:text-2xl leading-relaxed">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
