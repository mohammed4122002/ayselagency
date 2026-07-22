"use client";

import { motion } from "framer-motion";
import { Gem, Handshake, Lightbulb, Rocket, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";

const features: { key: string; icon: LucideIcon }[] = [
  { key: "quality", icon: Gem },
  { key: "speed", icon: Rocket },
  { key: "partner", icon: Handshake },
  { key: "innovation", icon: Lightbulb },
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="orb orb-gold top-10 h-[380px] w-[380px] ltr:-left-48 rtl:-right-48 opacity-50" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="section-label">{t("label")}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 leading-relaxed text-muted sm:text-lg">{t("p1")}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 leading-relaxed text-muted sm:text-lg">{t("p2")}</p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.21, 0.65, 0.36, 1] }}
              className={`glass-card p-6 ${i % 2 === 1 ? "sm:translate-y-6" : ""}`}
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/12 text-gold-400 ring-1 ring-gold-500/25">
                <f.icon size={22} />
              </span>
              <h3 className="mb-2 font-bold">{t(`features.${f.key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {t(`features.${f.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
