import { MARQUEE_ITEMS } from "@/data/content";

const Row = () => (
  <div className="flex shrink-0 items-center">
    {MARQUEE_ITEMS.map((item, i) => (
      <span key={i} className="flex items-center">
        <span className="px-8 font-display font-bold text-sm sm:text-base tracking-[0.2em] whitespace-nowrap">
          {item}
        </span>
        <span className="h-2 w-2 rounded-full bg-flame inline-block" />
      </span>
    ))}
  </div>
);

const Marquee = ({ dark = true }) => (
  <div
    data-testid="editorial-marquee"
    className={`relative overflow-hidden py-5 border-y ${
      dark ? "bg-night text-sand border-night" : "bg-leaf-soft text-ink border-ink/10"
    }`}
  >
    <div className="flex w-max animate-marquee">
      <Row />
      <Row />
    </div>
  </div>
);

export default Marquee;
