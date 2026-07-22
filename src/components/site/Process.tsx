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
    <section id="process" className="scroll-mt-24 bg-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* dotted connector (desktop) */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="process-line absolute top-24 hidden h-[2px] w-full origin-left rtl:origin-right lg:block"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.14, ease: [0.21, 0.65, 0.36, 1] }}
              className="card relative p-8 text-center"
            >
              {/* big ghost number — Bawader style */}
              <span className="pointer-events-none absolute top-2 text-7xl font-extrabold text-navy-900/[0.05] ltr:right-4 rtl:left-4">
                {i + 1}
              </span>
              <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                <span className="icon-badge-navy h-16 w-16">
                  <s.icon size={26} />
                </span>
                <span className="absolute -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-extrabold text-white ltr:-right-1.5 rtl:-left-1.5">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-extrabold text-ink">
                {t(`steps.${s.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-body">
                {t(`steps.${s.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
