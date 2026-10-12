import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Reveal, EASE } from "@/components/Reveal";
import { submitInquiry } from "@/lib/api";

const PARAGRAPHS = [
  "Our internships are paid, and that's on purpose. We ask for real commitment and accountability, and we believe that deserves fair pay. This isn't a resume-filler or a volunteer weekend. It's real work with real students who count on you showing up.",
  "We're looking for interns who speak the local language along with English and Hindi, and who can stay at least 4 to 6 months. Most stay much longer. Some have been with us for nearly a decade, growing alongside the same students year after year and seeing what steady care really builds.",
  "In return, you'll earn a certificate, a letter of recommendation, and a place in a warm community that gathers, celebrates, and feels like an extended family. You'll also get the joy of watching a child's whole path change because you kept showing up.",
  "Questions are best sent by email. We don't take calls or unscheduled visits. Orientation is held monthly in Kolkata and Pune.",
];

const INTERN_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1771577125646-b38ed7b14411?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHw0fHxJbmRpYW4lMjB2b2x1bnRlZXIlMjB0ZWFjaGluZyUyMGNoaWxkcmVuJTIwbWVudG9yfGVufDB8fHx8MTc5MTgxMjM4NHww&ixlib=rb-4.1.0&q=85",
    alt: "An intern teaching children at a community center",
  },
  {
    src: "https://images.unsplash.com/photo-1777732340202-1444ea7a8bfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwzfHxJbmRpYW4lMjB2b2x1bnRlZXIlMjBwbGF5aW5nJTIwYm9hcmQlMjBnYW1lJTIwY2hpbGRyZW4lMjBzcG9ydHN8ZW58MHx8fHwxNzkxODEyMzg0fDA&ixlib=rb-4.1.0&q=85",
    alt: "An intern playing a board game with children",
  },
  {
    src: "https://images.unsplash.com/flagged/photo-1574098335395-18cf525e45d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwxfHx0dXRvcmluZyUyMG1lbnRvcmluZyUyMHNlc3Npb24lMjBJbmRpYSUyMGNoaWxkcmVuJTIwY2xhc3Nyb29tfGVufDB8fHx8MTc5MTgxMjM4NHww&ixlib=rb-4.1.0&q=85",
    alt: "A tutoring session at a community center",
  },
];

const CITIES = [
  { city: "Kolkata", email: "hrkolkata@responsiblecharity.org" },
  { city: "Pune", email: "hrpune@responsiblecharity.org" },
];

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-flame placeholder:text-ink-muted/60";

const InternshipForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill your name, email and message.");
      return;
    }
    setBusy(true);
    try {
      await submitInquiry({
        kind: "career",
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        meta: { topic: "Internship", city: form.city, via: "internships-page" },
      });
      setDone(true);
    } catch {
      toast.error("Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div data-testid="internship-form" className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="rounded-3xl bg-white border border-ink/10 p-12 text-center"
          >
            <span className="mx-auto h-16 w-16 rounded-full bg-leaf-soft text-leaf inline-flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display font-extrabold text-2xl tracking-tight">Application noted.</h3>
            <p className="mt-4 text-ink-muted leading-relaxed max-w-sm mx-auto">
              Remember: questions go through email only — write to your city's HR inbox and mention you
              applied here. Orientation happens monthly in Kolkata and Pune.
            </p>
            <button
              data-testid="internship-another-btn"
              onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", city: "", message: "" }); }}
              className="mt-8 rounded-full border-2 border-ink/15 px-7 py-3 font-bold text-sm hover:border-flame hover:text-flame transition-colors"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="rounded-3xl bg-white border border-ink/10 p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input data-testid="internship-name" className={inputCls} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input data-testid="internship-email" type="email" className={inputCls} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input data-testid="internship-phone" className={inputCls} placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <select data-testid="internship-city" className={inputCls} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                  <option value="">Preferred city…</option>
                  <option>Kolkata</option>
                  <option>Pune</option>
                </select>
              </div>
              <textarea data-testid="internship-message" rows={4} className={inputCls} placeholder="Tell us why you want to show up, consistently, for years" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button
                data-testid="internship-submit-btn"
                onClick={submit}
                disabled={busy}
                className="w-full rounded-full bg-flame py-4 font-bold text-white transition-colors duration-300 hover:bg-flame-dark disabled:opacity-40"
              >
                {busy ? "Sending…" : "Apply for the Internship"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Internships = () => (
  <main data-testid="internships-page">
    <section className="pt-44 sm:pt-60 pb-20 relative overflow-hidden grain">
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div>
          <Reveal>
            <h1
              data-testid="internships-header"
              className="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-leaf uppercase"
            >
              Show Up. Play. Teach. Repeat!
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              data-testid="internships-subheader"
              className="mt-5 font-display font-bold text-3xl sm:text-4xl text-flame tracking-tight"
            >
              Paid internships that actually mean something.
            </p>
          </Reveal>
        </div>

        <div data-testid="internships-photos" className="mt-12 grid sm:grid-cols-3 gap-4 sm:gap-6">
          {INTERN_PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={0.05 + i * 0.06}>
              <div
                data-testid={`internships-photo-${i}`}
                className="group aspect-[4/3] overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_24px_50px_-28px_rgba(15,23,42,0.25)]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          {PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.07}>
              <p data-testid={`internships-paragraph-${i}`} className="text-leaf font-semibold text-lg sm:text-xl leading-relaxed">
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 sm:gap-6">
          {CITIES.map((c, i) => (
            <Reveal key={c.city} delay={0.1 + i * 0.08}>
              <div
                data-testid={`internships-city-${c.city.toLowerCase()}`}
                className="rounded-2xl bg-white border border-ink/10 shadow-[0_14px_36px_-16px_rgba(15,23,42,0.18)] p-6 flex items-center gap-4"
              >
                <span className="h-12 w-12 rounded-xl bg-leaf-soft text-leaf inline-flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display font-bold text-lg">{c.city}</p>
                  <a
                    href={`mailto:${c.email}`}
                    data-testid={`internships-email-${c.city.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-leaf hover:text-flame transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {c.email}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="pb-24 lg:pb-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
            Ready to <span className="text-flame">show up?</span>
          </h2>
        </Reveal>
        <div className="mt-8">
          <InternshipForm />
        </div>
      </div>
    </section>
  </main>
);

export default Internships;
