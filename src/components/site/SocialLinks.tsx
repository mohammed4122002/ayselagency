import type { SocialSettings } from "@/lib/types";

type IconProps = { size?: number };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function InstagramIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1.5" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function BehanceIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M3 6h5a3 3 0 0 1 0 6H3zM3 12h5.5a3 3 0 0 1 0 6H3zM3 6v12" />
      <path d="M14 13.5h8a4 4 0 0 0-8 0v1a4 4 0 0 0 7.5 2" />
      <path d="M15 7h6" />
    </svg>
  );
}

function XIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

function TiktokIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4.5 5 5" />
    </svg>
  );
}

function YoutubeIcon({ size = 17 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" />
    </svg>
  );
}

const map: {
  key: keyof SocialSettings;
  Icon: (p: IconProps) => React.ReactNode;
  label: string;
}[] = [
  { key: "instagram", Icon: InstagramIcon, label: "Instagram" },
  { key: "facebook", Icon: FacebookIcon, label: "Facebook" },
  { key: "linkedin", Icon: LinkedinIcon, label: "LinkedIn" },
  { key: "behance", Icon: BehanceIcon, label: "Behance" },
  { key: "x", Icon: XIcon, label: "X" },
  { key: "tiktok", Icon: TiktokIcon, label: "TikTok" },
  { key: "youtube", Icon: YoutubeIcon, label: "YouTube" },
];

export default function SocialLinks({ social }: { social: SocialSettings }) {
  const links = map.filter((m) => social[m.key]);
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((m) => (
        <a
          key={m.key}
          href={social[m.key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.label}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy-800/60 text-muted transition-all hover:-translate-y-1 hover:border-gold-500/50 hover:text-gold-400"
        >
          <m.Icon />
        </a>
      ))}
    </div>
  );
}
