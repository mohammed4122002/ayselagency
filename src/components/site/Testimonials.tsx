"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
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
    <section className="bg-soft py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading label={t("label")} title={t("title")} />

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.55, ease: [0.21, 0.65, 0.36, 1] }}
              className="card relative p-8 text-center sm:p-12"
            >
              <span className="icon-badge absolute -top-5 start-8 h-11 w-11">
                <Quote size={20} />
              </span>
              <div className="mb-5 flex justify-center gap-1 text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-ink sm:text-xl">
                “{loc(current, "text", locale)}”
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-4">
                {current.avatar_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={current.avatar_url}
                    alt={loc(current, "name", locale)}
                    loading="lazy"
                    className="h-14 w-14 rounded-full border-2 border-gold-300 object-cover shadow-md"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-lg font-extrabold text-gold-300">
                    {loc(current, "name", locale).charAt(0)}
                  </span>
                )}
                <span className="text-start">
                  <span className="block font-extrabold text-ink">
                    {loc(current, "name", locale)}
                  </span>
                  <span className="mt-0.5 block text-sm text-body">
                    {loc(current, "role", locale)}
                  </span>
                </span>
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
                  i === index ? "w-8 bg-gold-500" : "w-2.5 bg-line hover:bg-gold-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
