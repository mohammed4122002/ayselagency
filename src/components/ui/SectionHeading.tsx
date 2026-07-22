import Reveal from "./Reveal";

export default function SectionHeading({
  label,
  title,
  subtitle,
  onDark = false,
}: {
  label: string;
  title: string;
  subtitle?: string;
  onDark?: boolean;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <Reveal>
        <span className={onDark ? "section-label-light" : "section-label"}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500" />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={`mt-5 text-3xl font-extrabold leading-tight sm:text-4xl ${
            onDark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.2}>
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              onDark ? "text-white/70" : "text-body"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
