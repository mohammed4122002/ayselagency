"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { fallbackSettings } from "@/lib/fallback-data";
import type { SiteSettings } from "@/lib/types";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none focus:border-gold-500/60";

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSupabaseBrowser()
      .from("site_settings")
      .select("*")
      .then(({ data }) => {
        const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
        setSettings({
          contact: { ...fallbackSettings.contact, ...(map.contact ?? {}) },
          social: { ...fallbackSettings.social, ...(map.social ?? {}) },
          stats: { ...fallbackSettings.stats, ...(map.stats ?? {}) },
        });
      });
  }, []);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    const db = getSupabaseBrowser();
    await Promise.all([
      db.from("site_settings").upsert({ key: "contact", value: settings.contact }),
      db.from("site_settings").upsert({ key: "social", value: settings.social }),
      db.from("site_settings").upsert({ key: "stats", value: settings.stats }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!settings) return <Loader2 className="animate-spin text-gold-500" size={28} />;

  const setContact = (k: string, v: string) =>
    setSettings({ ...settings, contact: { ...settings.contact, [k]: v } });
  const setSocial = (k: string, v: string) =>
    setSettings({ ...settings, social: { ...settings.social, [k]: v } });
  const setStats = (k: string, v: number) =>
    setSettings({ ...settings, stats: { ...settings.stats, [k]: v } });

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 text-2xl font-extrabold">إعدادات الموقع</h1>

      <section className="glass-card mb-6 space-y-4 p-6">
        <h2 className="font-bold text-gold-300">بيانات التواصل</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input placeholder="البريد الإلكتروني" dir="ltr" value={settings.contact.email} onChange={(e) => setContact("email", e.target.value)} className={inputCls} />
          <input placeholder="رقم الهاتف" dir="ltr" value={settings.contact.phone} onChange={(e) => setContact("phone", e.target.value)} className={inputCls} />
          <input placeholder="رقم الواتساب (مع رمز الدولة)" dir="ltr" value={settings.contact.whatsapp} onChange={(e) => setContact("whatsapp", e.target.value)} className={inputCls} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input placeholder="العنوان (عربي)" value={settings.contact.address_ar} onChange={(e) => setContact("address_ar", e.target.value)} className={inputCls} />
          <input placeholder="Address (English)" dir="ltr" value={settings.contact.address_en} onChange={(e) => setContact("address_en", e.target.value)} className={inputCls} />
        </div>
      </section>

      <section className="glass-card mb-6 space-y-4 p-6">
        <h2 className="font-bold text-gold-300">حسابات السوشال ميديا (روابط كاملة)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["instagram", "Instagram"],
              ["facebook", "Facebook"],
              ["linkedin", "LinkedIn"],
              ["behance", "Behance"],
              ["x", "X (Twitter)"],
              ["tiktok", "TikTok"],
              ["youtube", "YouTube"],
            ] as const
          ).map(([key, label]) => (
            <input
              key={key}
              placeholder={label}
              dir="ltr"
              value={settings.social[key]}
              onChange={(e) => setSocial(key, e.target.value)}
              className={inputCls}
            />
          ))}
        </div>
      </section>

      <section className="glass-card mb-8 space-y-4 p-6">
        <h2 className="font-bold text-gold-300">الإحصائيات (تظهر كعدادات متحركة)</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          {(
            [
              ["years", "سنوات الخبرة"],
              ["projects", "المشاريع"],
              ["clients", "العملاء"],
              ["team", "الفريق"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="text-xs text-muted">
              {label}
              <input
                type="number"
                dir="ltr"
                value={settings.stats[key]}
                onChange={(e) => setStats(key, Number(e.target.value))}
                className={`${inputCls} mt-1.5`}
              />
            </label>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button onClick={save} disabled={saving} className="gold-btn px-8 py-3.5 text-sm disabled:opacity-70">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          حفظ الإعدادات
        </button>
        {saved && (
          <span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
            <CheckCircle2 size={17} />
            تم الحفظ
          </span>
        )}
      </div>
    </div>
  );
}
