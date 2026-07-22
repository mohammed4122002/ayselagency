"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Inbox, Layers, MailOpen } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";

type Counts = {
  messages: number;
  unread: number;
  projects: number;
  services: number;
};

export default function AdminHome() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const db = getSupabaseBrowser();
    Promise.all([
      db.from("messages").select("id", { count: "exact", head: true }),
      db.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false),
      db.from("projects").select("id", { count: "exact", head: true }),
      db.from("services").select("id", { count: "exact", head: true }),
    ]).then(([m, u, p, s]) =>
      setCounts({
        messages: m.count ?? 0,
        unread: u.count ?? 0,
        projects: p.count ?? 0,
        services: s.count ?? 0,
      })
    );
  }, []);

  const cards = [
    { label: "إجمالي الرسائل", value: counts?.messages, icon: Inbox, href: "/admin/messages" },
    { label: "رسائل غير مقروءة", value: counts?.unread, icon: MailOpen, href: "/admin/messages" },
    { label: "الأعمال المنشورة", value: counts?.projects, icon: Briefcase, href: "/admin/projects" },
    { label: "الخدمات", value: counts?.services, icon: Layers, href: "/admin/services" },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-extrabold">نظرة عامة</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="glass-card block p-6">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/12 text-gold-400 ring-1 ring-gold-500/25">
              <c.icon size={20} />
            </span>
            <div className="text-3xl font-extrabold text-gradient-gold">
              {c.value ?? "…"}
            </div>
            <div className="mt-1 text-sm text-muted">{c.label}</div>
          </Link>
        ))}
      </div>
      <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted">
        أهلاً بك في لوحة تحكم Aysel Agency. من هنا تقدر تدير رسائل التواصل، معرض
        الأعمال، الأقسام والخدمات، وإعدادات الموقع (بيانات التواصل، السوشال ميديا،
        والإحصائيات).
      </p>
    </div>
  );
}
