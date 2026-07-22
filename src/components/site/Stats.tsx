"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Briefcase, CalendarCheck, Smile, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import type { StatsSettings } from "@/lib/types";

function Counter({ value }: { value: number }) {
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
    <span ref={ref} dir="ltr" className="text-4xl font-extrabold text-gold-300 sm:text-5xl">
      <motion.span>{rounded}</motion.span>+
    </span>
  );
}

export default function Stats({ stats }: { stats: StatsSettings }) {
  const t = useTranslations("stats");
  const items = [
    { value: stats.years, label: t("years"), icon: CalendarCheck },
    { value: stats.projects, label: t("projects"), icon: Briefcase },
    { value: stats.clients, label: t("clients"), icon: Smile },
    { value: stats.team, label: t("team"), icon: Users },
  ];

  return (
    <section className="navy-band border-y-2 border-gold-500/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {items.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-400/60 bg-gold-500/10 text-gold-300">
                <s.icon size={24} />
              </span>
              <Counter value={s.value} />
              <span className="text-sm font-semibold text-white/75">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
