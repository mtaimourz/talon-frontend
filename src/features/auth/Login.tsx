import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CyberBackground } from "@/components/CyberBackground";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text relative overflow-hidden">
      <CyberBackground />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-border bg-surface p-8 relative z-10 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
      >
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        <img src="/nayatel-logo.png" alt="Nayatel" className="h-6 w-auto mb-6" />

        <div className="mb-8">
          <div className="font-disp font-extrabold text-2xl tracking-tight">Nayatel SecOps</div>
          <div className="font-mono text-[9.5px] uppercase tracking-[.15em] text-text-3 mt-1">
            Security Operations Portal
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-accent bg-[var(--accent-wash)] border border-accent/25 rounded px-1.5 py-0.5">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Talon
          </div>
        </div>

        <label className="block font-mono text-[11px] uppercase tracking-wider text-text-3 mb-1">
          Username
        </label>
        <input
          className="w-full mb-4 bg-surface-2 border border-border px-3 py-2 font-mono text-sm outline-none focus:border-accent"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />

        <label className="block font-mono text-[11px] uppercase tracking-wider text-text-3 mb-1">
          Password
        </label>
        <input
          className="w-full mb-6 bg-surface-2 border border-border px-3 py-2 font-mono text-sm outline-none focus:border-accent"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="mb-4 text-bad font-mono text-xs">{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-accent text-accent-ink font-semibold text-sm py-2.5 disabled:opacity-60"
        >
          {submitting ? "..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
