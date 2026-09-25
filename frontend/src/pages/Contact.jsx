import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, CheckCircle2, HeartHandshake, HandHelping, Briefcase, Mail } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Eyebrow, EASE } from "@/components/Reveal";
import { submitInquiry } from "@/lib/api";

const TOPICS = [
  { id: "partnership", icon: HeartHandshake, label: "Partner / Donate", kind: "csr", hint: "CSR, HNI or large gifts — routed to the partnerships desk." },
  { id: "volunteer", icon: HandHelping, label: "Volunteer", kind: "volunteer", hint: "Teaching, mentoring, field support — routed to the program team." },
  { id: "career", icon: Briefcase, label: "Work With Us", kind: "career", hint: "Roles across program ops and fundraising — routed to hiring." },
  { id: "general", icon: Mail, label: "General", kind: "general", hint: "Everything else — routed to the RC Society office." },
];

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-flame placeholder:text-ink-muted/60";

const Contact = () => {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", org: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const t = searchParams.get("topic");
    const found = TOPICS.find((x) => x.id === t);
    if (found) setTopic(found);
  }, [searchParams]);

  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -140 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill your name, email and message.");
      return;
    }
    setBusy(true);
    try {
      await submitInquiry({ kind: topic.kind, ...form, meta: { topic: topic.label, via: "contact-page" } });
      setDone(true);
    } catch {
      toast.error("Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main data-testid="contact-page">
      <section className="pt-44 sm:pt-60 pb-16 relative overflow-hidden grain">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <Reveal>
            <h1
              data-testid="contact-header"
              className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
            >
              Let's Talk
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              data-testid="contact-subheader"
              className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight"
            >
              Before we do, let's make sure we're the right fit.
            </p>
          </Reveal>

          <div className="mt-10 max-w-4xl space-y-6">
            <Reveal delay={0.18}>
              <p data-testid="contact-description-1" className="text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
                We're not chasing every donation, we're building long-term partnerships with people and
                organizations ready to walk a decade-long journey with us, from a child's first day in our
                program to their college graduation. That kind of commitment takes real focus, and we'd
                rather give our full attention to fewer, stronger relationships than spread ourselves thin.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p data-testid="contact-description-2" className="text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
                Because of that, we work with a starting threshold for support: ₹10,000 for individual
                donors and ₹1,00,000 for CSR partners. If that sounds like you, we'd love to talk.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 max-w-4xl space-y-4">
            <Reveal delay={0.3}>
              <div data-testid="contact-fit-individual" className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-white border border-ink/10 px-6 py-5">
                <p className="flex-1 min-w-[240px] font-semibold text-ink text-base sm:text-lg">
                  Are you an individual looking to support our work?
                </p>
                <button
                  data-testid="contact-continue-below-btn"
                  onClick={scrollToForm}
                  className="group inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-flame-dark"
                >
                  Continue below
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.36}>
              <div data-testid="contact-fit-csr" className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-white border border-ink/10 px-6 py-5">
                <p className="flex-1 min-w-[240px] font-semibold text-ink text-base sm:text-lg">
                  Are you a CSR Director, Corporate Owner, or Representative?
                </p>
                <Link
                  to="/csr-partners"
                  data-testid="contact-csr-link"
                  className="group inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-leaf-dark"
                >
                  Visit our CSR Partners page
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.42}>
              <div data-testid="contact-fit-internships" className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-white border border-ink/10 px-6 py-5">
                <p className="flex-1 min-w-[240px] font-semibold text-ink text-base sm:text-lg">
                  And if you're interested in our internship opportunities,
                </p>
                <Link
                  to="/internships"
                  data-testid="contact-internships-link"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-leaf/30 px-5 py-2 text-sm font-bold text-leaf transition-colors duration-300 hover:border-leaf hover:bg-leaf hover:text-white"
                >
                  visit our Internships page
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="contact-form" className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl">
            <Reveal><Eyebrow>Contact Form</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink">
                Write to the right desk.
              </h2>
            </Reveal>
          </div>

          <div className="mt-10 max-w-3xl">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  data-testid="contact-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="rounded-3xl bg-white border border-ink/10 p-12 text-center"
                >
                  <span className="mx-auto h-16 w-16 rounded-full bg-leaf-soft text-leaf inline-flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display font-extrabold text-3xl tracking-tight">Routed.</h3>
                  <p className="mt-4 text-ink-muted leading-relaxed max-w-sm mx-auto">
                    Your message is with the {topic.label.toLowerCase()} desk. Expect a reply within two
                    working days.
                  </p>
                  <button
                    data-testid="contact-another-btn"
                    onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", org: "", message: "" }); }}
                    className="mt-8 rounded-full border-2 border-ink/15 px-7 py-3 font-bold text-sm hover:border-flame hover:text-flame transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TOPICS.map((t) => (
                      <button
                        key={t.id}
                        data-testid={`contact-topic-${t.id}`}
                        onClick={() => setTopic(t)}
                        className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                          topic.id === t.id ? "bg-night text-sand border-night" : "bg-white border-ink/10 hover:border-flame/40"
                        }`}
                      >
                        <t.icon className={`h-5 w-5 ${topic.id === t.id ? "text-flame" : "text-leaf"}`} />
                        <p className="mt-3 font-bold text-sm leading-tight">{t.label}</p>
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-ink-muted" data-testid="contact-topic-hint">{topic.hint}</p>

                  <div className="mt-6 rounded-3xl bg-white border border-ink/10 p-8 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input data-testid="contact-name" className={inputCls} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      <input data-testid="contact-email" type="email" className={inputCls} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input data-testid="contact-phone" className={inputCls} placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                      <input data-testid="contact-org" className={inputCls} placeholder="Organisation (optional)" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
                    </div>
                    <textarea data-testid="contact-message" rows={5} className={inputCls} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    <button
                      data-testid="contact-submit-btn"
                      onClick={submit}
                      disabled={busy}
                      className="w-full rounded-full bg-flame py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark disabled:opacity-40"
                    >
                      {busy ? "Sending…" : `Send to the ${topic.label} Desk`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
