import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Gem, ShieldCheck, CheckCircle2, BookOpen, HeartPulse, Music, CalendarDays, Clock } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Eyebrow, EASE } from "@/components/Reveal";
import { CONVERSATION_THRESHOLD } from "@/data/content";
import { CredibilityGrid } from "@/pages/CsrPartners";
import { submitInquiry, getDonationConfig, createDonationOrder, verifyDonation, loadRazorpay } from "@/lib/api";

const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

const GIFT_CARDS = [
  { amount: 10000, icon: BookOpen, desc: "Helps a scholar keep up with after-school tuition at our community center for a term." },
  { amount: 15000, icon: HeartPulse, desc: "Helps cover health check-ups and hygiene supplies for a scholar and their family." },
  { amount: 25000, icon: Music, desc: "Helps fund a scholar's music, art, dance and sports classes through the year." },
  { amount: 35000, icon: CalendarDays, desc: "Covers about a month of a scholar's fully managed year, from school and tuition to healthcare and activities." },
  { amount: 50000, icon: Clock, desc: "Covers about six weeks of a scholar's fully managed year, with school, tuition, health and activities working together." },
  { amount: 100000, icon: Gem, desc: "Funds a full quarter of a scholar's year, with a dedicated RC contact for your questions and impact updates.", badge: "GIVING DESK" },
];

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-flame placeholder:text-ink-muted/60";

const YEARLY_COST = "₹3,25,000";

const PROGRAMS = [
  { label: "Tuition, admission & exam fees", amount: "₹70,500", pct: 22, desc: "School and college tuition, admission and first-year fees, exams", color: "#166534" },
  { label: "Accommodation", amount: "₹32,500", pct: 10, desc: "Hostel and PG housing for college students studying away from home", color: "#15803D" },
  { label: "Mentorship & coaching", amount: "₹30,000", pct: 9, desc: "Tutors, mentors, coaching and English classes", color: "#16A34A" },
  { label: "Devices, books, uniforms & transport", amount: "₹29,000", pct: 9, desc: "Laptops and phones, books, uniforms, stationery, local travel", color: "#22C55E" },
  { label: "Nutrition, meals & hygiene", amount: "₹25,500", pct: 8, desc: "Nutrition support, meals and hygiene supplies", color: "#4ADE80" },
  { label: "AimGame", amount: "₹23,000", pct: 7, desc: "Game-based sessions on core values and life skills", color: "#86EFAC" },
  { label: "Student stipends & connectivity", amount: "₹17,000", pct: 5, desc: "Monthly stipend, phone recharge for online learning, Student of the Month bonus", color: "#BBF7D0" },
];

const OPERATIONS = [
  { label: "Staff & city teams", amount: "₹68,500", pct: 21.1, desc: "City directors, coordinators and program staff, plus year-end bonus", color: "#C2410C" },
  { label: "Community centers", amount: "₹20,000", pct: 6.2, desc: "Rent, electricity, internet and cleaning supplies for the Kolkata and Pune centers", color: "#EA580C" },
  { label: "Fundraising & outreach", amount: "₹5,000", pct: 1.5, desc: "Donor outreach, brochures, website, branding", color: "#F97316" },
  { label: "Legal, audit & compliance", amount: "₹3,000", pct: 0.9, desc: "Annual audit, CSR certificates, tax and society filings", color: "#FB923C" },
  { label: "Accounting, banking & admin", amount: "₹1,000", pct: 0.3, desc: "Bookkeeping, payment and bank fees, office supplies", color: "#FDBA74" },
];

const COST_BREAKDOWN = [...PROGRAMS, ...OPERATIONS];

const DONATION_TERMS = [
  "AimGame is the flagship program of Responsible Charity Society. All donations are received by Responsible Charity Society, the registered Indian NGO, and receipts are issued in its name.",
  "We do not accept cash donations.",
  "We accept donations only in Indian Rupees (INR), from within India.",
  "Donations are eligible for deduction under Section 80G. Every gift gets a receipt, and a Form 10BE certificate follows once our annual statement is filed.",
  "For a bank transfer or cheque, request our details through the form on this page, then email your amount, date and transaction reference to donations@responsiblecharity.org.",
  "Donations are non-refundable, except duplicate or mistaken payments reported within three days. Gifts we cannot record because donor details are missing are returned to the source account.",
  "Responsible Charity Society is registered to undertake CSR activities (CSR Registration No. CSR00050572).",
];

const Donut = () => {
  const r = 70;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 200 200" className="h-52 w-52 sm:h-60 sm:w-60 shrink-0" data-testid="cost-pie-chart">
      <circle cx="100" cy="100" r={r} fill="none" stroke="#F3EFEA" strokeWidth="26" />
      {COST_BREAKDOWN.map((s) => {
        const len = (s.pct / 100) * c;
        const gap = len > 8 ? 2 : 0;
        const el = (
          <circle
            key={s.label}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="26"
            strokeDasharray={`${len - gap} ${c - len + gap}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 100 100)"
          />
        );
        offset += len;
        return el;
      })}
      <text x="100" y="94" textAnchor="middle" fontSize="17" fontWeight="800" fill="#0F172A" fontFamily="Poppins, sans-serif">
        {YEARLY_COST}
      </text>
      <text x="100" y="118" textAnchor="middle" fontSize="7.5" fill="#475569" letterSpacing="1" fontFamily="JetBrains Mono, monospace">
        PER SCHOLAR / YEAR
      </text>
    </svg>
  );
};

const BreakdownList = ({ title, total, pct, titleColor, items, testid }) => (
  <div data-testid={testid} className="mt-8">
    <p className={`font-display font-extrabold text-lg ${titleColor}`}>
      {title}: {total} <span className="text-ink-muted font-bold">({pct})</span>
    </p>
    <ul className="mt-4 space-y-4">
      {items.map((s) => (
        <li key={s.label} className="flex gap-3">
          <span className="mt-1.5 h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-bold text-sm text-ink">{s.label}</p>
              <p className="font-mono text-sm font-bold text-ink shrink-0">
                {s.amount} <span className="ml-1 font-normal text-ink-muted">{s.pct}%</span>
              </p>
            </div>
            <p className="mt-0.5 text-xs text-ink-muted leading-relaxed">{s.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const CostPanel = () => (
  <div data-testid="donate-cost-panel" className="rounded-3xl bg-white border border-ink/10 p-8 sm:p-10 h-full">
    <h3 data-testid="cost-panel-title" className="font-display font-extrabold tracking-tight text-2xl sm:text-3xl text-leaf">
      {YEARLY_COST} <span className="text-ink">- Annual Cost Per Scholarship</span>
    </h3>
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-8">
      <Donut />
      <div className="w-full">
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full shrink-0 bg-leaf" />
            <div>
              <p className="text-sm text-ink-muted">Programs</p>
              <p className="font-mono font-bold text-2xl text-ink">₹2,27,500 <span className="text-base font-normal text-ink-muted">70%</span></p>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full shrink-0 bg-flame" />
            <div>
              <p className="text-sm text-ink-muted">Operations</p>
              <p className="font-mono font-bold text-2xl text-ink">₹97,500 <span className="text-base font-normal text-ink-muted">30%</span></p>
            </div>
          </li>
        </ul>
        <div data-testid="cost-split-bar" className="mt-6 h-2.5 w-full rounded-full overflow-hidden flex">
          <span className="bg-leaf h-full" style={{ width: "70%" }} />
          <span className="bg-flame h-full" style={{ width: "30%" }} />
        </div>
      </div>
    </div>
    <BreakdownList title="Programs" total="₹2,27,500" pct="70%" titleColor="text-leaf" items={PROGRAMS} testid="cost-programs" />
    <BreakdownList title="Operations" total="₹97,500" pct="30%" titleColor="text-flame" items={OPERATIONS} testid="cost-operations" />
  </div>
);

const StepAmount = ({ amount, setAmount, onContinue, onGivingDesk, busy }) => {
  const aboveThreshold = Number(amount) >= CONVERSATION_THRESHOLD;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
      <div className="space-y-3">
        {GIFT_CARDS.map((g) => {
          const selected = Number(amount) === g.amount;
          return (
            <button
              key={g.amount}
              data-testid={`gift-card-${g.amount}`}
              onClick={() => setAmount(String(g.amount))}
              className={`w-full rounded-2xl border p-4 sm:p-5 flex items-center gap-4 text-left transition-all duration-300 ${
                selected ? "border-flame bg-flame/5 shadow-[0_12px_30px_-18px_rgba(232,73,15,0.5)]" : "bg-white border-ink/12 hover:border-flame/50"
              }`}
            >
              <span className={`h-11 w-11 rounded-xl inline-flex items-center justify-center shrink-0 transition-colors duration-300 ${selected ? "bg-flame text-white" : "bg-leaf-soft text-leaf"}`}>
                <g.icon className="h-5 w-5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-semibold text-ink leading-snug">{g.desc}</span>
                <span className="mt-1 block font-mono text-sm font-bold text-flame">{inr(g.amount)}{g.amount >= CONVERSATION_THRESHOLD ? "+" : ""}</span>
              </span>
              {g.badge && (
                <span className="shrink-0 rounded-full border border-gold/60 bg-gold/10 px-3 py-1 font-mono text-[9px] tracking-[0.15em] font-bold text-gold">
                  {g.badge}
                </span>
              )}
              {selected && <CheckCircle2 className="h-5 w-5 text-flame shrink-0" />}
            </button>
          );
        })}
      </div>
      <p data-testid="amount-tax-note" className="mt-5 rounded-xl bg-leaf-soft border border-leaf/15 text-leaf-dark text-xs px-4 py-3 leading-relaxed">
        Indian tax law requires us to record who every donation comes from. A donation we can't link to a named
        donor can be taxed heavily, which would take money away from our students. So we can accept gifts only
        with your full name, address and PAN No.
      </p>
      {aboveThreshold && (
        <p data-testid="threshold-notice" className="mt-4 rounded-xl bg-leaf-soft text-leaf-dark text-sm font-semibold px-4 py-3 text-center">
          Online checkout covers gifts up to {inr(CONVERSATION_THRESHOLD)} — larger gifts go through our Giving Desk by direct bank transfer, so no gateway fee comes out of your gift.
        </p>
      )}
      <button
        data-testid="amount-continue-btn"
        disabled={busy}
        onClick={onContinue}
        className="mt-6 w-full inline-flex items-center justify-center gap-3 rounded-full bg-flame py-5 font-display font-extrabold text-lg tracking-wide text-white uppercase transition-colors duration-300 hover:bg-flame-dark disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Donate
        <ArrowRight className="h-5 w-5" />
      </button>
      <p className="mt-4 text-center text-xs text-ink-muted leading-relaxed">
        Donations are accepted in INR from within India and are non-refundable. Eligible for 80G deduction.
        We need your full name, address and PAN No. to issue your receipt.{" "}
        <a href="#donation-terms" data-testid="amount-terms-link" className="font-bold text-flame hover:text-flame-dark transition-colors">
          Read the full donation terms.
        </a>
      </p>
      <p className="mt-5 text-center">
        <button
          data-testid="amount-banktransfer-link"
          onClick={onGivingDesk}
          className="inline-flex items-center gap-2 rounded-full border-2 border-leaf bg-leaf-soft px-7 py-3.5 text-base font-extrabold text-leaf transition-colors duration-300 hover:bg-leaf hover:text-white"
        >
          Prefer a bank transfer or UPI? Request our details.
        </button>
      </p>
    </motion.div>
  );
};

const StepPayment = ({ amount, form, setForm, onPay, onPaid, onBack, busy, setBusy }) => {
  const [live, setLive] = useState(false);

  useEffect(() => {
    getDonationConfig()
      .then((r) => setLive(Boolean(r.data.enabled)))
      .catch(() => setLive(false));
  }, []);

  const payLive = async () => {
    if (form.email.trim().toLowerCase() !== form.email2.trim().toLowerCase()) {
      toast.error("Email addresses do not match.");
      return;
    }
    setBusy(true);
    try {
      await loadRazorpay();
      const res = await createDonationOrder({ amount, name: form.name, email: form.email, phone: form.phone });
      const rzp = new window.Razorpay({
        key: res.data.key_id,
        amount: res.data.amount,
        currency: "INR",
        name: "Responsible Charity Society",
        description: "AimGame — Life-Changing Scholarships",
        order_id: res.data.order_id,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#E8490F" },
        handler: async (resp) => {
          try {
            await verifyDonation({
              order_id: resp.razorpay_order_id,
              payment_id: resp.razorpay_payment_id,
              signature: resp.razorpay_signature,
            });
            onPaid();
          } catch {
            toast.error("Payment received but verification failed. Our team has been notified.");
          }
        },
      });
      rzp.open();
    } catch {
      toast.error("Could not start the payment. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
      <div className="rounded-2xl bg-white border border-ink/10 overflow-hidden">
        <div className="bg-night text-sand px-6 py-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-flame font-bold">
              {live ? "SECURE PAYMENT VIA RAZORPAY" : "SIMULATED PAYMENT"}
            </p>
            <p className="mt-1 font-display font-extrabold text-3xl">{inr(amount)}</p>
          </div>
          <ShieldCheck className="h-8 w-8 text-leaf" />
        </div>
        <div className="p-6 space-y-4">
          <input data-testid="pay-name" className={inputCls} placeholder="Full name (as on PAN, for 80G receipt)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input data-testid="pay-email" type="email" className={inputCls} placeholder="Email for receipt" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input data-testid="pay-email-confirm" type="email" className={inputCls} placeholder="Re-enter email" value={form.email2} onChange={(e) => setForm({ ...form, email2: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <input data-testid="pay-phone" className={inputCls} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          {!live && (
            <div className="rounded-xl border border-dashed border-ink/20 p-4 space-y-3 bg-sand-deep/50">
              <input data-testid="pay-card-number" className={inputCls} placeholder="Card number (simulation)" maxLength={19} value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input data-testid="pay-card-expiry" className={inputCls} placeholder="MM / YY" maxLength={7} value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
                <input data-testid="pay-card-cvv" className={inputCls} placeholder="CVV" maxLength={4} type="password" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} />
              </div>
            </div>
          )}
          <button
            data-testid="pay-submit-btn"
            onClick={live ? payLive : onPay}
            disabled={busy || !form.name || !form.email}
            className="w-full rounded-full bg-flame py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark disabled:opacity-40"
          >
            {busy ? "Processing…" : live ? `Pay ${inr(amount)} — UPI, Cards, Netbanking` : `Pay ${inr(amount)} (simulated)`}
          </button>
          <p className="text-center text-xs text-ink-muted">
            {live
              ? "Secure checkout by Razorpay · Received by Responsible Charity Society · 80G certified since 2012."
              : "Demo checkout — no real charge. Received by Responsible Charity Society · 80G certified since 2012."}
          </p>
        </div>
      </div>
      <button data-testid="pay-back-btn" onClick={onBack} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink transition-colors">
        <ArrowLeft className="h-4 w-4" /> Change amount
      </button>
    </motion.div>
  );
};

const StepGivingDesk = ({ form, setForm, onSubmit, onBack, busy }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
    <div data-testid="priority-giving-box" className="rounded-2xl bg-leaf-soft border border-leaf/20 p-6">
      <p className="font-mono text-[10px] tracking-[0.25em] text-leaf font-bold">PRIORITY GIVING</p>
      <h3 className="mt-2 font-display font-extrabold text-2xl tracking-tight">
        Giving {inr(CONVERSATION_THRESHOLD)} or more?
      </h3>
      <p className="mt-3 text-sm text-leaf-dark/80 leading-relaxed">
        We'll pair you with a dedicated contact at RC who answers your questions quickly, walks you through
        where your gift goes, and arranges your gift by direct bank transfer, so no payment-gateway fee comes
        out of it. Your 80G receipt and impact updates are handled personally.
      </p>
    </div>
    <div className="mt-5 rounded-2xl bg-white border border-ink/10 p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input data-testid="desk-name" className={inputCls} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input data-testid="desk-org" className={inputCls} placeholder="Organisation (optional)" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input data-testid="desk-email" type="email" className={inputCls} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input data-testid="desk-email-confirm" type="email" className={inputCls} placeholder="Re-enter email" value={form.email2} onChange={(e) => setForm({ ...form, email2: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input data-testid="desk-phone" className={inputCls} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <select data-testid="desk-method" className={inputCls} value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
          <option value="">Preferred contact method…</option>
          <option>Phone call</option>
          <option>WhatsApp</option>
          <option>Email</option>
        </select>
        <select data-testid="desk-range" className={inputCls} value={form.range} onChange={(e) => setForm({ ...form, range: e.target.value })}>
          <option value="">Approximate gift range…</option>
          <option>₹1L – ₹5L</option>
          <option>₹5L – ₹25L</option>
          <option>₹25L – ₹1Cr</option>
          <option>Above ₹1Cr</option>
        </select>
      </div>
      <textarea data-testid="desk-note" rows={3} className={inputCls} placeholder="A note for the Giving Desk (optional)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
      <button
        data-testid="giving-desk-submit-btn"
        onClick={onSubmit}
        disabled={busy || !form.name || !form.email}
        className="w-full rounded-full bg-leaf py-4 font-bold text-white transition-colors duration-300 hover:bg-leaf-dark disabled:opacity-40"
      >
        {busy ? "Sending…" : "Talk to Our Giving Desk →"}
      </button>
    </div>
    <button data-testid="giving-desk-back-btn" onClick={onBack} className="mt-6 text-sm font-bold text-ink-muted hover:text-flame transition-colors">
      Prefer to give online? Choose any amount up to {inr(CONVERSATION_THRESHOLD)} above.
    </button>
  </motion.div>
);

const StepSuccess = ({ mode, amount, onReset }) => (
  <motion.div
    data-testid="partner-success"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: EASE }}
    className="text-center rounded-2xl bg-white border border-ink/10 p-10"
  >
    <span className="mx-auto h-16 w-16 rounded-full bg-leaf-soft text-leaf inline-flex items-center justify-center">
      <CheckCircle2 className="h-8 w-8" />
    </span>
    <h3 className="mt-6 font-display font-extrabold text-3xl tracking-tight">
      {mode === "donation" ? "Thank you. Truly." : "Conversation started."}
    </h3>
    <p className="mt-4 text-ink-muted leading-relaxed">
      {mode === "donation"
        ? `Your simulated gift of ${inr(amount)} is recorded. In production, an 80G tax receipt from Responsible Charity Society would arrive at your email.`
        : "Your details are with the RC team. Expect a call within two working days to design the partnership."}
    </p>
    <button data-testid="success-reset-btn" onClick={onReset} className="mt-8 rounded-full border-2 border-ink/15 px-7 py-3 font-bold text-sm hover:border-flame hover:text-flame transition-colors">
      Make Another Contribution
    </button>
  </motion.div>
);

const Partner = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#partners") {
      const t = setTimeout(() => {
        const el = document.getElementById("current-partners");
        if (el) {
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -150 });
          else el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  const [step, setStep] = useState("amount");
  const [amount, setAmount] = useState("25000");
  const [busy, setBusy] = useState(false);
  const [successMode, setSuccessMode] = useState("donation");
  const [payForm, setPayForm] = useState({ name: "", email: "", email2: "", phone: "", card: "", expiry: "", cvv: "" });
  const [deskForm, setDeskForm] = useState({ name: "", org: "", email: "", email2: "", phone: "", method: "", range: "", note: "" });

  const continueAmount = () => {
    if (Number(amount) >= CONVERSATION_THRESHOLD) setStep("givingdesk");
    else setStep("payment");
  };

  const doPay = async () => {
    if (payForm.email.trim().toLowerCase() !== payForm.email2.trim().toLowerCase()) {
      toast.error("Email addresses do not match.");
      return;
    }
    setBusy(true);
    try {
      await submitInquiry({
        kind: "donation",
        name: payForm.name,
        email: payForm.email,
        phone: payForm.phone,
        amount: Number(amount),
        meta: { simulated: true },
      });
      setStep("success");
      setSuccessMode("donation");
    } catch {
      toast.error("Could not record the donation. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const doDesk = async () => {
    if (deskForm.email.trim().toLowerCase() !== deskForm.email2.trim().toLowerCase()) {
      toast.error("Email addresses do not match.");
      return;
    }
    setBusy(true);
    try {
      await submitInquiry({
        kind: "hni",
        name: deskForm.name,
        email: deskForm.email,
        phone: deskForm.phone,
        org: deskForm.org,
        message: deskForm.note,
        amount: Number(amount),
        meta: { method: deskForm.method, range: deskForm.range, via: "giving-desk" },
      });
      setStep("success");
      setSuccessMode("conversation");
    } catch {
      toast.error("Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setStep("amount");
    setAmount("25000");
    setSuccessMode("donation");
    setPayForm({ name: "", email: "", email2: "", phone: "", card: "", expiry: "", cvv: "" });
    setDeskForm({ name: "", org: "", email: "", email2: "", phone: "", method: "", range: "", note: "" });
  };

  return (
    <main data-testid="partner-page">
      <section className="pt-44 sm:pt-60 pb-12 relative overflow-hidden grain">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <Reveal>
            <h1 className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase" data-testid="donate-header">
              Donate Today and Be Part of the Journey
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p data-testid="donate-subheader" className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight">
              Every gift becomes part of a scholar's 15-year path out of poverty.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p data-testid="donate-intro" className="mt-5 text-leaf font-semibold text-xl sm:text-2xl leading-relaxed">
              Every scholar's journey is carried by people who chose to be part of it. See what one year takes
              on the left, then choose how you'd like to give on the right. Every gift comes with an 80G
              receipt.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-6 text-xl sm:text-2xl text-ink font-semibold leading-relaxed">
              Giving on behalf of a company?{" "}
              <Link
                to="/csr-partners"
                data-testid="donate-csr-link"
                className="inline-flex items-center gap-1 font-bold text-flame transition-colors hover:text-flame-dark"
              >
                Let's talk about a CSR partnership <ArrowUpRight className="h-5 w-5" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid lg:grid-cols-2 gap-8 items-stretch">
          <Reveal className="h-full"><CostPanel /></Reveal>
          <Reveal delay={0.1} className="h-full">
            <div
              data-testid="donate-widget"
              className="h-full rounded-3xl bg-white border-2 border-flame/25 p-6 sm:p-8 shadow-[0_30px_70px_-30px_rgba(232,73,15,0.3)]"
            >
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  {step === "amount" && (
                    <StepAmount amount={amount} setAmount={setAmount} onContinue={continueAmount} onGivingDesk={() => setStep("givingdesk")} busy={busy} />
                  )}
                  {step === "payment" && (
                    <StepPayment amount={Number(amount)} form={payForm} setForm={setPayForm} onPay={doPay} onPaid={() => setStep("success")} onBack={() => setStep("amount")} busy={busy} setBusy={setBusy} />
                  )}
                  {step === "givingdesk" && (
                    <StepGivingDesk form={deskForm} setForm={setDeskForm} onSubmit={doDesk} onBack={() => setStep("amount")} busy={busy} />
                  )}
                  {step === "success" && <StepSuccess mode={successMode} amount={Number(amount)} onReset={reset} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="donation-terms" className="pb-16 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <Reveal>
            <div data-testid="donation-terms" className="rounded-3xl bg-white border border-ink/10 p-8 sm:p-10">
              <p data-testid="donation-terms-intro" className="text-leaf font-semibold text-lg leading-relaxed">
                Indian tax law requires us to record every donor's name, address and PAN No., for every way of
                giving, including UPI and bank transfers. A gift we can't link to a named donor can be taxed
                heavily, which would take money from our students. We use your details only for receipts and
                legal reporting, and we keep them secure.
              </p>
              <ul className="mt-6 space-y-2.5">
                {DONATION_TERMS.map((t, i) => (
                  <li key={i} data-testid={`donation-term-${i}`} className="flex items-start gap-3 text-sm text-ink-muted leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-leaf" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
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
};

export default Partner;
