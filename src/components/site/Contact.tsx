"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleX,
  Clock3,
  Globe2,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  User,
  Wrench,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { IMAGES } from "@/lib/images";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Division, Locale, SiteSettings } from "@/lib/types";
import { loc } from "@/lib/types";
import SocialLinks from "./SocialLinks";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink placeholder:text-muted outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-300/40";

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number | string }>;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-sm font-bold text-ink">
        <span className="text-gold-500">
          <Icon size={15} />
        </span>
        {label}
      </span>
      {children}
    </label>
  );
}

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

  const infoCards = [
    {
      icon: Mail,
      label: t("info.email"),
      value: settings.contact.email,
      href: `mailto:${settings.contact.email}`,
      navy: false,
      ltr: true,
    },
    ...(settings.contact.phone
      ? [
          {
            icon: Phone,
            label: t("info.phone"),
            value: settings.contact.phone,
            href: `tel:${settings.contact.phone}`,
            navy: true,
            ltr: true,
          },
        ]
      : [
          {
            icon: Globe2,
            label: t("info.location"),
            value:
              locale === "ar"
                ? settings.contact.address_ar
                : settings.contact.address_en,
            href: "",
            navy: true,
            ltr: false,
          },
        ]),
    {
      icon: Clock3,
      label: t("info.response"),
      value: t("info.responseValue"),
      href: "",
      navy: false,
      ltr: false,
    },
  ];

  return (
    <>
      {/* CTA band — city photo with navy overlay */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.ctaBg}
            alt={locale === "ar" ? "مدينة ليلاً" : "City at night"}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/92 via-navy-800/88 to-navy-950/94" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 1.5px, transparent 1.5px 80px)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{tc("title")}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
              {tc("subtitle")}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <a href="#contact" className="gold-btn mt-8 px-9 py-4 text-base">
              {tc("button")}
              <span className="btn-arrow rtl:-scale-x-100">→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

          {/* info cards */}
          <div className="mb-14 grid gap-6 md:grid-cols-3">
            {infoCards.map((c, i) => {
              const Wrapper = c.href ? "a" : "div";
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <Wrapper
                    {...(c.href ? { href: c.href } : {})}
                    className="card flex flex-col items-center gap-4 p-8 text-center"
                  >
                    <span className={`${c.navy ? "icon-badge-navy" : "icon-badge"} h-13 w-13`}>
                      <c.icon size={22} />
                    </span>
                    <span>
                      <span className="block text-lg font-extrabold text-ink">{c.label}</span>
                      <span
                        className="mt-1.5 block text-sm text-body"
                        {...(c.ltr ? { dir: "ltr" } : {})}
                      >
                        {c.value}
                      </span>
                    </span>
                  </Wrapper>
                </Reveal>
              );
            })}
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* side column */}
            <div className="space-y-6 lg:col-span-2">
              <Reveal>
                <div className="card p-7">
                  <span className="icon-badge mb-4 h-12 w-12">
                    <Clock3 size={20} />
                  </span>
                  <h3 className="mb-2 font-extrabold text-ink">{t("side.fastTitle")}</h3>
                  <p className="text-sm leading-relaxed text-body">{t("side.fastDesc")}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="card p-7">
                  <span className="icon-badge-navy mb-4 h-12 w-12">
                    <Wrench size={20} />
                  </span>
                  <h3 className="mb-2 font-extrabold text-ink">{t("side.teamTitle")}</h3>
                  <p className="text-sm leading-relaxed text-body">{t("side.teamDesc")}</p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="card p-7">
                  <h3 className="mb-4 font-extrabold text-ink">{t("info.follow")}</h3>
                  <SocialLinks social={settings.social} />
                </div>
              </Reveal>
            </div>

            {/* form */}
            <Reveal delay={0.15} className="lg:col-span-3">
              <form onSubmit={onSubmit} className="card space-y-5 p-8 sm:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("form.name")} icon={User}>
                    <input name="name" required placeholder={t("form.namePh")} className={inputCls} />
                  </Field>
                  <Field label={t("form.email")} icon={Mail}>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="example@mail.com"
                      className={inputCls}
                      dir="ltr"
                    />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("form.phone")} icon={Phone}>
                    <input name="phone" placeholder="+9665XXXXXXXX" className={inputCls} dir="ltr" />
                  </Field>
                  <Field label={t("form.service")} icon={Wrench}>
                    <select name="service" className={inputCls} defaultValue="">
                      <option value="" disabled>
                        {t("form.servicePlaceholder")}
                      </option>
                      {divisions.map((d) => (
                        <option key={d.id} value={d.slug}>
                          {loc(d, "name", locale)} — {loc(d, "tagline", locale)}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label={t("form.message")} icon={MessageSquareText}>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={t("form.messagePh")}
                    className={inputCls}
                  />
                </Field>
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
                    className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600 ring-1 ring-emerald-200"
                  >
                    <CheckCircle2 size={17} /> {t("form.success")}
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-500 ring-1 ring-red-200"
                  >
                    <CircleX size={17} /> {t("form.error")}
                  </motion.p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
