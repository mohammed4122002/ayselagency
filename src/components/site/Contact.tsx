"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleX,
  Globe2,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Division, Locale, SiteSettings } from "@/lib/types";
import { loc } from "@/lib/types";
import SocialLinks from "./SocialLinks";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact({
  divisions,
  settings,
}: {
  divisions: Division[];
  settings: SiteSettings;
}) {
  const t = useTranslations("contact");
  const tc = useTranslations("cta");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      const { error } = await getSupabaseBrowser().from("messages").insert({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        service_interest: String(fd.get("service") ?? ""),
        message: String(fd.get("message") ?? ""),
      });
      if (error) throw error;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 outline-none transition-all focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20";

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="orb orb-gold top-20 h-[400px] w-[400px] ltr:-right-52 rtl:-left-52 opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* CTA banner */}
        <Reveal>
          <div className="glass-card relative mb-20 overflow-hidden p-10 text-center sm:p-14">
            <div className="grid-pattern absolute inset-0 opacity-60" />
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                <span className="text-gradient-gold">{tc("title")}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
                {tc("subtitle")}
              </p>
              <a href="#contact-form" className="gold-btn mt-8 px-8 py-4 text-base">
                {tc("button")}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-5" id="contact-form">
          {/* info */}
          <div className="lg:col-span-2">
            <Reveal>
              <span className="section-label">{t("label")}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">{t("title")}</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 leading-relaxed text-muted">{t("subtitle")}</p>
            </Reveal>

            <div className="mt-10 space-y-5">
              <Reveal delay={0.25}>
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="glass-card flex items-center gap-4 p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/12 text-gold-400 ring-1 ring-gold-500/25">
                    <Mail size={20} />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{t("info.email")}</span>
                    <span className="font-semibold" dir="ltr">
                      {settings.contact.email}
                    </span>
                  </span>
                </a>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="glass-card flex items-center gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/12 text-gold-400 ring-1 ring-gold-500/25">
                    <Globe2 size={20} />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{t("info.location")}</span>
                    <span className="font-semibold">
                      {locale === "ar"
                        ? settings.contact.address_ar
                        : settings.contact.address_en}
                    </span>
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <div>
                  <span className="mb-3 block text-xs text-muted">{t("info.follow")}</span>
                  <SocialLinks social={settings.social} />
                </div>
              </Reveal>
            </div>
          </div>

          {/* form */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="glass-card space-y-5 p-8 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder={t("form.name")}
                  className={inputCls}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={t("form.email")}
                  className={inputCls}
                  dir="ltr"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  name="phone"
                  placeholder={t("form.phone")}
                  className={inputCls}
                  dir="ltr"
                />
                <select name="service" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    {t("form.servicePlaceholder")}
                  </option>
                  {divisions.map((d) => (
                    <option key={d.id} value={d.slug} className="bg-navy-800">
                      {loc(d, "name", locale)} — {loc(d, "tagline", locale)}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="message"
                required
                rows={5}
                placeholder={t("form.message")}
                className={inputCls}
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={status === "sending"}
                className="gold-btn w-full px-8 py-4 text-base disabled:opacity-70"
                type="submit"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t("form.sending")}
                  </>
                ) : (
                  <>
                    <Send size={17} className="rtl:-scale-x-100" />
                    {t("form.send")}
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/25"
                >
                  <CheckCircle2 size={17} /> {t("form.success")}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 ring-1 ring-red-500/25"
                >
                  <CircleX size={17} /> {t("form.error")}
                </motion.p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
