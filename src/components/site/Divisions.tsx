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
    <section id="divisions" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="orb orb-blue top-40 h-[400px] w-[400px] ltr:-right-52 rtl:-left-52 opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 md:grid-cols-2">
          {divisions.map((d, i) => {
            const Icon = icons[d.icon] ?? Code2;
            return (
              <motion.article
                key={d.id}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.12, ease: [0.21, 0.65, 0.36, 1] }}
                className="glass-card group relative overflow-hidden p-8"
              >
                {/* index watermark */}
                <span className="pointer-events-none absolute -top-4 text-7xl font-extrabold text-white/[0.04] ltr:right-4 rtl:left-4">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 text-gold-400 ring-1 ring-gold-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={26} />
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold" dir="ltr">
                      <span className={locale === "ar" ? "block text-right" : ""}>
                        {loc(d, "name", locale)}
                      </span>
                    </h3>
                    <p className="text-sm font-semibold text-gold-400">
                      {loc(d, "tagline", locale)}
                    </p>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed text-muted">
                  {loc(d, "description", locale)}
                </p>

                <ul className="space-y-2.5">
                  {d.services?.map((s) => (
                    <li key={s.id} className="flex items-center gap-2.5 text-sm text-ink/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {loc(s, "name", locale)}
                    </li>
                  ))}
                </ul>

                {/* hover glow line */}
                <span className="absolute inset-x-0 bottom-0 h-[2px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
