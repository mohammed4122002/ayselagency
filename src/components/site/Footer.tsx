import { Globe2, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import type { Division, Locale, SiteSettings } from "@/lib/types";
import { loc } from "@/lib/types";

export default async function Footer({
  divisions,
  settings,
  locale,
}: {
  divisions: Division[];
  settings: SiteSettings;
  locale: Locale;
}) {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="navy-band">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            {t("tagline")}
          </p>
          <div className="mt-6">
            <SocialLinks social={settings.social} onDark />
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-extrabold text-gold-300">{t("quickLinks")}</h3>
          <ul className="space-y-3 text-sm text-white/65">
            {(
              [
                [`/${locale}#divisions`, tn("divisions")],
                [`/${locale}#about`, tn("about")],
                [`/${locale}#portfolio`, tn("portfolio")],
                [`/${locale}#process`, tn("process")],
                [`/${locale}#contact`, tn("contact")],
              ] as const
            ).map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-gold-300">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-extrabold text-gold-300">{t("divisions")}</h3>
          <ul className="space-y-3 text-sm text-white/65">
            {divisions.map((d) => (
              <li key={d.id}>
                <a href={`/${locale}#divisions`} className="transition-colors hover:text-gold-300">
                  {loc(d, "name", locale)} — {loc(d, "tagline", locale)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 font-extrabold text-gold-300">{t("contact")}</h3>
          <ul className="space-y-4 text-sm text-white/65">
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/8 text-gold-300">
                <Mail size={16} />
              </span>
              <a
                href={`mailto:${settings.contact.email}`}
                dir="ltr"
                className="transition-colors hover:text-gold-300"
              >
                {settings.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/8 text-gold-300">
                <Globe2 size={16} />
              </span>
              {locale === "ar"
                ? settings.contact.address_ar
                : settings.contact.address_en}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/55">
        © {year} Aysel Agency. {t("rights")}
      </div>
    </footer>
  );
}
