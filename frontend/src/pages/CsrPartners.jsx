import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, Building2, FileCheck2, FileBarChart2, FolderOpen, ShieldCheck, Files, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Eyebrow, EASE } from "@/components/Reveal";
import { submitInquiry } from "@/lib/api";

const PARAGRAPHS = [
  "We welcome partnerships starting at ₹1,00,000 a year. Larger gifts and CSR partnerships begin with a conversation, so we can build something tailored together. Our best partnerships last for years, long enough to watch the same scholars they support grow from schoolchildren into college graduates. That's what a win-win partnership looks like: real transformation, seen firsthand, not just funded from a distance.",
  "Partnering with AimGame goes beyond annual giving. We also can create employee volunteer days, mentorship programs, workshops, and site visits tailored to what your organization wants to be part of, not just informed about.",
  "And it's all backed by paperwork that makes your side easy: utilization certificates, 80G tax-deductible receipts, direct impact reports on the scholars you support, and full annual reports, so your team always knows exactly where things stand.",
];

const CREDENTIALS = [
  { icon: ShieldCheck, title: "Indian Registered Non-Profit Organization", desc: "Responsible Charity Society — a registered Indian NGO.", testid: "csr-credential-registered" },
  { icon: BadgeCheck, title: "80G Tax Deductible", desc: "Donations eligible for deduction under Section 80G of the Income Tax Act, 1961.", testid: "csr-credential-80g" },
  { icon: Building2, title: "CSR Approved", desc: "Structured CSR partnerships with board-ready reporting.", testid: "csr-credential-csr" },
  { icon: FileCheck2, title: "Sec 135 Compliance", desc: "CSR documentation aligned with Section 135 of the Companies Act.", testid: "csr-credential-sec135" },
  { icon: Files, title: "Utilization Certificates", desc: "Formal utilization certificates for every contribution.", testid: "csr-credential-utilization" },
  { icon: FileBarChart2, title: "Customized Impact Reports", desc: "Direct impact reports on the scholars you support.", testid: "csr-credential-impact" },
  { icon: FolderOpen, title: "Annual Reports & Financials", desc: "Full annual reports and financials shared with every partner.", testid: "csr-credential-annual" },
];

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-flame placeholder:text-ink-muted/60";

const CsrForm = () => {
  const [form, setForm] = useState({ org: "", name: "", email: "", email2: "", phone: "", focus: "", range: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!form.org || !form.name || !form.email) {
      toast.error("Please fill your organisation, name and email.");
      return;
    }
    if (form.email.trim().toLowerCase() !== form.email2.trim().toLowerCase()) {
      toast.error("Email addresses do not match.");
      return;
    }
    setBusy(true);
    try {
      await submitInquiry({
        kind: "csr",
        name: form.name,
        email: form.email,
        phone: form.phone,
        org: form.org,
        message: form.message,
        meta: { focus: form.focus, range: form.range, via: "csr-partners-page" },
      });
      setDone(true);
    } catch {
      toast.error("Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="done"
          data-testid="csr-form-success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="rounded-3xl bg-white border border-ink/10 p-12 text-center"
        >
          <span className="mx-auto h-16 w-16 rounded-full bg-leaf-soft text-leaf inline-flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h3 className="mt-6 font-display font-extrabold text-3xl tracking-tight">Conversation started.</h3>
          <p className="mt-4 text-ink-muted leading-relaxed max-w-sm mx-auto">
            Your details are with the RC team. Expect a call within two working days to design the
            partnership.
          </p>
          <button
            data-testid="csr-form-another-btn"
            onClick={() => { setDone(false); setForm({ org: "", name: "", email: "", email2: "", phone: "", focus: "", range: "", message: "" }); }}
            className="mt-8 rounded-full border-2 border-ink/15 px-7 py-3 font-bold text-sm hover:border-flame hover:text-flame transition-colors"
          >
            Send Another Enquiry
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-white border border-ink/10 p-8 space-y-4"
        >
          <input data-testid="csr-form-org" className={inputCls} placeholder="Organisation name" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <input data-testid="csr-form-name" className={inputCls} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input data-testid="csr-form-email" type="email" className={inputCls} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input data-testid="csr-form-email-confirm" type="email" className={inputCls} placeholder="Re-enter email" value={form.email2} onChange={(e) => setForm({ ...form, email2: e.target.value })} />
            <input data-testid="csr-form-phone" className={inputCls} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <select data-testid="csr-form-focus" className={inputCls} value={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.value })}>
              <option value="">CSR focus area…</option>
              <option>Education</option>
              <option>Girl child education</option>
              <option>Skill development</option>
              <option>Health & education combined</option>
              <option>Other</option>
            </select>
            <select data-testid="csr-form-range" className={inputCls} value={form.range} onChange={(e) => setForm({ ...form, range: e.target.value })}>
              <option value="">Indicative contribution range…</option>
              <option>₹1L – ₹5L</option>
              <option>₹5L – ₹25L</option>
              <option>₹25L – ₹1Cr</option>
              <option>Above ₹1Cr</option>
            </select>
          </div>
          <textarea data-testid="csr-form-message" rows={4} className={inputCls} placeholder="Anything we should know before the call? (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button
            data-testid="csr-form-submit-btn"
            onClick={submit}
            disabled={busy}
            className="w-full rounded-full bg-leaf py-4 font-bold text-white transition-colors duration-300 hover:bg-leaf-dark disabled:opacity-40"
          >
            {busy ? "Sending…" : "Request a Call from the RC Team"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CSR_LOGOS = [
  "Paharpur Foundation",
  "Rojo Integrations",
  "Kolkata International Womens Club",
  "Nomura Research Institute",
  "Cogfree",
  "ISG",
  "RDB Group",
  "Sushila Birla Girls' School",
  "Wesman",
  "Ivy League House",
];

const CSR_PHOTOS = [
  "Corporate volunteer day group photo with scholars",
  "Guests and team at a partner evening event",
  "Scholars and mentors at the Cisco office visit",
  "Scholars at a live cooking counter with a chef",
  "Scholars receiving certificates at a partner celebration",
  "Students with certificates at a partner school event",
  "Children at a partner store visit with staff",
  "A career workshop session for scholars at a partner office",
];

export const CredibilityGrid = () => (
  <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {CREDENTIALS.map((c, i) => (
      <Reveal key={c.title} delay={i * 0.06}>
        <div data-testid={c.testid} className="h-full rounded-2xl bg-white border border-ink/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-leaf/40">
          <c.icon className="h-6 w-6 text-leaf" />
          <p className="mt-4 font-display font-bold">{c.title}</p>
          <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">{c.desc}</p>
        </div>
      </Reveal>
    ))}
  </div>
);

const CsrPartners = () => (
  <main data-testid="csr-partners-page">
    <section className="pt-44 sm:pt-60 pb-16 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal>
          <h1
            data-testid="csr-header"
            className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
          >
            A Win-Win Partnership
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            data-testid="csr-subheader"
            className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight"
          >
            More Than a Donation. A Relationship.
          </p>
        </Reveal>
        <div className="mt-10 space-y-6">
          {PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={0.18 + i * 0.06}>
              <p data-testid={`csr-paragraph-${i}`} className="text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
        <div data-testid="csr-logo-grid" className="mt-14 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {CSR_LOGOS.map((name, i) => (
            <Reveal key={name} delay={0.05 + i * 0.04}>
              <div
                data-testid={`csr-logo-${i + 1}`}
                className="rounded-2xl border border-ink/10 bg-white aspect-[5/3] flex items-center justify-center p-4 transition-all duration-300 hover:-translate-y-1 hover:border-leaf/40"
              >
                <img src={`/assets/csr-logo-${i + 1}.jpg`} alt={`${name} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
            </Reveal>
          ))}
        </div>
        <div data-testid="csr-photo-grid" className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CSR_PHOTOS.map((alt, i) => (
            <Reveal key={i} delay={0.04 + i * 0.04}>
              <div
                data-testid={`csr-photo-${i + 1}`}
                className="group aspect-[4/3] overflow-hidden rounded-lg bg-white border border-ink/10"
              >
                <img
                  src={`/assets/csr-photo-${i + 1}.jpg`}
                  alt={alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          <Reveal><Eyebrow>Contact Form</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 mb-10 font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink">
              Start the conversation.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <CsrForm />
          </Reveal>
        </div>
      </div>
    </section>

    <section className="pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <Reveal><Eyebrow>Your Side, Made Easy</Eyebrow></Reveal>
        <CredibilityGrid />
      </div>
    </section>
  </main>
);

export default CsrPartners;
