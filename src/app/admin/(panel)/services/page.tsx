"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, Plus, Trash2, X } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Division, Service } from "@/lib/types";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted outline-none focus:border-gold-500";

export default function ServicesAdmin() {
  const [divisions, setDivisions] = useState<Division[] | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [newAr, setNewAr] = useState("");
  const [newEn, setNewEn] = useState("");

  const load = useCallback(async () => {
    const db = getSupabaseBrowser();
    const [{ data: divs }, { data: svcs }] = await Promise.all([
      db.from("divisions").select("*").order("sort_order"),
      db.from("services").select("*").order("sort_order"),
    ]);
    setDivisions(
      ((divs as Division[]) ?? []).map((d) => ({
        ...d,
        services: ((svcs as Service[]) ?? []).filter((s) => s.division_id === d.id),
      }))
    );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addService = async (divisionId: string) => {
    if (!newAr || !newEn) return;
    const div = divisions?.find((d) => d.id === divisionId);
    const maxOrder = Math.max(0, ...(div?.services?.map((s) => s.sort_order) ?? []));
    await getSupabaseBrowser().from("services").insert({
      division_id: divisionId,
      name_ar: newAr,
      name_en: newEn,
      sort_order: maxOrder + 1,
    });
    setAdding(null);
    setNewAr("");
    setNewEn("");
    load();
  };

  const removeService = async (id: string) => {
    if (!confirm("حذف هذه الخدمة؟")) return;
    await getSupabaseBrowser().from("services").delete().eq("id", id);
    load();
  };

  const toggleService = async (s: Service) => {
    await getSupabaseBrowser()
      .from("services")
      .update({ published: !s.published })
      .eq("id", s.id);
    load();
  };

  if (!divisions) return <Loader2 className="animate-spin text-gold-500" size={28} />;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-extrabold">الأقسام والخدمات</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        {divisions.map((d) => (
          <section key={d.id} className="glass-card p-6">
            <div className="mb-1 font-extrabold" dir="ltr">
              {d.name_ar}
            </div>
            <div className="mb-5 text-sm font-semibold text-gold-600">{d.tagline_ar}</div>

            <ul className="space-y-2">
              {d.services?.map((s) => (
                <li
                  key={s.id}
                  className={`flex items-center gap-3 rounded-xl border border-line bg-soft px-4 py-2.5 text-sm ${
                    s.published ? "" : "opacity-50"
                  }`}
                >
                  <span className="flex-1">{s.name_ar}</span>
                  <span className="text-xs text-muted" dir="ltr">
                    {s.name_en}
                  </span>
                  <button
                    onClick={() => toggleService(s)}
                    title={s.published ? "إخفاء" : "إظهار"}
                    className={`rounded-lg p-1.5 transition-colors ${
                      s.published
                        ? "text-emerald-600 hover:bg-emerald-500/10"
                        : "text-muted hover:bg-white/5"
                    }`}
                  >
                    <Check size={15} />
                  </button>
                  <button
                    onClick={() => removeService(s.id)}
                    className="rounded-lg p-1.5 text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>

            {adding === d.id ? (
              <div className="mt-4 space-y-3">
                <input
                  placeholder="اسم الخدمة (عربي)"
                  value={newAr}
                  onChange={(e) => setNewAr(e.target.value)}
                  className={inputCls}
                />
                <input
                  placeholder="Service name (English)"
                  dir="ltr"
                  value={newEn}
                  onChange={(e) => setNewEn(e.target.value)}
                  className={inputCls}
                />
                <div className="flex gap-2">
                  <button onClick={() => addService(d.id)} className="gold-btn px-5 py-2 text-xs">
                    إضافة
                  </button>
                  <button
                    onClick={() => setAdding(null)}
                    className="ghost-btn px-5 py-2 text-xs"
                  >
                    <X size={13} />
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAdding(d.id);
                  setNewAr("");
                  setNewEn("");
                }}
                className="ghost-btn mt-4 px-5 py-2.5 text-xs"
              >
                <Plus size={14} />
                إضافة خدمة
              </button>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
