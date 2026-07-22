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
import type { Division, Locale } from "@/lib/types";
import { loc } from "@/lib/types";

const icons: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  megaphone: Megaphone,
  brain: Brain,
};

// each division gets a distinct gradient wash over the navy base
const gradients: Record<string, string> = {
  tech: "from-[#0a2440] via-[#123a66] to-[#0d2c4f]",
  media: "from-[#0d2c4f] via-[#1b3a5c] to-[#0a2440]",
  marketing: "from-[#0a2440] via-[#1b4a80] to-[#0d2c4f]",
  ai: "from-[#0d2c4f] via-[#123a66] to-[#081e38]",
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
            const grad = gradients[d.slug] ?? gradients.tech;
            return (
              <motion.article
                key={d.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12, ease: [0.21, 0.65, 0.36, 1] }}
                className="card group relative overflow-hidden"
              >
                {/* bespoke navy header — no stock photography */}
                <div
                  className={`relative h-44 overflow-hidden bg-gradient-to-br ${grad}`}
                >
                  {/* diagonal brand texture */}
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1.5px, transparent 1.5px 46px)",
                    }}
                  />
                  {/* soft gold glow */}
                  <div className="absolute -top-16 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl ltr:-right-10 rtl:-left-10 transition-all duration-700 group-hover:bg-gold-500/30" />
                  {/* large watermark icon */}
                  <Icon
                    className="pointer-events-none absolute -bottom-6 text-white/[0.07] transition-transform duration-700 group-hover:scale-110 ltr:-left-4 rtl:-right-4"
                    size={190}
                    strokeWidth={1}
                  />

                  {/* index number */}
                  <span className="absolute top-5 text-sm font-extrabold tracking-widest text-gold-300/70 ltr:left-6 rtl:right-6">
                    0{i + 1}
                  </span>

                  {/* icon badge + titles */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <span className="block text-2xl font-extrabold text-white drop-shadow" dir="ltr">
                        {loc(d, "name", locale)}
                      </span>
                      <span className="mt-1 block text-sm font-bold text-gold-300">
                        {loc(d, "tagline", locale)}
                      </span>
                    </div>
                    <span className="icon-badge h-16 w-16 shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon size={28} />
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <p className="mb-6 leading-relaxed text-body">
                    {loc(d, "description", locale)}
                  </p>

                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {d.services?.map((s) => (
                      <li key={s.id} className="flex items-center gap-2.5 text-[14px] font-medium text-ink/85">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 ring-1 ring-gold-300">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {loc(s, "name", locale)}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-500/30"
                  >
                    {t("explore")} {loc(d, "name", locale)}
                    <Arrow
                      size={15}
                      className="transition-transform duration-300 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1"
                    />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
