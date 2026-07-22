import Reveal from "./Reveal";

export default function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <Reveal>
        <span className="section-label">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.2}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
