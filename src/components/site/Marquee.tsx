import type { Division } from "@/lib/types";
import type { Locale } from "@/lib/types";

export default function Marquee({
  divisions,
  locale,
}: {
  divisions: Division[];
  locale: Locale;
}) {
  const names = divisions.flatMap(
    (d) => d.services?.map((s) => (locale === "ar" ? s.name_ar : s.name_en)) ?? []
  );
  const row = [...names, ...names];

  return (
    <div className="relative overflow-hidden border-b border-line bg-soft py-4">
      <div className="marquee-track gap-10">
        {row.map((n, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-10 text-sm font-semibold text-body"
          >
            {n}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-soft to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-soft to-transparent rtl:bg-gradient-to-r" />
    </div>
  );
}
