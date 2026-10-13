import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, Facebook, Linkedin, BadgeCheck, ShieldCheck, FileCheck2, Building2, Files, FileBarChart2, FolderOpen } from "lucide-react";

const SOCIALS = [
  { Icon: Facebook, name: "facebook", href: "https://www.facebook.com/responsiblecharity" },
  { Icon: Instagram, name: "instagram", href: "https://www.instagram.com/responsiblecharity" },
  { Icon: Linkedin, name: "linkedin", href: "https://www.linkedin.com/company/responsiblecharity" },
];

const MENU = [
  ["Home", "/"],
  ["Our Work", "/program"],
  ["Results", "/transformations"],
  ["Our Story", "/about"],
  ["Internships", "/internships"],
  ["CSR Partners", "/csr-partners"],
  ["Let's Talk", "/contact"],
];

const CERTIFICATIONS = [
  [ShieldCheck, "INDIAN REGISTERED NON-PROFIT ORGANIZATION"],
  [BadgeCheck, "80G TAX DEDUCTIBLE"],
  [Building2, "CSR APPROVED"],
  [FileCheck2, "SEC 135 COMPLIANCE"],
  [Files, "UTILIZATION CERTIFICATES"],
  [FileBarChart2, "CUSTOMIZED IMPACT REPORTS"],
  [FolderOpen, "ANNUAL REPORTS & FINANCIALS"],
];

const Footer = () => (
  <footer data-testid="site-footer" className="bg-night text-sand relative grain">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-10">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="h-16 w-16 rounded-xl bg-white p-1.5">
              <img src="/assets/logo.png" alt="AimGame logo" className="h-full w-full object-contain" />
            </span>
            <span className="font-display font-extrabold text-4xl text-flame">AimGame</span>
          </div>
          <p className="mt-6 text-sand/70 max-w-sm leading-relaxed">
            The most effective education program eradicating poverty in one generation — a fifteen-year
            scholarship from a child's first game to their first salary.
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="font-mono text-xs tracking-[0.25em] text-sand/50 mb-5">MENU</p>
          <ul className="space-y-3">
            {MENU.map(([label, to]) => (
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

      <div className="mt-14 border-t border-sand/10 pt-10">
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ Icon, name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              data-testid={`footer-social-${name}`}
              className="h-[88px] w-[88px] rounded-full border-2 border-sand/20 inline-flex items-center justify-center text-sand/70 transition-all duration-300 hover:bg-flame hover:border-flame hover:text-white"
            >
              <Icon className="h-8 w-8" />
            </a>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
          {CERTIFICATIONS.map(([Icon, label]) => (
            <span key={label} data-testid={`footer-cert-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="inline-flex items-center gap-3 font-mono text-xl tracking-[0.15em] text-sand/70 font-semibold">
              <Icon className="h-8 w-8 text-leaf shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-sand/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-sand/50">
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

      <p data-testid="footer-80g-note" className="mt-8 text-xs text-sand/50 leading-relaxed max-w-4xl">
        Donations to Responsible Charity Society are eligible for deduction under Section 80G of the Income
        Tax Act, 1961.
      </p>

      <p data-testid="footer-disclaimer" className="mt-4 text-sm sm:text-base text-sand/50 leading-relaxed max-w-4xl">
        Disclaimer & Terms of Use: This website and all its content are the property of Responsible Charity
        Society and may not be reproduced without written permission. Information here is provided for general
        awareness; donation terms, 80G receipts and CSR documentation are issued in accordance with applicable
        Indian law.
      </p>
    </div>
  </footer>
);

export default Footer;
