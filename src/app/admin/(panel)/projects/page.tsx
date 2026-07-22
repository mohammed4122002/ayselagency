"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";

const categories = ["branding", "social", "web", "motion", "ai"];
const catLabels: Record<string, string> = {
  branding: "هويات بصرية",
  social: "سوشال ميديا",
  web: "مواقع وتطبيقات",
  motion: "موشن جرافيك",
  ai: "ذكاء اصطناعي",
};

const empty: Partial<Project> = {
  title_ar: "",
  title_en: "",
  category: "branding",
  description_ar: "",
  description_en: "",
  image_url: "",
  external_link: "",
  sort_order: 0,
  featured: false,
  published: true,
};

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-muted outline-none focus:border-gold-500";

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Project[] | null>(null);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    const { data } = await getSupabaseBrowser()
      .from("projects")
      .select("*")
      .order("sort_order");
    setItems((data as Project[]) ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const db = getSupabaseBrowser();
      const path = `projects/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
      const { error } = await db.storage.from("media").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;
      const { data } = db.storage.from("media").getPublicUrl(path);
      setEditing((e) => ({ ...e, image_url: data.publicUrl }));
    } catch {
      alert("فشل رفع الصورة، حاول مرة أخرى");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!editing?.title_ar || !editing?.title_en) {
      alert("العنوان بالعربي والإنجليزي مطلوب");
      return;
    }
    setSaving(true);
    const db = getSupabaseBrowser();
    const { id, ...payload } = editing;
    const res = id
      ? await db.from("projects").update(payload).eq("id", id)
      : await db.from("projects").insert(payload);
    setSaving(false);
    if (res.error) {
      alert("حدث خطأ أثناء الحفظ");
      return;
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذا المشروع نهائياً؟")) return;
    await getSupabaseBrowser().from("projects").delete().eq("id", id);
    load();
  };

  if (!items) return <Loader2 className="animate-spin text-gold-500" size={28} />;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">معرض الأعمال</h1>
        <button onClick={() => setEditing({ ...empty })} className="gold-btn px-5 py-2.5 text-sm">
          <Plus size={16} />
          مشروع جديد
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <article key={p.id} className="glass-card overflow-hidden">
            <div className="relative aspect-[4/3] bg-soft">
              {p.image_url ? (
                <Image src={p.image_url} alt={p.title_ar} fill sizes="33vw" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-gold-500/50">
                  <ImageIcon size={30} />
                </div>
              )}
              {!p.published && (
                <span className="absolute top-3 start-3 rounded-full bg-red-500/85 px-3 py-1 text-xs font-bold text-white">
                  مخفي
                </span>
              )}
            </div>
            <div className="p-5">
              <div className="mb-1 text-xs font-semibold text-gold-600">
                {catLabels[p.category] ?? p.category}
              </div>
              <h3 className="font-bold">{p.title_ar}</h3>
              <p className="text-sm text-muted" dir="ltr">
                {p.title_en}
              </p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setEditing(p)} className="ghost-btn px-4 py-2 text-xs">
                  <Pencil size={13} />
                  تعديل
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-red-500/30 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={13} />
                  حذف
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* editor modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="glass-card my-8 w-full max-w-2xl space-y-4 !bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editing.id ? "تعديل المشروع" : "مشروع جديد"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-muted hover:text-ink">
                <X size={22} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="العنوان (عربي)"
                value={editing.title_ar ?? ""}
                onChange={(e) => setEditing({ ...editing, title_ar: e.target.value })}
                className={inputCls}
              />
              <input
                placeholder="Title (English)"
                dir="ltr"
                value={editing.title_en ?? ""}
                onChange={(e) => setEditing({ ...editing, title_en: e.target.value })}
                className={inputCls}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <select
                value={editing.category ?? "branding"}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className={inputCls}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {catLabels[c]}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="الترتيب"
                value={editing.sort_order ?? 0}
                onChange={(e) =>
                  setEditing({ ...editing, sort_order: Number(e.target.value) })
                }
                className={inputCls}
              />
            </div>

            <textarea
              placeholder="الوصف (عربي)"
              rows={2}
              value={editing.description_ar ?? ""}
              onChange={(e) => setEditing({ ...editing, description_ar: e.target.value })}
              className={inputCls}
            />
            <textarea
              placeholder="Description (English)"
              dir="ltr"
              rows={2}
              value={editing.description_en ?? ""}
              onChange={(e) => setEditing({ ...editing, description_en: e.target.value })}
              className={inputCls}
            />

            <div className="flex flex-wrap items-center gap-4">
              <label className="ghost-btn cursor-pointer px-5 py-2.5 text-xs">
                {uploading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <ImageIcon size={14} />
                )}
                {uploading ? "جاري الرفع..." : "رفع صورة"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadImage(f);
                  }}
                />
              </label>
              {editing.image_url && (
                <span className="relative h-16 w-24 overflow-hidden rounded-lg">
                  <Image src={editing.image_url} alt="" fill sizes="96px" className="object-cover" />
                </span>
              )}
            </div>

            <input
              placeholder="رابط خارجي (Behance مثلاً — اختياري)"
              dir="ltr"
              value={editing.external_link ?? ""}
              onChange={(e) => setEditing({ ...editing, external_link: e.target.value })}
              className={inputCls}
            />

            <div className="flex gap-6 text-sm">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.published ?? true}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="h-4 w-4 accent-[#d4af37]"
                />
                منشور
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.featured ?? false}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="h-4 w-4 accent-[#d4af37]"
                />
                مميز
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEditing(null)} className="ghost-btn px-6 py-3 text-sm">
                إلغاء
              </button>
              <button
                onClick={save}
                disabled={saving || uploading}
                className="gold-btn px-8 py-3 text-sm disabled:opacity-70"
              >
                {saving && <Loader2 size={15} className="animate-spin" />}
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
