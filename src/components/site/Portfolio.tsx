"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioImage } from "@/lib/images";
import type { Locale, Project } from "@/lib/types";
import { loc } from "@/lib/types";

const categoryOrder = ["apps", "web", "ecommerce", "ai", "branding", "social", "motion"];

export default function Portfolio({
  projects,
  behanceUrl,
}: {
  projects: Project[];
  behanceUrl: string;
}) {
  const t = useTranslations("portfolio");
  const locale = useLocale() as Locale;
  const [active, setActive] = useState("all");
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  // only show categories that actually have projects
  const categories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return ["all", ...categoryOrder.filter((c) => present.has(c))];
  }, [projects]);

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <section id="portfolio" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        {/* filter pills */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`relative rounded-full border px-5 py-2 text-sm font-bold transition-colors ${
                active === c
                  ? "border-transparent text-white"
                  : "border-line bg-white text-body hover:border-gold-300 hover:text-gold-600"
              }`}
            >
              {active === c && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
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
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.21, 0.65, 0.36, 1] }}
                className="card group relative overflow-hidden"
              >
                {/* full-card link to the project page */}
                <Link
                  href={`/projects/${p.id}`}
                  aria-label={loc(p, "title", locale)}
                  className="absolute inset-0 z-20"
                />
                <div className="img-frame relative m-4 aspect-[4/3] rounded-lg bg-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={portfolioImage(p.category, p.image_url)}
                    alt={loc(p, "title", locale)}
                    loading="lazy"
                    className="card-img rounded-lg !object-top"
                  />
                  {/* hover overlay */}
                  <div className="absolute inset-0 z-10 flex items-end rounded-lg bg-gradient-to-t from-navy-950/85 via-navy-900/30 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-white">
                        <Arrow size={16} />
                      </span>
                      {t("details")}
                    </span>
                  </div>
                  <span className="absolute top-3 start-3 z-10 rounded-full bg-navy-800/90 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                    {t(`categories.${p.category}`)}
                  </span>
                </div>
                <div className="px-6 pb-6 pt-1">
                  <h3 className="mb-2 text-lg font-extrabold text-ink transition-colors group-hover:text-gold-600">
                    {loc(p, "title", locale)}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-body">
                    {loc(p, "description", locale)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-600">
                    {t("details")}
                    <Arrow size={15} className="transition-transform duration-300 group-hover:ltr:translate-x-1 group-hover:rtl:-translate-x-1" />
                  </span>
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
