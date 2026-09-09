import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, HeartHandshake, HandHelping, Briefcase, Mail } from "lucide-react";
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
      <section className="pt-32 lg:pt-44 pb-24 lg:pb-32 relative overflow-hidden grain">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>Contact</Eyebrow></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl">
                The right inbox, <span className="text-flame">first time.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-ink-muted leading-relaxed text-base sm:text-lg max-w-md">
                No generic catch-all. Choose why you're writing and your message lands with the person who
                can act on it — partnerships, program, hiring or the office.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-10 rounded-2xl bg-leaf-soft border border-leaf/15 p-6">
                <p className="font-mono text-[10px] tracking-[0.3em] text-leaf font-bold">RESPONSE TIME</p>
                <p className="mt-2 font-display font-bold text-lg text-leaf-dark">Within two working days.</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
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
