"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import Logo from "@/components/site/Logo";
import { getSupabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const { error } = await getSupabaseBrowser().auth.signInWithPassword({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
    });
    if (error) {
      setError("بيانات الدخول غير صحيحة");
      setLoading(false);
      return;
    }
    router.replace("/admin");
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-navy-800/60 px-4 py-3.5 text-sm text-ink placeholder:text-muted/70 outline-none transition-all focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/20";

  return (
    <main className="grid-pattern flex min-h-svh items-center justify-center px-4">
      <div className="orb orb-gold -top-20 h-[400px] w-[400px] -left-20" />
      <form
        onSubmit={onSubmit}
        className="glass-card relative z-10 w-full max-w-sm space-y-5 p-8"
      >
        <div className="flex justify-center">
          <Logo size={44} />
        </div>
        <h1 className="text-center text-lg font-bold text-muted">
          تسجيل الدخول للوحة التحكم
        </h1>
        <input
          name="email"
          type="email"
          required
          placeholder="البريد الإلكتروني"
          className={inputCls}
          dir="ltr"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="كلمة المرور"
          className={inputCls}
          dir="ltr"
        />
        {error && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 ring-1 ring-red-500/25">
            {error}
          </p>
        )}
        <button
          disabled={loading}
          className="gold-btn w-full px-6 py-3.5 text-sm disabled:opacity-70"
        >
          {loading ? <Loader2 size={17} className="animate-spin" /> : <Lock size={16} />}
          دخول
        </button>
      </form>
    </main>
  );
}
