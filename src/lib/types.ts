export type Division = {
  id: string;
  slug: string;
  sort_order: number;
  name_ar: string;
  name_en: string;
  tagline_ar: string;
  tagline_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
  published: boolean;
  services?: Service[];
};

export type Service = {
  id: string;
  division_id: string;
  sort_order: number;
  name_ar: string;
  name_en: string;
  published: boolean;
};

export type Project = {
  id: string;
  title_ar: string;
  title_en: string;
  category: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  detail_image_url?: string;
  external_link: string;
  sort_order: number;
  featured: boolean;
  published: boolean;
  created_at?: string;
};

export type Testimonial = {
  id: string;
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  text_ar: string;
  text_en: string;
  avatar_url?: string;
  sort_order: number;
  published: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service_interest: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type ContactSettings = {
  email: string;
  phone: string;
  whatsapp: string;
  address_ar: string;
  address_en: string;
};

export type SocialSettings = {
  instagram: string;
  facebook: string;
  linkedin: string;
  behance: string;
  x: string;
  tiktok: string;
  youtube: string;
};

export type StatsSettings = {
  years: number;
  projects: number;
  clients: number;
  team: number;
};

export type SiteSettings = {
  contact: ContactSettings;
  social: SocialSettings;
  stats: StatsSettings;
};

export type Locale = "ar" | "en";

export const loc = (row: Record<string, unknown>, field: string, locale: Locale) =>
  String(row[`${field}_${locale}`] ?? "");
