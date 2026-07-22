import type { Division, Project, SiteSettings, Testimonial } from "./types";

// Bundled fallback content, mirrors the Supabase seed. Used when the database
// is unreachable (e.g. sandboxed builds) so the site always renders complete.

export const fallbackDivisions: Division[] = [
  {
    id: "tech",
    slug: "tech",
    sort_order: 1,
    name_ar: "Aysel Tech",
    name_en: "Aysel Tech",
    tagline_ar: "الخدمات البرمجية",
    tagline_en: "Software Services",
    description_ar:
      "حلول برمجية متكاملة تواكب أحدث التقنيات وتدعم نمو أعمالك الرقمية.",
    description_en:
      "End-to-end software solutions built with the latest technologies to power your digital growth.",
    icon: "code",
    published: true,
    services: [
      { id: "t1", division_id: "tech", sort_order: 1, name_ar: "تطوير مواقع الويب", name_en: "Web Development", published: true },
      { id: "t2", division_id: "tech", sort_order: 2, name_ar: "تطوير تطبيقات الجوال", name_en: "Mobile App Development", published: true },
      { id: "t3", division_id: "tech", sort_order: 3, name_ar: "تطوير الهويات البصرية الرقمية", name_en: "Digital Brand Development", published: true },
      { id: "t4", division_id: "tech", sort_order: 4, name_ar: "أنظمة محاسبية و ERP", name_en: "Accounting & ERP Systems", published: true },
      { id: "t5", division_id: "tech", sort_order: 5, name_ar: "حلول برمجية مخصصة", name_en: "Custom Software Solutions", published: true },
    ],
  },
  {
    id: "media",
    slug: "media",
    sort_order: 2,
    name_ar: "Aysel Media",
    name_en: "Aysel Media",
    tagline_ar: "التصميم والإبداع",
    tagline_en: "Design & Creativity",
    description_ar: "تصاميم احترافية تروي قصة علامتك التجارية وتميزها في السوق.",
    description_en:
      "Professional designs that tell your brand story and set you apart in the market.",
    icon: "palette",
    published: true,
    services: [
      { id: "m1", division_id: "media", sort_order: 1, name_ar: "تصميم UX / UI", name_en: "UX / UI Design", published: true },
      { id: "m2", division_id: "media", sort_order: 2, name_ar: "تصميم المواقع", name_en: "Web Design", published: true },
      { id: "m3", division_id: "media", sort_order: 3, name_ar: "تصميم منشورات السوشيال ميديا", name_en: "Social Media Design", published: true },
      { id: "m4", division_id: "media", sort_order: 4, name_ar: "تصميم الهويات البصرية", name_en: "Brand Identity Design", published: true },
      { id: "m5", division_id: "media", sort_order: 5, name_ar: "تصميم الشعارات", name_en: "Logo Design", published: true },
    ],
  },
  {
    id: "marketing",
    slug: "marketing",
    sort_order: 3,
    name_ar: "Aysel Marketing",
    name_en: "Aysel Marketing",
    tagline_ar: "التسويق الرقمي",
    tagline_en: "Digital Marketing",
    description_ar:
      "استراتيجيات تسويقية مدروسة توصلك إلى جمهورك المستهدف وتحقق نتائج ملموسة.",
    description_en:
      "Data-driven marketing strategies that reach your audience and deliver measurable results.",
    icon: "megaphone",
    published: true,
    services: [
      { id: "k1", division_id: "marketing", sort_order: 1, name_ar: "تحسين محركات البحث SEO", name_en: "Search Engine Optimization (SEO)", published: true },
      { id: "k2", division_id: "marketing", sort_order: 2, name_ar: "إدارة صفحات السوشيال ميديا", name_en: "Social Media Management", published: true },
      { id: "k3", division_id: "marketing", sort_order: 3, name_ar: "إدارة المتاجر الإلكترونية", name_en: "E-commerce Management", published: true },
      { id: "k4", division_id: "marketing", sort_order: 4, name_ar: "الإعلانات الممولة", name_en: "Paid Advertising", published: true },
      { id: "k5", division_id: "marketing", sort_order: 5, name_ar: "استراتيجيات المحتوى", name_en: "Content Strategy", published: true },
    ],
  },
  {
    id: "ai",
    slug: "ai",
    sort_order: 4,
    name_ar: "Aysel AI",
    name_en: "Aysel AI",
    tagline_ar: "الذكاء الاصطناعي والأتمتة",
    tagline_en: "AI & Automation",
    description_ar:
      "نسخّر قوة الذكاء الاصطناعي لأتمتة عملياتك وإنتاج محتوى مبتكر.",
    description_en:
      "We harness the power of AI to automate your operations and create innovative content.",
    icon: "brain",
    published: true,
    services: [
      { id: "a1", division_id: "ai", sort_order: 1, name_ar: "أتمتة العمليات Automation", name_en: "Process Automation", published: true },
      { id: "a2", division_id: "ai", sort_order: 2, name_ar: "تصميم ومونتاج فيديوهات AI", name_en: "AI Video Production", published: true },
      { id: "a3", division_id: "ai", sort_order: 3, name_ar: "توليد الصور بالذكاء الاصطناعي", name_en: "AI Image Generation", published: true },
      { id: "a4", division_id: "ai", sort_order: 4, name_ar: "روبوتات المحادثة الذكية", name_en: "Intelligent Chatbots", published: true },
      { id: "a5", division_id: "ai", sort_order: 5, name_ar: "حلول AI مخصصة للأعمال", name_en: "Custom AI Business Solutions", published: true },
    ],
  },
];

export const fallbackProjects: Project[] = [
  {
    id: "p1",
    title_ar: "هوية بصرية متكاملة",
    title_en: "Complete Brand Identity",
    category: "branding",
    description_ar:
      "تصميم هوية بصرية شاملة لعلامة تجارية ناشئة تشمل الشعار والألوان والمطبوعات.",
    description_en:
      "A full brand identity for an emerging brand including logo, colors and print collateral.",
    image_url: "",
    external_link: "",
    sort_order: 1,
    featured: true,
    published: true,
  },
  {
    id: "p2",
    title_ar: "حملة سوشال ميديا",
    title_en: "Social Media Campaign",
    category: "social",
    description_ar:
      "إدارة وتصميم حملة سوشال ميديا متكاملة حققت نمواً ملحوظاً في التفاعل.",
    description_en:
      "Design and management of a full social media campaign with outstanding engagement growth.",
    image_url: "",
    external_link: "",
    sort_order: 2,
    featured: true,
    published: true,
  },
  {
    id: "p3",
    title_ar: "متجر إلكتروني",
    title_en: "E-commerce Store",
    category: "web",
    description_ar:
      "تطوير متجر إلكتروني متكامل مع بوابات دفع وتجربة مستخدم سلسة.",
    description_en:
      "A complete e-commerce store with payment gateways and a seamless user experience.",
    image_url: "",
    external_link: "",
    sort_order: 3,
    featured: true,
    published: true,
  },
  {
    id: "p4",
    title_ar: "روبوت محادثة ذكي",
    title_en: "AI Chatbot",
    category: "ai",
    description_ar:
      "روبوت محادثة بالذكاء الاصطناعي لخدمة العملاء يعمل على مدار الساعة.",
    description_en: "An AI-powered customer service chatbot working around the clock.",
    image_url: "",
    external_link: "",
    sort_order: 4,
    featured: true,
    published: true,
  },
  {
    id: "p5",
    title_ar: "فيديو موشن جرافيك",
    title_en: "Motion Graphics Video",
    category: "motion",
    description_ar:
      "فيديو موشن جرافيك إعلاني يشرح خدمات العلامة التجارية بأسلوب جذاب.",
    description_en:
      "A promotional motion graphics video presenting the brand services in an engaging style.",
    image_url: "",
    external_link: "",
    sort_order: 5,
    featured: true,
    published: true,
  },
  {
    id: "p6",
    title_ar: "تطبيق جوال",
    title_en: "Mobile Application",
    category: "web",
    description_ar:
      "تصميم وتطوير تطبيق جوال لإدارة الحجوزات مع لوحة تحكم متكاملة.",
    description_en:
      "Design and development of a booking management mobile app with a full admin panel.",
    image_url: "",
    external_link: "",
    sort_order: 6,
    featured: true,
    published: true,
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "s1",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&auto=format&fit=crop",
    name_ar: "أحمد الخالدي",
    name_en: "Ahmed Al-Khalidi",
    role_ar: "مدير تنفيذي",
    role_en: "CEO",
    text_ar:
      "فريق Aysel حوّل حضورنا الرقمي بالكامل. احترافية عالية والتزام بالمواعيد ونتائج فاقت التوقعات.",
    text_en:
      "The Aysel team completely transformed our digital presence. High professionalism, on-time delivery and results beyond expectations.",
    sort_order: 1,
    published: true,
  },
  {
    id: "s2",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80&auto=format&fit=crop",
    name_ar: "سارة المهندس",
    name_en: "Sara Almohandes",
    role_ar: "مديرة تسويق",
    role_en: "Marketing Manager",
    text_ar:
      "من أفضل الوكالات اللي تعاملنا معها. الهوية البصرية اللي صمموها لنا صارت علامة فارقة في السوق.",
    text_en:
      "One of the best agencies we have worked with. The brand identity they designed became a market differentiator for us.",
    sort_order: 2,
    published: true,
  },
  {
    id: "s3",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80&auto=format&fit=crop",
    name_ar: "محمد العتيبي",
    name_en: "Mohammed Alotaibi",
    role_ar: "مؤسس متجر إلكتروني",
    role_en: "E-commerce Founder",
    text_ar:
      "إدارة متجرنا وإعلاناتنا معهم ضاعفت مبيعاتنا خلال ثلاثة أشهر فقط. أنصح بهم بقوة.",
    text_en:
      "Their store management and ads doubled our sales in just three months. Highly recommended.",
    sort_order: 3,
    published: true,
  },
];

export const fallbackSettings: SiteSettings = {
  contact: {
    email: "info@ayselagency.com",
    phone: "",
    whatsapp: "",
    address_ar: "نخدم عملاءنا حول العالم",
    address_en: "Serving clients worldwide",
  },
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    behance: "https://www.behance.net/mahmoudalagha",
    x: "",
    tiktok: "",
    youtube: "",
  },
  stats: { years: 5, projects: 200, clients: 80, team: 15 },
};
