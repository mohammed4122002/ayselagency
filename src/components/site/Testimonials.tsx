"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Locale, Testimonial } from "@/lib/types";
import { loc } from "@/lib/types";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const t = useTranslations("testimonials");
  const locale = useLocale() as Locale;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return null;
  const current = items[index];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="orb orb-blue bottom-0 h-[380px] w-[380px] ltr:-left-48 rtl:-right-48 opacity-40" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} />

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.55, ease: [0.21, 0.65, 0.36, 1] }}
              className="glass-card relative p-8 text-center sm:p-12"
            >
              <span className="absolute -top-5 start-8 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 text-navy-900 shadow-lg">
                <Quote size={20} />
              </span>
              <blockquote className="text-lg leading-relaxed text-ink sm:text-xl">
                “{loc(current, "text", locale)}”
              </blockquote>
              <figcaption className="mt-8">
                <div className="font-bold text-gold-300">{loc(current, "name", locale)}</div>
                <div className="mt-1 text-sm text-muted">{loc(current, "role", locale)}</div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {items.length > 1 && (
          <div className="mt-8 flex justify-center gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-400 ${
                  i === index ? "w-8 bg-gold-500" : "w-2.5 bg-navy-700 hover:bg-navy-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
