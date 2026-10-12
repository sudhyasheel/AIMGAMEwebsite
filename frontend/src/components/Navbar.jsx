import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { to: "/", label: "HOME", id: "nav-link-home", end: true },
  { to: "/program", label: "THE WORK", id: "nav-link-the-work" },
  { to: "/transformations", label: "THE RESULTS", id: "nav-link-the-results" },
  { to: "/about", label: "OUR STORY", id: "nav-link-our-story" },
  { to: "/community-centers", label: "OUR COMMUNITY CENTERS", id: "nav-link-community-centers" },
  { to: "/internships", label: "INTERNSHIPS", id: "nav-link-internships" },
  { to: "/csr-partners", label: "CSR PARTNERS", id: "nav-link-csr-partners" },
  { to: "/contact", label: "LET'S TALK", id: "nav-link-lets-talk" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled ? "bg-sand/85 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.08)]" : "bg-transparent"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-20" : "h-36 sm:h-48"}`}>
        <Link to="/" data-testid="nav-logo" className="flex items-center group">
          <span className={`relative z-10 shrink-0 overflow-visible transition-all duration-500 group-hover:rotate-3 ${scrolled ? "h-16 w-16" : "h-32 w-32 sm:h-44 sm:w-44"}`}>
            <img src="/assets/logo-rc.png" alt="AimGame logo" className="h-full w-full object-contain" />
          </span>
        </Link>

        <div className="hidden lg:flex flex-col items-end gap-3">
          <img
            src="/assets/banner.png"
            alt="AimGame — Life-Changing Scholarships Across India"
            data-testid="nav-banner"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-0 opacity-0 overflow-hidden" : "h-28 opacity-100"}`}
          />
          <nav className="flex items-center gap-4">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              data-testid={l.id}
              className={({ isActive }) =>
                `whitespace-nowrap text-[13px] font-semibold tracking-normal transition-colors duration-300 ${
                  isActive ? "text-leaf underline underline-offset-8 decoration-2 decoration-flame" : "text-leaf/70 hover:text-leaf"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/partner"
            data-testid="nav-cta-donate"
            className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-flame px-5 py-2.5 text-[13px] font-bold tracking-wide text-white transition-colors duration-300 hover:bg-flame-dark"
          >
            DONATE
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          </nav>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="lg:hidden h-11 w-11 inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/70"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div data-testid="nav-mobile-menu" className="lg:hidden bg-sand/95 backdrop-blur-xl border-t border-ink/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                data-testid={`${l.id}-mobile`}
                className="font-display font-bold text-2xl text-ink"
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/partner"
              data-testid="nav-cta-donate-mobile"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-flame px-6 py-3.5 font-bold text-white"
            >
              DONATE <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
