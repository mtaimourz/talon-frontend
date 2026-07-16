import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        text: "var(--text)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        good: "var(--good)",
        warn: "var(--warn)",
        bad: "var(--bad)",
      },
      fontFamily: {
        disp: ["Bricolage", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Plex", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["JBMono", "ui-monospace", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
