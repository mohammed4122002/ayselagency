// Recreation of the official Aysel Agency wordmark:
// three diagonal slashes forming the mark + spaced AYSEL / AGENCY stack.
export default function Logo({
  size = 40,
  onDark = true,
}: {
  size?: number;
  onDark?: boolean;
}) {
  const main = onDark ? "#FFFFFF" : "#0F2B4C";
  return (
    <span className="inline-flex items-center gap-2" dir="ltr">
      <svg width={size * 1.15} height={size} viewBox="0 0 74 64" aria-hidden>
        <defs>
          <linearGradient id="mark-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#DDC084" />
            <stop offset="0.55" stopColor="#BE9A44" />
            <stop offset="1" stopColor="#A8863A" />
          </linearGradient>
        </defs>
        {/* diagonal slashes */}
        <polygon points="20,58 38,6 46,6 28,58" fill={main} />
        <polygon points="8,58 26,6 32,6 14,58" fill={main} opacity="0.55" />
        <polygon points="-2,58 16,6 20,6 2,58" fill={main} opacity="0.25" />
        {/* A crossbar + right leg */}
        <polygon points="42,58 60,6 68,6 50,58" fill="url(#mark-gold)" />
        <rect x="36" y="34" width="24" height="7" transform="skewX(-19)" fill="url(#mark-gold)" opacity="0.9" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-[1.15rem] font-extrabold tracking-[0.28em]"
          style={{ color: main }}
        >
          AYSEL
        </span>
        <span
          className="mt-1 text-[0.55rem] font-bold tracking-[0.52em]"
          style={{ color: onDark ? "#DDC084" : "#A8863A" }}
        >
          AGENCY
        </span>
      </span>
    </span>
  );
}
