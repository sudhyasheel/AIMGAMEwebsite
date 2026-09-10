import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, User, Gem, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Eyebrow, EASE } from "@/components/Reveal";
import { PARTNERS, MIN_DONATION, CONVERSATION_THRESHOLD } from "@/data/content";
import { submitInquiry } from "@/lib/api";

const PRESETS = [1000, 2500, 5000, 10000, 25000];
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-flame placeholder:text-ink-muted/60";

const TYPES = [
  { id: "individual", icon: User, title: "Individual Donor", desc: `Direct giving from ${inr(MIN_DONATION)}. 80G tax receipt issued.`, testid: "donor-type-individual" },
  { id: "csr", icon: Building2, title: "CSR / Corporate", desc: "Structured partnership with scholar-wise reporting for your board.", testid: "donor-type-csr" },
  { id: "hni", icon: Gem, title: "High-Net-Worth Individual", desc: "Sponsor full fifteen-year arcs with dedicated impact reporting.", testid: "donor-type-hni" },
];

const StepType = ({ onPick }) => (
  <div className="grid md:grid-cols-3 gap-5">
    {TYPES.map((t, i) => (
      <motion.button
        key={t.id}
        data-testid={t.testid}
        onClick={() => onPick(t.id)}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
        className="group rounded-3xl bg-white border border-ink/10 p-8 text-left transition-all duration-500 hover:border-flame/50 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(232,73,15,0.35)]"
      >
        <span className="h-12 w-12 rounded-2xl bg-leaf-soft text-leaf inline-flex items-center justify-center transition-colors duration-500 group-hover:bg-flame group-hover:text-white">
          <t.icon className="h-5 w-5" />
        </span>
        <h3 className="mt-6 font-display font-bold text-xl">{t.title}</h3>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">{t.desc}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-flame">
          Continue <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </motion.button>
    ))}
  </div>
);

const StepAmount = ({ amount, setAmount, onContinue, onBack, busy }) => {
  const aboveThreshold = Number(amount) >= CONVERSATION_THRESHOLD;
  const valid = Number(amount) >= MIN_DONATION;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="max-w-2xl mx-auto">
      <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-center">Choose an amount</h3>
      <p className="mt-3 text-center text-ink-muted text-sm">
        Minimum {inr(MIN_DONATION)} · India-based giving only · 80G receipt for every contribution
      </p>
      <div className="mt-8 grid grid-cols-3 sm:grid-cols-5 gap-3">
        {PRESETS.map((p) => (
          <button
            key={p}
            data-testid={`amount-chip-${p}`}
            onClick={() => setAmount(String(p))}
            className={`rounded-2xl border py-4 font-mono font-bold text-sm transition-all duration-300 ${
              Number(amount) === p ? "bg-flame text-white border-flame" : "bg-white border-ink/15 hover:border-flame/50"
            }`}
          >
            {inr(p)}
          </button>
        ))}
      </div>
      <input
        data-testid="amount-custom-input"
        type="number"
        min={MIN_DONATION}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={`Custom amount (min ${inr(MIN_DONATION)})`}
        className={`${inputCls} mt-4 text-center font-mono font-bold`}
      />
      {aboveThreshold && (
        <p data-testid="threshold-notice" className="mt-4 rounded-xl bg-leaf-soft text-leaf-dark text-sm font-semibold px-4 py-3 text-center">
          Contributions of {inr(CONVERSATION_THRESHOLD)}+ begin with a conversation with our team — no online transaction.
        </p>
      )}
      <div className="mt-8 flex items-center justify-between">
        <button data-testid="amount-back-btn" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          data-testid="amount-continue-btn"
          disabled={!valid || busy}
          onClick={onContinue}
          className="inline-flex items-center gap-2 rounded-full bg-flame px-7 py-3.5 font-bold text-white transition-all duration-300 hover:bg-flame-dark disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {aboveThreshold ? "Start the Conversation" : `Continue · ${valid ? inr(amount) : ""}`}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

const StepPayment = ({ amount, form, setForm, onPay, onBack, busy }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="max-w-xl mx-auto">
    <div className="rounded-3xl bg-white border border-ink/10 overflow-hidden">
      <div className="bg-night text-sand px-8 py-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-flame font-bold">SIMULATED PAYMENT</p>
          <p className="mt-1 font-display font-extrabold text-3xl">{inr(amount)}</p>
        </div>
        <ShieldCheck className="h-8 w-8 text-leaf" />
      </div>
      <div className="p-8 space-y-4">
        <input data-testid="pay-name" className={inputCls} placeholder="Full name (as on PAN, for 80G receipt)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input data-testid="pay-email" type="email" className={inputCls} placeholder="Email for receipt" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input data-testid="pay-phone" className={inputCls} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <div className="rounded-xl border border-dashed border-ink/20 p-4 space-y-3 bg-sand-deep/50">
          <input data-testid="pay-card-number" className={inputCls} placeholder="Card number (simulation)" maxLength={19} value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input data-testid="pay-card-expiry" className={inputCls} placeholder="MM / YY" maxLength={7} value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
            <input data-testid="pay-card-cvv" className={inputCls} placeholder="CVV" maxLength={4} type="password" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} />
          </div>
        </div>
        <button
          data-testid="pay-submit-btn"
          onClick={onPay}
          disabled={busy || !form.name || !form.email}
          className="w-full rounded-full bg-flame py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark disabled:opacity-40"
        >
          {busy ? "Processing…" : `Pay ${inr(amount)} (simulated)`}
        </button>
        <p className="text-center text-xs text-ink-muted">
          Demo checkout — no real charge. Received by Responsible Charity Society · 80G certified since 2012.
        </p>
      </div>
    </div>
    <button data-testid="pay-back-btn" onClick={onBack} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink transition-colors">
      <ArrowLeft className="h-4 w-4" /> Change amount
    </button>
  </motion.div>
);

const StepQualify = ({ kind, form, setForm, onSubmit, onBack, busy }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="max-w-xl mx-auto">
    <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-center">
      {kind === "csr" ? "Let's talk CSR partnership" : "Let's talk about your gift"}
    </h3>
    <p className="mt-3 text-center text-ink-muted text-sm max-w-md mx-auto">
      No transaction here. This goes straight to the RC team, who will call you within two working days.
    </p>
    <div className="mt-8 rounded-3xl bg-white border border-ink/10 p-8 space-y-4">
      {kind === "csr" && (
        <input data-testid="qualify-org" className={inputCls} placeholder="Organisation name" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
      )}
      <input data-testid="qualify-name" className={inputCls} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <div className="grid sm:grid-cols-2 gap-4">
        <input data-testid="qualify-email" type="email" className={inputCls} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input data-testid="qualify-phone" className={inputCls} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      {kind === "csr" && (
        <select data-testid="qualify-focus" className={inputCls} value={form.focus} onChange={(e) => setForm({ ...form, focus: e.target.value })}>
          <option value="">CSR focus area…</option>
          <option>Education</option>
          <option>Girl child education</option>
          <option>Skill development</option>
          <option>Health & education combined</option>
          <option>Other</option>
        </select>
      )}
      <select data-testid="qualify-range" className={inputCls} value={form.range} onChange={(e) => setForm({ ...form, range: e.target.value })}>
        <option value="">Indicative contribution range…</option>
        <option>₹1L – ₹5L</option>
        <option>₹5L – ₹25L</option>
        <option>₹25L – ₹1Cr</option>
        <option>Above ₹1Cr</option>
      </select>
      <textarea data-testid="qualify-message" rows={3} className={inputCls} placeholder="Anything we should know before the call? (optional)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <button
        data-testid="qualify-submit-btn"
        onClick={onSubmit}
        disabled={busy || !form.name || !form.email || (kind === "csr" && !form.org)}
        className="w-full rounded-full bg-leaf py-4 font-bold text-white transition-colors duration-300 hover:bg-leaf-dark disabled:opacity-40"
      >
        {busy ? "Sending…" : "Request a Call from the RC Team"}
      </button>
    </div>
    <button data-testid="qualify-back-btn" onClick={onBack} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink-muted hover:text-ink transition-colors">
      <ArrowLeft className="h-4 w-4" /> Back
    </button>
  </motion.div>
);

const StepSuccess = ({ mode, amount, onReset }) => (
  <motion.div
    data-testid="partner-success"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: EASE }}
    className="max-w-xl mx-auto text-center rounded-3xl bg-white border border-ink/10 p-12"
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
  const [step, setStep] = useState("type");
  const [type, setType] = useState(null);
  const [amount, setAmount] = useState("2500");
  const [busy, setBusy] = useState(false);
  const [payForm, setPayForm] = useState({ name: "", email: "", phone: "", card: "", expiry: "", cvv: "" });
  const [qForm, setQForm] = useState({ org: "", name: "", email: "", phone: "", focus: "", range: "", message: "" });

  const pickType = (t) => {
    setType(t);
    setStep(t === "individual" ? "amount" : "qualify");
  };

  const continueAmount = () => {
    if (Number(amount) >= CONVERSATION_THRESHOLD) setStep("qualify");
    else setStep("payment");
  };

  const doPay = async () => {
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
    } catch {
      toast.error("Could not record the donation. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const doQualify = async () => {
    setBusy(true);
    try {
      await submitInquiry({
        kind: type === "csr" ? "csr" : "hni",
        name: qForm.name,
        email: qForm.email,
        phone: qForm.phone,
        org: qForm.org,
        message: qForm.message,
        amount: type === "individual" ? Number(amount) : null,
        meta: { focus: qForm.focus, range: qForm.range, via: "partner-flow" },
      });
      setStep("success");
    } catch {
      toast.error("Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setStep("type");
    setType(null);
    setAmount("2500");
    setPayForm({ name: "", email: "", phone: "", card: "", expiry: "", cvv: "" });
    setQForm({ org: "", name: "", email: "", phone: "", focus: "", range: "", message: "" });
  };

  const successMode = type === "individual" && Number(amount) < CONVERSATION_THRESHOLD ? "donation" : "conversation";

  return (
    <main data-testid="partner-page">
      <section className="pt-52 sm:pt-72 pb-14 relative overflow-hidden grain">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <Reveal><Eyebrow>Partner / Donate</Eyebrow></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
              A partnership, <span className="text-flame">not a passing donation.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-muted">
              Gifts are received by Responsible Charity Society, a registered Indian NGO — 80G certified since
              2012 — and fund AimGame, its flagship scholarship program. India-based giving only, with a
              minimum of {inr(MIN_DONATION)}. Larger gifts and CSR partnerships begin with a conversation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <Reveal>
            <div data-testid="current-partners-block" className="rounded-3xl bg-leaf-soft border border-leaf/15 p-8 sm:p-10">
              <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">CURRENT CSR PARTNERS</p>
              <div className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
                {PARTNERS.map((p) => (
                  <span key={p} className="font-display font-bold text-lg text-leaf-dark/70">{p}</span>
                ))}
              </div>
              <p className="mt-6 text-sm text-leaf-dark/70 max-w-2xl">
                Partners receive audited utilization reports and scholar-wise progress tracking. Join them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 lg:pb-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-center gap-2 mb-12 font-mono text-[10px] tracking-[0.25em] text-ink-muted">
            {["01 TYPE", "02 DETAILS", "03 DONE"].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className={`${(step === "type" && i === 0) || (["amount", "payment", "qualify"].includes(step) && i === 1) || (step === "success" && i === 2) ? "text-flame font-bold" : ""}`}>
                  {s}
                </span>
                {i < 2 && <span className="w-8 h-px bg-ink/20" />}
              </span>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              {step === "type" && <StepType onPick={pickType} />}
              {step === "amount" && (
                <StepAmount amount={amount} setAmount={setAmount} onContinue={continueAmount} onBack={() => setStep("type")} busy={busy} />
              )}
              {step === "payment" && (
                <StepPayment amount={Number(amount)} form={payForm} setForm={setPayForm} onPay={doPay} onBack={() => setStep("amount")} busy={busy} />
              )}
              {step === "qualify" && (
                <StepQualify kind={type === "csr" ? "csr" : "hni"} form={qForm} setForm={setQForm} onSubmit={doQualify} onBack={() => setStep(type === "individual" ? "amount" : "type")} busy={busy} />
              )}
              {step === "success" && <StepSuccess mode={successMode} amount={Number(amount)} onReset={reset} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default Partner;
