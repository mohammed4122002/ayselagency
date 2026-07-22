import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/ar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { ar: `${SITE_URL}/ar`, en: `${SITE_URL}/en` } },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
