"use client";

import { motion } from "framer-motion";
import { Award, Gem, Handshake, Lightbulb, Rocket, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import { portfolioImage } from "@/lib/images";
import type { Project } from "@/lib/types";

const features: { key: string; icon: LucideIcon }[] = [
  { key: "speed", icon: Rocket },
  { key: "quality", icon: Gem },
  { key: "partner", icon: Handshake },
];

export default function About({ projects = [] }: { projects?: Project[] }) {
  const t = useTranslations("about");
  const locale = useLocale();

  // showcase a few real project boards inside a bespoke navy frame
  const shots = projects.slice(0, 3);

  return (
    <section id="about" className="scroll-mt-24 bg-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* bespoke project collage — real work, no stock */}
          <Reveal className="relative">
            <div className="navy-band relative overflow-hidden rounded-3xl p-6 shadow-2xl shadow-navy-900/20">
              <div className="relative grid grid-cols-2 gap-4">
                {shots[0] && (
                  <div className="img-frame col-span-2 h-44 overflow-hidden rounded-xl ring-1 ring-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={portfolioImage(shots[0].category, shots[0].image_url)}
                      alt=""
                      loading="lazy"
                      className="!object-top"
                    />
                  </div>
                )}
                {shots.slice(1, 3).map((p) => (
                  <div
                    key={p.id}
                    className="img-frame h-36 overflow-hidden rounded-xl ring-1 ring-white/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={portfolioImage(p.category, p.image_url)}
                      alt=""
                      loading="lazy"
                      className="!object-top"
                    />
                  </div>
                ))}
              </div>
              {/* caption */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {locale === "ar" ? "نماذج من أعمالنا" : "From our work"}
                </span>
                <span className="text-xs font-semibold text-gold-300">
                  {locale === "ar" ? "وكالة أيسل" : "Aysel Agency"}
                </span>
              </div>
            </div>

            {/* experience badge */}
            <motion.div
              initial={{ scale: 0, rotate: -8 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.3 }}
              className="absolute -top-6 z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-500/40 ltr:-left-4 rtl:-right-4"
            >
              <Award size={22} />
              <span className="mt-1 text-[11px] font-extrabold leading-tight text-center">
                {t("badge")}
              </span>
            </motion.div>
          </Reveal>

          <div className="max-sm:mt-2 sm:mt-6 lg:mt-0">
            <Reveal>
              <span className="section-label">{t("label")}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-[2rem] font-bold leading-tight text-ink sm:text-[2.5rem]">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[17px] leading-relaxed text-body sm:text-lg">{t("p1")}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-[17px] leading-relaxed text-body sm:text-lg">{t("p2")}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-8 flex items-center gap-4 rounded-xl border border-gold-300 bg-gold-100 p-5">
                <span className="icon-badge h-12 w-12 shrink-0">
                  <Lightbulb size={22} />
                </span>
                <p className="text-sm font-semibold leading-relaxed text-ink">
                  {t("features.innovation.title")} — {t("features.innovation.desc")}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["v1", "v2", "v3", "v4"].map((k) => (
                  <div
                    key={k}
                    className="rounded-xl border border-line bg-white px-4 py-3 text-sm font-bold text-ink"
                  >
                    {t(`values.${k}`)}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* feature cards row — middle card highlighted navy */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => {
            const highlighted = i === 1;
            return (
              <motion.div
                key={f.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.21, 0.65, 0.36, 1] }}
                className={
                  highlighted
                    ? "navy-band rounded-xl p-8 text-center shadow-xl shadow-navy-900/15"
                    : "card p-8 text-center"
                }
              >
                <span
                  className={`${highlighted ? "icon-badge" : "icon-badge-navy"} mx-auto mb-5 h-14 w-14`}
                >
                  <f.icon size={24} />
                </span>
                <h3 className={`mb-2.5 text-lg font-bold ${highlighted ? "text-white" : "text-ink"}`}>
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
