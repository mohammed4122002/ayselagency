"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Logo from "./Logo";

const sections = [
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
          ? "border-b border-white/5 bg-navy-950/80 py-3 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Aysel Agency">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm font-medium text-muted transition-colors hover:text-gold-300"
            >
              {t(s.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="ghost-btn px-3.5 py-2 text-sm"
            aria-label="Switch language"
          >
            <Globe size={15} />
            {locale === "ar" ? "EN" : "عربي"}
          </button>
          <a href="#contact" className="gold-btn hidden px-5 py-2.5 text-sm sm:inline-flex">
            {t("getStarted")}
          </a>
          <button
            className="text-ink lg:hidden"
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
            className="overflow-hidden border-b border-white/5 bg-navy-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  initial={{ opacity: 0, x: locale === "ar" ? 24 : -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-medium text-ink transition-colors hover:bg-white/5 hover:text-gold-300"
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
