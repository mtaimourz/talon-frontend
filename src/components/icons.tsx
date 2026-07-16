type IconProps = { className?: string };

const base = "shrink-0";

export function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`}>
      <path
        d="M12 3.5l7 2.6v5.4c0 4.4-2.9 7.6-7 9-4.1-1.4-7-4.6-7-9V6.1l7-2.6z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M9 12.2l2.1 2.1L15.3 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TableIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`}>
      <rect x="4" y="5" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M4 10.5h16M9.5 10.5V19" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function GridIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`}>
      <rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function ServerIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`}>
      <rect x="4" y="4.5" width="16" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.75" />
      <rect x="4" y="13.5" width="16" height="6" rx="1.3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="7.2" cy="7.5" r="0.9" fill="currentColor" />
      <circle cx="7.2" cy="16.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function LogoutIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`}>
      <path d="M9 4H6a1.5 1.5 0 00-1.5 1.5v13A1.5 1.5 0 006 20h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M13.5 8l4 4-4 4M17.3 12H9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
