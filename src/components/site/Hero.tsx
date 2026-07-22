"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  Megaphone,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { StatsSettings } from "@/lib/types";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.21, 0.65, 0.36, 1] as const },
  },
};

const divisionCards: { icon: LucideIcon; labelKey: string }[] = [
  { icon: Code2, labelKey: "tech" },
  { icon: Palette, labelKey: "media" },
  { icon: Megaphone, labelKey: "marketing" },
  { icon: Brain, labelKey: "ai" },
];

export default function Hero({ stats }: { stats: StatsSettings }) {
  const t = useTranslations("hero");

  const statPills = [
    { value: stats.projects, label: t("stats.projects") },
    { value: stats.clients, label: t("stats.clients") },
    { value: stats.years, label: t("stats.years") },
  ];

  return (
    <section id="top" className="navy-band overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        {/* text column */}
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <span className="section-label-light">
              <Sparkles size={14} />
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold leading-[1.2] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            {t("title1")}
            <br />
            <span className="text-gradient-gold">{t("title2")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#contact" className="gold-btn px-8 py-4 text-base">
              {t("cta")}
            </a>
            <a href="#divisions" className="light-btn px-8 py-4 text-base">
              {t("cta2")}
            </a>
          </motion.div>

          {/* stat badges — Bawader style gold circles */}
          <motion.div variants={item} className="mt-12 flex flex-wrap gap-8">
            {statPills.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-400/70 bg-gold-500/10 text-lg font-extrabold text-gold-300">
                  <span dir="ltr">{s.value.toLocaleString("en-US")}+</span>
                </span>
                <span className="max-w-24 text-sm font-medium leading-snug text-white/75">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* visual column: 4 division tiles */}
        <div className="relative max-lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.21, 0.65, 0.36, 1] }}
            className="grid grid-cols-2 gap-5"
          >
            {divisionCards.map((d, i) => (
              <motion.div
                key={d.labelKey}
                animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5 + i,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className={`rounded-2xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur-md ${
                  i % 2 === 1 ? "translate-y-8" : ""
                }`}
              >
                <span className="icon-badge mb-5 h-14 w-14">
                  <d.icon size={26} />
                </span>
                <div className="text-lg font-extrabold text-white" dir="ltr">
                  {t(`tiles.${d.labelKey}.name`)}
                </div>
                <div className="mt-1 text-sm font-medium text-gold-300">
                  {t(`tiles.${d.labelKey}.tagline`)}
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* soft glow behind tiles */}
          <div className="absolute -inset-10 -z-0 rounded-full bg-gold-500/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
