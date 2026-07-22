"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { HERO_VIDEO_SOURCES, IMAGES } from "@/lib/images";
import type { StatsSettings } from "@/lib/types";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.65, 0.36, 1] as const },
  },
};

function CountUp({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (inView) {
      const controls = animate(mv, value, {
        duration: 2,
        delay: 0.9,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, mv, value]);

  return (
    <span ref={ref} dir="ltr" className="text-3xl font-extrabold text-gold-300 sm:text-4xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Hero({ stats }: { stats: StatsSettings }) {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [videoFailed, setVideoFailed] = useState(false);

  const trust = [
    { value: stats.projects, suffix: "+", label: t("stats.projects") },
    { value: stats.years, suffix: "+", label: t("stats.years") },
    { value: 98, suffix: "%", label: t("stats.satisfaction") },
  ];

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      {/* cinematic background: video with photo fallback + layered navy overlay */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.heroPoster}
          alt={
            locale === "ar"
              ? "فريق عمل Aysel Agency أثناء تطوير مشروع رقمي"
              : "Aysel Agency team working on a digital project"
          }
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        {!videoFailed && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {HERO_VIDEO_SOURCES.map((src) => (
              <source key={src} src={src} type="video/mp4" />
            ))}
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-900/75 to-navy-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-navy-950/70" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 1.5px, transparent 1.5px 80px)",
          }}
        />
        {/* bottom fade into the page */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            variants={item}
            className="text-[2.6rem] font-bold leading-[1.22] tracking-tight text-white sm:text-[3.4rem] lg:text-[4rem]"
          >
            {t("title1")}
            <br />
            <span className="text-gradient-gold font-extrabold">{t("title2")}</span>
          </motion.h1>

          {/* gold flourish */}
          <motion.div variants={item} className="mt-6 flex items-center justify-center gap-2">
            <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-transparent to-gold-500" />
            <span className="h-2 w-2 rotate-45 bg-gold-400" />
            <span className="h-[3px] w-10 rounded-full bg-gradient-to-l from-transparent to-gold-500" />
          </motion.div>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/80 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a href="#contact" className="gold-btn px-9 py-4 text-base">
              {t("cta")}
              <span className="btn-arrow rtl:-scale-x-100">→</span>
            </a>
            <a href="#divisions" className="light-btn px-9 py-4 text-base backdrop-blur-sm">
              {t("cta2")}
            </a>
          </motion.div>

          {/* trust indicators with count-up */}
          <motion.div
            variants={item}
            className="mx-auto mt-14 grid max-w-xl grid-cols-3 divide-x divide-white/15 rounded-2xl border border-white/12 bg-white/[0.06] py-6 backdrop-blur-md rtl:divide-x-reverse"
          >
            {trust.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 px-2">
                <CountUp value={s.value} suffix={s.suffix} />
                <span className="text-xs font-semibold text-white/70 sm:text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.a
          href="#divisions"
          aria-label={t("scroll")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute inset-x-0 -bottom-8 mx-auto flex w-max flex-col items-center gap-2.5 sm:bottom-2"
        >
          <span className="scroll-indicator">
            <span />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
