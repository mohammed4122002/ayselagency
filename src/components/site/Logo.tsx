export default function Logo({
  size = 40,
  onDark = true,
}: {
  size?: number;
  onDark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#CDAB5C" />
            <stop offset="0.5" stopColor="#BE9A44" />
            <stop offset="1" stopColor="#A8863A" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill={onDark ? "#0A2440" : "#0D2C4F"} />
        <path
          d="M32 12 L50 52 H42.5 L38.6 43 H25.4 L21.5 52 H14 Z M32 27.5 L27.8 37.2 H36.2 Z"
          fill="url(#logo-g)"
        />
        <circle cx="32" cy="56" r="2.4" fill="url(#logo-g)" />
      </svg>
      <span
        className={`text-xl font-extrabold tracking-tight ${onDark ? "text-white" : "text-ink"}`}
        dir="ltr"
      >
        Aysel<span className="text-gradient-gold"> Agency</span>
      </span>
    </span>
  );
}
