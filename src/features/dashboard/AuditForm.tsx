import { useState } from "react";

interface AuditFormProps {
  loading: boolean;
  onSubmit: (ip: string) => void;
}

export function AuditForm({ loading, onSubmit }: AuditFormProps) {
  const [ip, setIp] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(ip);
  }

  return (
    <form onSubmit={handleSubmit} className="flex border border-border shadow-[0_2px_10px_rgba(0,0,0,.1)]">
      <input
        className="flex-1 bg-surface font-mono text-lg px-5 py-4 outline-none placeholder:text-text-3"
        placeholder="10.20.240.55"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        autoComplete="off"
        autoFocus
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-accent-ink font-semibold text-sm px-6 shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_0_18px_var(--accent-wash)] disabled:opacity-60 disabled:shadow-none transition-shadow"
      >
        {loading ? "..." : "Audit"}
      </button>
    </form>
  );
}
