import { useState } from "react";
import { Lock, RefreshCw, Inbox } from "lucide-react";
import { toast } from "sonner";
import { fetchSubmissions } from "@/lib/api";

const KIND_LABELS = {
  donation: "Donations",
  csr: "CSR Inquiries",
  hni: "HNI Inquiries",
  volunteer: "Volunteers",
  career: "Careers",
  general: "General",
};

const KIND_COLORS = {
  donation: "bg-flame text-white",
  csr: "bg-leaf text-white",
  hni: "bg-gold text-white",
  volunteer: "bg-leaf-soft text-leaf-dark",
  career: "bg-sand-deep text-ink",
  general: "bg-ink/10 text-ink",
};

const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

const Admin = () => {
  const [key, setKey] = useState(() => sessionStorage.getItem("rc_admin_key") || "");
  const [authed, setAuthed] = useState(false);
  const [subs, setSubs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState(false);

  const load = async (k) => {
    setBusy(true);
    try {
      const res = await fetchSubmissions(k);
      setSubs(res.data.submissions);
      setAuthed(true);
      sessionStorage.setItem("rc_admin_key", k);
    } catch {
      toast.error("Invalid admin key.");
      setAuthed(false);
    } finally {
      setBusy(false);
    }
  };

  if (!authed) {
    return (
      <main data-testid="admin-page" className="pt-52 sm:pt-72 pb-32 min-h-[80vh]">
        <div className="max-w-md mx-auto px-4">
          <div className="rounded-3xl bg-white border border-ink/10 p-10 text-center">
            <span className="mx-auto h-14 w-14 rounded-full bg-night text-flame inline-flex items-center justify-center">
              <Lock className="h-6 w-6" />
            </span>
            <h1 className="mt-6 font-display font-extrabold text-2xl tracking-tight">RC Team Access</h1>
            <p className="mt-2 text-sm text-ink-muted">Enter the admin key to view routed submissions.</p>
            <input
              data-testid="admin-key-input"
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load(key)}
              placeholder="Admin key"
              className="mt-6 w-full rounded-xl border border-ink/15 bg-sand px-4 py-3 text-sm outline-none focus:border-flame"
            />
            <button
              data-testid="admin-login-btn"
              onClick={() => load(key)}
              disabled={busy || !key}
              className="mt-4 w-full rounded-full bg-flame py-3.5 font-bold text-white transition-colors hover:bg-flame-dark disabled:opacity-40"
            >
              {busy ? "Checking…" : "View Submissions"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  const kinds = ["all", ...Object.keys(KIND_LABELS)];
  const filtered = filter === "all" ? subs : subs.filter((s) => s.kind === filter);

  return (
    <main data-testid="admin-dashboard" className="pt-52 sm:pt-72 pb-32 min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-leaf font-bold">RC TEAM</p>
            <h1 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
              Submissions <span className="text-flame">({subs.length})</span>
            </h1>
          </div>
          <button
            data-testid="admin-refresh-btn"
            onClick={() => load(key)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 px-5 py-2.5 text-sm font-bold hover:border-flame hover:text-flame transition-colors"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {kinds.map((k) => (
            <button
              key={k}
              data-testid={`admin-filter-${k}`}
              onClick={() => setFilter(k)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                filter === k ? "bg-night text-sand" : "bg-white border border-ink/15 text-ink-muted hover:text-ink"
              }`}
            >
              {k === "all" ? "All" : KIND_LABELS[k]}
              <span className="ml-2 opacity-60">
                {k === "all" ? subs.length : subs.filter((s) => s.kind === k).length}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          {filtered.length === 0 && (
            <div data-testid="admin-empty" className="rounded-3xl border border-dashed border-ink/20 p-16 text-center">
              <Inbox className="h-8 w-8 mx-auto text-ink-muted" />
              <p className="mt-4 font-display font-bold text-lg">No submissions yet</p>
              <p className="mt-1 text-sm text-ink-muted">New donations, CSR inquiries and messages will appear here.</p>
            </div>
          )}
          {filtered.map((s) => (
            <article
              key={s.id}
              data-testid={`admin-submission-${s.id}`}
              className="rounded-2xl bg-white border border-ink/10 p-6 grid sm:grid-cols-12 gap-4"
            >
              <div className="sm:col-span-2">
                <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold ${KIND_COLORS[s.kind] || KIND_COLORS.general}`}>
                  {KIND_LABELS[s.kind] || s.kind}
                </span>
                {s.amount != null && (
                  <p className="mt-2 font-mono font-bold text-lg text-flame">{inr(s.amount)}</p>
                )}
              </div>
              <div className="sm:col-span-3">
                <p className="font-bold">{s.name}</p>
                <p className="text-sm text-ink-muted">{s.email}</p>
                {s.phone && <p className="text-sm text-ink-muted">{s.phone}</p>}
                {s.org && <p className="text-sm font-semibold text-leaf-dark mt-1">{s.org}</p>}
              </div>
              <div className="sm:col-span-5 text-sm text-ink-muted leading-relaxed">
                {s.message && <p>{s.message}</p>}
                {s.meta && (s.meta.focus || s.meta.range) && (
                  <p className="mt-1 font-semibold text-ink">
                    {[s.meta.focus, s.meta.range].filter(Boolean).join(" · ")}
                  </p>
                )}
                {s.meta?.simulated && (
                  <p className="mt-1 text-xs font-mono text-gold font-bold">SIMULATED PAYMENT</p>
                )}
              </div>
              <div className="sm:col-span-2 text-right font-mono text-[11px] text-ink-muted">
                {new Date(s.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Admin;
