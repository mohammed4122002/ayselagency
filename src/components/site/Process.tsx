"use client";

import { motion } from "framer-motion";
import { Compass, Map, Hammer, Rocket, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";

const steps: { key: string; icon: LucideIcon }[] = [
  { key: "s1", icon: Compass },
  { key: "s2", icon: Map },
  { key: "s3", icon: Hammer },
  { key: "s4", icon: Rocket },
];

export default function Process() {
  const t = useTranslations("process");

  return (
    <section id="process" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line (desktop) */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute top-10 hidden h-px w-full origin-left bg-gradient-to-r from-transparent via-gold-500/40 to-transparent rtl:origin-right lg:block"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.15, ease: [0.21, 0.65, 0.36, 1] }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-800 text-gold-400 ring-1 ring-gold-500/30 shadow-[0_0_40px_-8px_rgba(212,175,55,0.35)]">
                <s.icon size={30} />
                <span className="absolute -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-600 text-xs font-extrabold text-navy-900 ltr:-right-2 rtl:-left-2">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-bold">{t(`steps.${s.key}.title`)}</h3>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted">
                {t(`steps.${s.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
