"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  Inbox,
  LayoutDashboard,
  Layers,
  Loader2,
  LogOut,
  Settings,
  ExternalLink,
} from "lucide-react";
import Logo from "@/components/site/Logo";
import { getSupabaseBrowser } from "@/lib/supabase/client";

const nav = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/messages", label: "الرسائل", icon: Inbox },
  { href: "/admin/projects", label: "الأعمال", icon: Briefcase },
  { href: "/admin/services", label: "الأقسام والخدمات", icon: Layers },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getSupabaseBrowser()
      .auth.getSession()
      .then(({ data }) => {
        if (!data.session) router.replace("/admin/login");
        else setReady(true);
      });
  }, [router]);

  const signOut = async () => {
    await getSupabaseBrowser().auth.signOut();
    router.replace("/admin/login");
  };

  if (!ready) {
    return (
      <main className="flex min-h-svh items-center justify-center">
        <Loader2 className="animate-spin text-gold-500" size={32} />
      </main>
    );
  }

  return (
    <div className="flex min-h-svh">
      <aside className="fixed inset-y-0 start-0 z-40 flex w-64 flex-col border-e border-white/5 bg-navy-900/80 backdrop-blur-xl max-lg:hidden">
        <div className="border-b border-white/5 p-5">
          <Logo size={36} />
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-gold-500/12 text-gold-300 ring-1 ring-gold-500/25"
                    : "text-muted hover:bg-white/5 hover:text-ink"
                }`}
              >
                <n.icon size={18} />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-white/5 p-4">
          <a
            href="/ar"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
          >
            <ExternalLink size={18} />
            عرض الموقع
          </a>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* mobile top nav */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center gap-1 overflow-x-auto border-b border-white/5 bg-navy-900/90 px-3 py-2 backdrop-blur-xl lg:hidden">
        {nav.map((n) => {
          const active = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
                active ? "bg-gold-500/12 text-gold-300" : "text-muted"
              }`}
            >
              <n.icon size={15} />
              {n.label}
            </Link>
          );
        })}
        <button
          onClick={signOut}
          className="ms-auto flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs text-red-400"
        >
          <LogOut size={15} />
        </button>
      </div>

      <main className="flex-1 px-4 py-8 pt-20 sm:px-8 lg:ms-64 lg:pt-8">{children}</main>
    </div>
  );
}
