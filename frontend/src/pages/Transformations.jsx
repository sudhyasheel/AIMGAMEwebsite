import { Reveal } from "@/components/Reveal";

const RESULTS_IMAGES = [
  {
    src: "/assets/results-1.jpg",
    alt: "How it started — a young scholar playing connect-four, and how it's going — the same scholar presenting at a podium",
  },
  {
    src: "/assets/results-2.jpg",
    alt: "How it started — a young scholar at entry, and how it's going — grown confident through the program",
  },
];

const Transformations = () => (
  <main data-testid="transformations-page">
    <section className="pt-44 sm:pt-60 pb-24 lg:pb-32 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <h1
            data-testid="results-header"
            className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
          >
            Four Graduates.
            <br />
            Four Families Changed Forever.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            data-testid="results-subheader"
            className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight"
          >
            This is what 15 years of consistency looks like.
          </p>
        </Reveal>

        <div className="mt-14 space-y-8 sm:space-y-10">
          {RESULTS_IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={0.1 + i * 0.1}>
              <div
                data-testid={`results-image-${i}`}
                className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.25)]"
              >
                <img src={img.src} alt={img.alt} className="w-full" loading={i === 0 ? "eager" : "lazy"} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Transformations;
