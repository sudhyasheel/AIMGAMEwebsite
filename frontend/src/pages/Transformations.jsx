import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { JourneyGraphic } from "@/components/JourneyGraphic";

const Transformations = () => (
  <main data-testid="transformations-page">
    <section className="pt-44 sm:pt-60 pb-16 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <h1
            data-testid="results-header"
            className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
          >
            The Proof: From Poverty to College Graduate
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            data-testid="results-subheader"
            className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight"
          >
            Meet our graduates, and the scholars following right behind them.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p data-testid="results-description" className="mt-8 max-w-3xl text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
            Each of our graduates began as a child playing a game. Today they hold a college degree. The
            scholars below them are on the same path, one milestone at a time.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="pb-24 lg:pb-28" data-testid="results-journey-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <div className="overflow-x-auto no-scrollbar">
            <div className="relative min-w-[900px] sm:min-w-0">
              <div className="relative aspect-[3/1] rounded-2xl overflow-hidden">
                <JourneyGraphic />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <section data-testid="results-cta-band" className="bg-leaf text-white relative grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 sm:py-24 text-center">
        <Reveal>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl uppercase">
            Every graduate started with a game.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            The next fifteen years are being written right now — come be part of them.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/partner"
              data-testid="cta-donate-btn"
              className="group inline-flex items-center gap-2 rounded-full bg-flame px-8 py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
            >
              Donate
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/csr-partners"
              data-testid="cta-partner-btn"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 font-bold text-white transition-colors duration-300 hover:border-flame hover:text-flame"
            >
              Partner With Us
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
);

export default Transformations;
