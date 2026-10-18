import { Reveal, Eyebrow } from "@/components/Reveal";
import AlbumButtons from "@/components/AlbumButtons";
import { MapPin } from "lucide-react";

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
  { src: "/assets/story-15.jpg", alt: "Responsible Charity Society team member portrait collage" },
  { src: "/assets/story-16.jpg", alt: "Responsible Charity Society team member portrait collage" },
  { src: "/assets/story-17.jpg", alt: "Responsible Charity Society team member portrait collage" },
];

const STORY_TEXT = [
  "In late 2010, a group of friends came together in India and saw something that stayed with them: children with real potential, families with real determination, and no real system built to help them break the cycle of poverty for good. So they built one.",
  "What began as informal, grassroots volunteer work grew into Responsible Charity Society: a structured, 15-year model now spanning Kolkata, Pune, and Mumbai, guided over the years by a shared vision that education alone isn't enough. Lasting change takes education, healthcare, family support, and consistent mentorship, sustained over the entire span of a childhood.",
  "Today, that vision lives on through AimGame, our flagship program, carried forward by a growing team of local staff, mentors, and partners who make it work every day.",
];

const CENTERS = [
  {
    id: "kolkata",
    index: "01",
    city: "Kolkata",
    tag: "Our larger center",
    photos: [
      {
        src: "/assets/center-kolkata-1.jpg",
        alt: "Music class in the Kolkata community center — students watching a violin and flute performance",
      },
      {
        src: "/assets/center-kolkata-2.jpg",
        alt: "Students at laptops in the Kolkata community center computer room",
      },
      {
        src: "/assets/center-kolkata-3.jpg",
        alt: "Students playing dominoes together at the Kolkata community center",
      },
    ],
  },
  {
    id: "pune",
    index: "02",
    city: "Pune",
    tag: "Our second center",
    photos: [
      {
        src: "/assets/center-pune-1.jpg",
        alt: "A team member walking visitors through the Responsible Charity Principles wall at the Pune community center",
      },
      {
        src: "/assets/center-pune-2.jpg",
        alt: "Students sharing a snack together in a circle at the Pune community center",
      },
      {
        src: "/assets/center-pune-3.jpg",
        alt: "The scholar family wall at the Pune community center with framed portraits of each family",
      },
    ],
  },
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

        <div className="mt-24">
          <Reveal>
            <h2
              data-testid="centers-header"
              className="font-display font-extrabold tracking-tight leading-[1.05] text-3xl sm:text-4xl lg:text-5xl text-leaf uppercase"
            >
              Our Community Centers
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              data-testid="centers-subheader"
              className="mt-4 font-display font-bold text-2xl sm:text-3xl text-flame tracking-tight max-w-4xl"
            >
              Two community centers, Kolkata and Pune, built for everything a scholarship alone can't provide.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p data-testid="centers-description" className="mt-6 max-w-3xl text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
              Our community centers are where the program lives day to day. After school, students come for
              tutoring, music classes, yoga and games. Parents come for meetings and workshops. Supplies are
              distributed here, and visitors are welcome by arrangement. It's a second home for our students,
              not just a place they're required to be.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-ink-muted text-base sm:text-lg">
              Two centers today: <span className="font-bold text-ink">Kolkata</span>, our larger center, and{" "}
              <span className="font-bold text-ink">Pune</span>.
            </p>
          </Reveal>

          {CENTERS.map((c) => (
            <div key={c.id} data-testid={`center-section-${c.id}`} className="mt-16">
              <Reveal>
                <Eyebrow>{`Center ${c.index} · ${c.tag}`}</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h3 className="mt-3 flex items-center gap-3 font-display font-extrabold tracking-tight text-2xl sm:text-3xl text-leaf uppercase">
                  <MapPin className="h-6 w-6 text-flame shrink-0" />
                  {c.city}
                </h3>
              </Reveal>
              <div className="mt-8 grid sm:grid-cols-3 gap-4 sm:gap-6">
                {c.photos.map((p, i) => (
                  <Reveal key={p.src} delay={0.05 + i * 0.06}>
                    <div
                      data-testid={`center-photo-${c.id}-${i}`}
                      className="group aspect-[4/3] overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_24px_50px_-28px_rgba(15,23,42,0.25)]"
                    >
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.12}>
                <AlbumButtons page="our-story" block={c.id} align="start" />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
