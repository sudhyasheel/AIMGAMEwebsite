import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Footer = () => (
  <footer data-testid="site-footer" className="bg-night text-sand relative grain">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-10">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="h-12 w-12 rounded-xl bg-white p-1">
              <img src="/assets/logo.png" alt="AimGame logo" className="h-full w-full object-contain" />
            </span>
            <span className="font-display font-extrabold text-2xl text-flame">AimGame</span>
          </div>
          <p className="mt-6 text-sand/70 max-w-sm leading-relaxed">
            The most effective education program eradicating poverty in one generation — a fifteen-year
            scholarship from a child's first game to their first salary.
          </p>
          <p className="mt-6 font-mono text-xs tracking-[0.25em] text-leaf font-semibold">
            80G CERTIFIED SINCE 2012
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="font-mono text-xs tracking-[0.25em] text-sand/50 mb-5">EXPLORE</p>
          <ul className="space-y-3">
            {[
              ["The Program", "/program"],
              ["Transformations", "/transformations"],
              ["About & Trust", "/about"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link
                  to={to}
                  data-testid={`footer-link-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="text-sand/80 hover:text-flame transition-colors duration-300 font-medium"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="font-mono text-xs tracking-[0.25em] text-sand/50 mb-5">START A CONVERSATION</p>
          <Link
            to="/partner"
            data-testid="footer-cta-partner"
            className="group inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
          >
            Partner With Us
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <p className="mt-6 text-sand/60 text-sm leading-relaxed">
            CSR partners and donors receive scholar-wise reporting — attendance, milestones, outcomes.
          </p>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-sand/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-sand/50">
        <p>
          Donations are received by Responsible Charity Society, a registered Indian NGO. AimGame is its
          flagship program.
        </p>
        <div className="flex gap-6">
          <span>© {new Date().getFullYear()} Responsible Charity Society</span>
          <Link to="/admin" data-testid="footer-link-admin" className="hover:text-flame transition-colors">
            Team Login
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
