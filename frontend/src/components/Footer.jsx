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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-between">
        <nav data-testid="footer-menu" className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {MENU.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              data-testid={`footer-link-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="text-sand/80 hover:text-flame transition-colors duration-300 font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          to="/partner"
          data-testid="footer-cta-donate"
          className="group inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
        >
          Donate
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-9 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
        <div className="flex items-center gap-4 shrink-0">
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
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:flex-1 lg:justify-between">
          {CERTIFICATIONS.map(([Icon, label]) => (
            <span key={label} data-testid={`footer-cert-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-sand/70 font-semibold">
              <Icon className="h-5 w-5 text-leaf shrink-0" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-9 pt-6 border-t border-sand/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-sand/50">
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
