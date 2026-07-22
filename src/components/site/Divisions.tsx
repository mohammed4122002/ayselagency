"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Code2,
  Megaphone,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { divisionImage } from "@/lib/images";
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
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section id="divisions" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-8 md:grid-cols-2">
          {divisions.map((d, i) => {
            const Icon = icons[d.icon] ?? Code2;
            return (
              <motion.article
                key={d.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12, ease: [0.21, 0.65, 0.36, 1] }}
                className="card group overflow-hidden"
              >
                {/* photo header */}
                <div className="img-frame relative h-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={divisionImage(d.slug)}
                    alt={`${loc(d, "name", locale)} — ${loc(d, "tagline", locale)}`}
                    loading="lazy"
                    className="card-img"
                  />
                  <div className="absolute inset-0 z-[5] bg-gradient-to-t from-navy-950/85 via-navy-900/25 to-transparent" />
                  {/* floating icon over the photo */}
                  <span className="icon-badge absolute -bottom-0 z-10 m-5 h-14 w-14 !rounded-xl border-4 border-white/90 shadow-lg ltr:right-0 rtl:left-0">
                    <Icon size={24} />
                  </span>
                  <span className="absolute bottom-4 start-5 z-10 text-white">
                    <span className="block text-xl font-extrabold drop-shadow" dir="ltr">
                      {loc(d, "name", locale)}
                    </span>
                    <span className="mt-0.5 block text-sm font-bold text-gold-300 drop-shadow">
                      {loc(d, "tagline", locale)}
                    </span>
                  </span>
                </div>

                <div className="p-7">
                  <p className="mb-6 leading-relaxed text-body">
                    {loc(d, "description", locale)}
                  </p>

                  <ul className="space-y-2.5">
                    {d.services?.map((s) => (
                      <li key={s.id} className="flex items-center gap-2.5 text-[15px] font-medium text-ink/85">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 ring-1 ring-gold-300">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {loc(s, "name", locale)}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-gold-600 transition-colors hover:text-gold-700"
                  >
                    {t("explore")} {loc(d, "name", locale)}
                    <Arrow size={15} className="transition-transform duration-300 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
                  </a>
                </div>

                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-center scale-x-0 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
