"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.65, 0.36, 1] as const },
  },
};

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="grid-pattern relative flex min-h-svh items-center overflow-hidden pt-24">
      {/* background orbs */}
      <div className="orb orb-gold -top-32 h-[480px] w-[480px] ltr:-right-32 rtl:-left-32" />
      <div className="orb orb-blue top-1/3 h-[520px] w-[520px] ltr:-left-40 rtl:-right-40" />
      <div className="orb orb-gold bottom-0 h-[300px] w-[300px] ltr:left-1/3 rtl:right-1/3 opacity-60" />

      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030a16_78%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6"
      >
        <motion.div variants={item}>
          <span className="section-label">
            <Sparkles size={14} />
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t("title1")}
          <br />
          <span className="text-gradient-gold">{t("title2")}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:text-xl"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a href="#contact" className="gold-btn px-8 py-4 text-base">
            {t("cta")}
          </a>
          <a href="#divisions" className="ghost-btn px-8 py-4 text-base">
            {t("cta2")}
          </a>
        </motion.div>

        <motion.a
          href="#divisions"
          variants={item}
          className="mx-auto mt-20 flex w-max flex-col items-center gap-2 text-xs font-medium text-muted transition-colors hover:text-gold-300"
        >
          {t("scroll")}
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={18} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
