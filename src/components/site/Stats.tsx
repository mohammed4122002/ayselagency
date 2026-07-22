"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import type { StatsSettings } from "@/lib/types";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [inView, mv, value]);

  return (
    <span ref={ref} dir="ltr" className="text-gradient-gold text-4xl font-extrabold sm:text-5xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Stats({ stats }: { stats: StatsSettings }) {
  const t = useTranslations("stats");
  const items = [
    { value: stats.years, label: t("years") },
    { value: stats.projects, label: t("projects") },
    { value: stats.clients, label: t("clients") },
    { value: stats.team, label: t("team") },
  ];

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="glass-card grid grid-cols-2 gap-y-10 rounded-3xl px-6 py-12 lg:grid-cols-4"
        >
          {items.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Counter value={s.value} suffix="+" />
              <span className="text-sm font-medium text-muted">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
