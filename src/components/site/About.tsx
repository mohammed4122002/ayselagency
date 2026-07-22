"use client";

import { motion } from "framer-motion";
import { Gem, Handshake, Lightbulb, Rocket, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";

// Bawader-style 3-card feature row: the middle card is highlighted navy
const features: { key: string; icon: LucideIcon }[] = [
  { key: "speed", icon: Rocket },
  { key: "quality", icon: Gem },
  { key: "partner", icon: Handshake },
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="scroll-mt-24 bg-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="section-label">{t("label")}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 leading-relaxed text-body sm:text-lg">{t("p1")}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 leading-relaxed text-body sm:text-lg">{t("p2")}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gold-300 bg-gold-100 p-5">
                <span className="icon-badge h-12 w-12 shrink-0">
                  <Lightbulb size={22} />
                </span>
                <p className="text-sm font-semibold leading-relaxed text-ink">
                  {t("features.innovation.title")} — {t("features.innovation.desc")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* mission card */}
          <Reveal delay={0.2}>
            <div className="navy-band rounded-3xl p-10 sm:p-12">
              <h3 className="text-2xl font-extrabold text-white">{t("missionTitle")}</h3>
              <p className="mt-4 leading-relaxed text-white/75">{t("mission")}</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {["v1", "v2", "v3", "v4"].map((k) => (
                  <div
                    key={k}
                    className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/90"
                  >
                    {t(`values.${k}`)}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* feature cards row — middle card highlighted navy like Bawader */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => {
            const highlighted = i === 1;
            return (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.21, 0.65, 0.36, 1] }}
                className={
                  highlighted
                    ? "navy-band rounded-2xl p-8 text-center shadow-xl shadow-navy-900/15"
                    : "card p-8 text-center"
                }
              >
                <span
                  className={`${highlighted ? "icon-badge" : "icon-badge-navy"} mx-auto mb-5 h-14 w-14`}
                >
                  <f.icon size={24} />
                </span>
                <h3 className={`mb-2.5 text-lg font-extrabold ${highlighted ? "text-white" : "text-ink"}`}>
                  {t(`features.${f.key}.title`)}
                </h3>
                <p className={`text-sm leading-relaxed ${highlighted ? "text-white/75" : "text-body"}`}>
                  {t(`features.${f.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
