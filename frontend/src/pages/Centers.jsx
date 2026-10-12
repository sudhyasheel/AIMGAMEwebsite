import { Reveal, Eyebrow } from "@/components/Reveal";
import AlbumButtons from "@/components/AlbumButtons";
import { MapPin } from "lucide-react";

const CENTERS = [
  {
    id: "kolkata",
    index: "01",
    city: "Kolkata",
    tag: "Our larger center",
    photos: [
      {
        src: "https://images.unsplash.com/flagged/photo-1574098335395-18cf525e45d6?crop=entropy&cs=srgb&fm=jpg&q=85",
        alt: "Students in an after-school tutoring session at the Kolkata community center",
      },
      {
        src: "https://images.unsplash.com/photo-1627475312657-3752fa068473?crop=entropy&cs=srgb&fm=jpg&q=85",
        alt: "Children playing indoor games together at the Kolkata community center",
      },
      {
        src: "https://images.unsplash.com/photo-1764661441867-473a59a765bc?crop=entropy&cs=srgb&fm=jpg&q=85",
        alt: "A group class in session at the Kolkata community center",
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
        src: "https://images.unsplash.com/photo-1637257526540-43d96c33fbe7?crop=entropy&cs=srgb&fm=jpg&q=85",
        alt: "Children in a music and art class at the Pune community center",
      },
      {
        src: "https://images.unsplash.com/photo-1529209076408-5a115ec9f1c6?crop=entropy&cs=srgb&fm=jpg&q=85",
        alt: "A group activity in the hall at the Pune community center",
      },
      {
        src: "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?crop=entropy&cs=srgb&fm=jpg&q=85",
        alt: "A parents and community meeting at the Pune community center",
      },
    ],
  },
];

const Centers = () => (
  <main data-testid="centers-page">
    <section className="pt-44 sm:pt-60 pb-16 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <h1
            data-testid="centers-header"
            className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
          >
            Our Community Centers
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            data-testid="centers-subheader"
            className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight max-w-4xl"
          >
            Two community centers, Kolkata and Pune, built for everything a scholarship alone can't provide.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p data-testid="centers-description" className="mt-8 max-w-3xl text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
            Our community centers are where the program lives day to day. After school, students come for
            tutoring, music classes, yoga and games. Parents come for meetings and workshops. Supplies are
            distributed here, and visitors are welcome by arrangement. It's a second home for our students,
            not just a place they're required to be.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-6 text-ink-muted text-base sm:text-lg">
            Two centers today: <span className="font-bold text-ink">Kolkata</span>, our larger center, and{" "}
            <span className="font-bold text-ink">Pune</span>.
          </p>
        </Reveal>
      </div>
    </section>

    {CENTERS.map((c) => (
      <section
        key={c.id}
        data-testid={`center-section-${c.id}`}
        className="py-16 sm:py-20 border-t border-ink/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <Reveal>
            <Eyebrow>{`Center ${c.index} · ${c.tag}`}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 flex items-center gap-3 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-leaf uppercase">
              <MapPin className="h-8 w-8 text-flame shrink-0" />
              {c.city}
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 sm:gap-6">
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
          <Reveal delay={0.15}>
            <AlbumButtons page="community-centers" block={c.id} align="start" />
          </Reveal>
        </div>
      </section>
    ))}
  </main>
);

export default Centers;
