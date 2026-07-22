import { notFound } from "next/navigation";
import { ArrowUpRight, Check, FolderKanban, Tag } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import Reveal from "@/components/ui/Reveal";
import { getDivisions, getProject, getProjects, getSettings } from "@/lib/data";
import { portfolioImage } from "@/lib/images";
import type { Locale } from "@/lib/types";
import { loc } from "@/lib/types";

export const revalidate = 300;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale as Locale;

  const [project, projects, divisions, settings, t, tp] = await Promise.all([
    getProject(id),
    getProjects(),
    getDivisions(),
    getSettings(),
    getTranslations("project"),
    getTranslations("portfolio"),
  ]);

  if (!project) notFound();

  const related = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* banner */}
        <section className="navy-band pb-16 pt-36">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <Link
              href="/#portfolio"
              className="section-label-light mb-6 inline-flex"
            >
              ← {t("back")}
            </Link>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
              {loc(project, "title", locale)}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-4 py-1.5 text-sm font-bold text-gold-300 ring-1 ring-gold-500/40">
                <Tag size={14} />
                {tp(`categories.${project.category}`)}
              </span>
            </div>
          </div>
        </section>

        {/* main image */}
        <section className="bg-white pb-16 sm:pb-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Reveal className="-mt-10">
              <div className="img-frame aspect-video rounded-2xl border-4 border-white shadow-2xl shadow-navy-900/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portfolioImage(project.category, project.image_url)}
                  alt={loc(project, "title", locale)}
                  className="rounded-xl"
                />
              </div>
            </Reveal>

            <div className="mt-14 grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Reveal>
                  <h2 className="mb-5 text-2xl font-bold text-ink">{t("overview")}</h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="text-[17px] leading-relaxed text-body sm:text-lg">
                    {loc(project, "description", locale)}
                  </p>
                </Reveal>
                {project.external_link ? (
                  <Reveal delay={0.2}>
                    <a
                      href={project.external_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gold-btn mt-8 px-7 py-3.5 text-sm"
                    >
                      {t("visit")}
                      <ArrowUpRight size={16} className="rtl:-scale-x-100" />
                    </a>
                  </Reveal>
                ) : null}
              </div>

              <Reveal delay={0.15}>
                <aside className="card p-7">
                  <span className="icon-badge mb-5 h-12 w-12">
                    <FolderKanban size={22} />
                  </span>
                  <h3 className="mb-4 font-bold text-ink">{t("deliverables")}</h3>
                  <ul className="space-y-3">
                    {(t.raw("points") as string[]).map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-body">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 ring-1 ring-gold-300">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contact" className="gold-btn mt-7 w-full px-6 py-3.5 text-sm">
                    {t("ctaButton")}
                  </Link>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        {/* related projects */}
        {related.length > 0 && (
          <section className="bg-soft py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <Reveal>
                <h2 className="mb-10 text-center text-2xl font-bold text-ink sm:text-3xl">
                  {t("related")}
                </h2>
              </Reveal>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.1}>
                    <Link href={`/projects/${p.id}`} className="card group block overflow-hidden">
                      <div className="img-frame relative m-4 aspect-[4/3] rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={portfolioImage(p.category, p.image_url)}
                          alt={loc(p, "title", locale)}
                          loading="lazy"
                          className="card-img rounded-lg"
                        />
                      </div>
                      <div className="px-6 pb-6 pt-1">
                        <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-gold-600">
                          {loc(p, "title", locale)}
                        </h3>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer divisions={divisions} settings={settings} locale={locale} />
      <WhatsAppFloat number={settings.contact.whatsapp} />
    </>
  );
}
