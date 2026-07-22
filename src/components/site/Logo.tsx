export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F0D080" />
            <stop offset="0.5" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#B8952B" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="#0A1A33" />
        <path
          d="M32 12 L50 52 H42.5 L38.6 43 H25.4 L21.5 52 H14 Z M32 27.5 L27.8 37.2 H36.2 Z"
          fill="url(#logo-g)"
        />
        <circle cx="32" cy="56" r="2.4" fill="url(#logo-g)" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight text-ink" dir="ltr">
        Aysel<span className="text-gradient-gold"> Agency</span>
      </span>
    </span>
  );
}
