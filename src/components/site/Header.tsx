"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Logo from "./Logo";

const sections = [
  { id: "home", key: "home" },
  { id: "divisions", key: "divisions" },
  { id: "about", key: "about" },
  { id: "portfolio", key: "portfolio" },
  { id: "process", key: "process" },
  { id: "contact", key: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    router.replace(pathname, { locale: locale === "ar" ? "en" : "ar" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/95 py-2.5 shadow-lg shadow-navy-900/20 backdrop-blur-xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="Aysel Agency">
          <Logo />
        </Link>

        {/* pill nav (desktop) */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-md lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={s.id === "home" ? "#top" : `#${s.id}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {t(s.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={switchLocale}
            className="light-btn px-3.5 py-2 text-sm"
            aria-label="Switch language"
          >
            <Globe size={15} />
            {locale === "ar" ? "EN" : "عربي"}
          </button>
          <a href="#contact" className="gold-btn hidden px-5 py-2.5 text-sm sm:inline-flex">
            {t("getStarted")}
          </a>
          <button
            className="text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-navy-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={s.id === "home" ? "#top" : `#${s.id}`}
                  initial={{ opacity: 0, x: locale === "ar" ? 24 : -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t(s.key)}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="gold-btn mt-3 px-5 py-3 text-sm"
              >
                {t("getStarted")}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
