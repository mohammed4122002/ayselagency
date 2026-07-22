import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";
import {
  fallbackDivisions,
  fallbackProjects,
  fallbackSettings,
  fallbackTestimonials,
} from "./fallback-data";
import type { Division, Project, SiteSettings, Testimonial } from "./types";

const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

// Each fetch falls back to bundled seed content when the database is
// unreachable, so the public site always renders complete.

export async function getDivisions(): Promise<Division[]> {
  try {
    const [{ data: divisions, error: e1 }, { data: services, error: e2 }] =
      await Promise.all([
        db.from("divisions").select("*").eq("published", true).order("sort_order"),
        db.from("services").select("*").eq("published", true).order("sort_order"),
      ]);
    if (e1 || e2 || !divisions?.length) throw e1 ?? e2 ?? new Error("empty");
    return divisions.map((d) => ({
      ...d,
      services: (services ?? []).filter((s) => s.division_id === d.id),
    }));
  } catch {
    return fallbackDivisions;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await db
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error || !data?.length) throw error ?? new Error("empty");
    return data;
  } catch {
    return fallbackProjects;
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const { data, error } = await db
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) throw error ?? new Error("not found");
    return data;
  } catch {
    return fallbackProjects.find((p) => p.id === id) ?? null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await db
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error || !data?.length) throw error ?? new Error("empty");
    return data;
  } catch {
    return fallbackTestimonials;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await db.from("site_settings").select("*");
    if (error || !data?.length) throw error ?? new Error("empty");
    const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
    return {
      contact: { ...fallbackSettings.contact, ...(map.contact ?? {}) },
      social: { ...fallbackSettings.social, ...(map.social ?? {}) },
      stats: { ...fallbackSettings.stats, ...(map.stats ?? {}) },
    };
  } catch {
    return fallbackSettings;
  }
}
