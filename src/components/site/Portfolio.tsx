"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Locale, Project } from "@/lib/types";
import { loc } from "@/lib/types";

const categories = ["all", "branding", "social", "web", "motion", "ai"] as const;

export default function Portfolio({
  projects,
  behanceUrl,
}: {
  projects: Project[];
  behanceUrl: string;
}) {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState<(typeof categories)[number]>("all");

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <section id="portfolio" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="orb orb-gold top-1/4 h-[420px] w-[420px] ltr:-right-52 rtl:-left-52 opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        {/* filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                active === c ? "text-navy-900" : "text-muted hover:text-ink"
              }`}
            >
              {active === c && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-300 to-gold-500"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {c === "all" ? t("all") : t(`categories.${c}`)}
              </span>
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.21, 0.65, 0.36, 1] }}
                className="glass-card group overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={loc(p, "title", locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="grid-pattern flex h-full items-center justify-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500/60 ring-1 ring-gold-500/20">
                        <ImageIcon size={28} />
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-4 start-4 rounded-full bg-gold-500/90 px-3 py-1 text-xs font-bold text-navy-900 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {t(`categories.${p.category}`)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-gold-300">
                    {loc(p, "title", locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {loc(p, "description", locale)}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {behanceUrl ? (
          <div className="mt-12 text-center">
            <a
              href={behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-btn px-7 py-3.5 text-sm"
            >
              {t("viewBehance")}
              <ArrowUpRight size={16} className="rtl:-scale-x-100" />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
