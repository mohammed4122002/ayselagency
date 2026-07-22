"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Check,
  Code2,
  Megaphone,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Division, Locale } from "@/lib/types";
import { loc } from "@/lib/types";

const icons: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  megaphone: Megaphone,
  brain: Brain,
};

export default function Divisions({ divisions }: { divisions: Division[] }) {
  const t = useTranslations("divisions");
  const locale = useLocale() as Locale;

  return (
    <section id="divisions" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 md:grid-cols-2">
          {divisions.map((d, i) => {
            const Icon = icons[d.icon] ?? Code2;
            return (
              <motion.article
                key={d.id}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: (i % 2) * 0.12, ease: [0.21, 0.65, 0.36, 1] }}
                className="card group relative overflow-hidden p-8"
              >
                {/* index watermark */}
                <span className="pointer-events-none absolute -top-3 text-7xl font-extrabold text-navy-900/[0.05] ltr:right-5 rtl:left-5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mb-6 flex items-center gap-4">
                  <span className="icon-badge h-14 w-14 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={26} />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold text-ink" dir="ltr">
                      <span className={locale === "ar" ? "block text-right" : ""}>
                        {loc(d, "name", locale)}
                      </span>
                    </h3>
                    <p className="text-sm font-bold text-gold-600">
                      {loc(d, "tagline", locale)}
                    </p>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-body">
                  {loc(d, "description", locale)}
                </p>

                <ul className="space-y-2.5">
                  {d.services?.map((s) => (
                    <li key={s.id} className="flex items-center gap-2.5 text-sm font-medium text-ink/85">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 ring-1 ring-gold-300">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {loc(s, "name", locale)}
                    </li>
                  ))}
                </ul>

                {/* hover gold line */}
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-center scale-x-0 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
