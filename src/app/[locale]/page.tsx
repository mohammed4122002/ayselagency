import { setRequestLocale } from "next-intl/server";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Divisions from "@/components/site/Divisions";
import About from "@/components/site/About";
import Stats from "@/components/site/Stats";
import Portfolio from "@/components/site/Portfolio";
import Process from "@/components/site/Process";
import Testimonials from "@/components/site/Testimonials";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollTools from "@/components/site/ScrollTools";
import { getDivisions, getProjects, getSettings, getTestimonials } from "@/lib/data";
import type { Locale } from "@/lib/types";

// Revalidate content from Supabase every 5 minutes
export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [divisions, projects, testimonials, settings] = await Promise.all([
    getDivisions(),
    getProjects(),
    getTestimonials(),
    getSettings(),
  ]);

  return (
    <>
      <ScrollTools />
      <Header />
      <main>
        <Hero stats={settings.stats} />
        <Marquee divisions={divisions} locale={locale as Locale} />
        <Divisions divisions={divisions} />
        <About projects={projects} />
        <Stats stats={settings.stats} />
        <Portfolio projects={projects} behanceUrl={settings.social.behance} />
        <Process />
        <Testimonials items={testimonials} />
        <Contact divisions={divisions} settings={settings} />
      </main>
      <Footer divisions={divisions} settings={settings} locale={locale as Locale} />
      <WhatsAppFloat number={settings.contact.whatsapp} />
    </>
  );
}
