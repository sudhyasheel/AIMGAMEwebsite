import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MILESTONES } from "@/data/content";

const SCHOLAR_SETS = [
  ["/assets/scholar-b-1.jpg", "/assets/scholar-b-2.jpg", "/assets/scholar-b-3.jpg", "/assets/scholar-b-4.jpg", "/assets/scholar-b-5.jpg"],
  ["/assets/scholar-c-1.jpg", "/assets/scholar-c-2.jpg", "/assets/scholar-c-3.jpg", "/assets/scholar-c-4.jpg", "/assets/scholar-c-5.jpg"],
  ["/assets/scholar-d-1.jpg", "/assets/scholar-d-2.jpg", "/assets/scholar-d-3.jpg", "/assets/scholar-d-4.jpg", "/assets/scholar-d-5.jpg"],
];
const PANEL_COLORS = ["#E8490F", "#1E7A3C", "#F2A500", "#E8490F", "#1E7A3C"];
const SET_ROTATE_MS = 2500;

const chevronClip = (first) =>
  first
    ? "polygon(0 0, calc(100% - 12%) 0, 100% 50%, calc(100% - 12%) 100%, 0 100%)"
    : "polygon(0 0, calc(100% - 12%) 0, 100% 50%, calc(100% - 12%) 100%, 0 100%, 12% 50%)";

export const ScholarStrip = () => {
  const [setIdx, setSetIdx] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => setSetIdx((s) => (s + 1) % SCHOLAR_SETS.length), SET_ROTATE_MS);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      data-testid="hero-scholar-strip"
      className="absolute top-[2.5%] h-[44.5%] left-[1.75%] right-[1.75%] flex"
      style={{ gap: "2%" }}
    >
      {PANEL_COLORS.map((color, i) => (
        <div
          key={i}
          data-testid={`hero-scholar-panel-${i}`}
          className="relative flex-1"
          style={{ clipPath: chevronClip(i === 0), backgroundColor: color }}
        >
          {SCHOLAR_SETS.map((set, s) => (
            <img
              key={s}
              src={set[i]}
              alt=""
              aria-hidden={s !== setIdx}
              className="absolute object-cover transition-opacity duration-700"
              style={{
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                clipPath: chevronClip(i === 0),
                opacity: s === setIdx ? 1 : 0,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const JourneyGraphic = () => (
  <div className="absolute inset-0" data-testid="journey-graphic">
    <img
      src="/assets/hero-timeline.jpg"
      alt="The AimGame journey: Year 1 Start Program and School Enrollment, Year 3 Conversational English Unlocked, Year 6 Graduates Class 10, Year 8 High School Graduation, Year 13-15 College Graduate"
      data-testid="hero-timeline-graphic"
      className="h-full w-full object-cover"
    />
    <ScholarStrip />
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
);
