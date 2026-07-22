// Official Aysel Agency logo: white curved swoosh + gold "A" peak,
// gold AYSEL wordmark with white AGENCY letterspaced underneath.
export default function Logo({
  size = 44,
  onDark = true,
}: {
  size?: number;
  onDark?: boolean;
}) {
  const secondary = onDark ? "#FFFFFF" : "#0F2B4C";
  return (
    <span className="inline-flex items-center gap-2.5" dir="ltr">
      <svg width={size} height={size} viewBox="0 0 120 110" aria-hidden>
        <defs>
          <linearGradient id="aysel-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D8B45E" />
            <stop offset="0.55" stopColor="#C29A3F" />
            <stop offset="1" stopColor="#A8863A" />
          </linearGradient>
        </defs>
        {/* white curved swoosh */}
        <path
          d="M63 6 C52 30, 38 58, 10 104 C24 96, 40 80, 51 60 C60 43, 66 24, 68 10 Z"
          fill={secondary}
        />
        {/* gold A peak with bottom notch */}
        <path
          d="M76 14 L112 98 L90 98 L76 64 L64 98 L48 98 L62 66 Z"
          fill="url(#aysel-gold)"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-[1.3rem] font-extrabold tracking-[0.06em]"
          style={{ color: "#C29A3F" }}
        >
          AYSEL
        </span>
        <span
          className="mt-[3px] text-[0.6rem] font-bold tracking-[0.44em]"
          style={{ color: secondary }}
        >
          AGENCY
        </span>
      </span>
    </span>
  );
}
