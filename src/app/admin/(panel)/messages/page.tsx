"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Mail, MailOpen, Trash2 } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { ContactMessage } from "@/lib/types";

export default function MessagesPage() {
  const [items, setItems] = useState<ContactMessage[] | null>(null);

  const load = useCallback(async () => {
    const { data } = await getSupabaseBrowser()
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as ContactMessage[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (m: ContactMessage) => {
    await getSupabaseBrowser()
      .from("messages")
      .update({ is_read: !m.is_read })
      .eq("id", m.id);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذه الرسالة نهائياً؟")) return;
    await getSupabaseBrowser().from("messages").delete().eq("id", id);
    load();
  };

  if (!items) {
    return <Loader2 className="animate-spin text-gold-500" size={28} />;
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-extrabold">رسائل التواصل</h1>
      {items.length === 0 ? (
        <p className="text-muted">لا توجد رسائل بعد.</p>
      ) : (
        <div className="space-y-4">
          {items.map((m) => (
            <article
              key={m.id}
              className={`glass-card p-6 ${m.is_read ? "opacity-70" : ""}`}
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-bold">{m.name}</span>
                <a
                  href={`mailto:${m.email}`}
                  dir="ltr"
                  className="text-sm text-gold-600 hover:underline"
                >
                  {m.email}
                </a>
                {m.phone && (
                  <span dir="ltr" className="text-sm text-muted">
                    {m.phone}
                  </span>
                )}
                {m.service_interest && (
                  <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-600 ring-1 ring-gold-500/25">
                    {m.service_interest}
                  </span>
                )}
                <span className="ms-auto text-xs text-muted">
                  {new Date(m.created_at).toLocaleString("ar", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink/90">
                {m.message}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toggleRead(m)}
                  className="ghost-btn px-4 py-2 text-xs"
                >
                  {m.is_read ? <Mail size={14} /> : <MailOpen size={14} />}
                  {m.is_read ? "تحديد كغير مقروءة" : "تحديد كمقروءة"}
                </button>
                <button
                  onClick={() => remove(m.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <Trash2 size={14} />
                  حذف
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
