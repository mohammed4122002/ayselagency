// Centralized media library (Unsplash photography + stock video, corporate
// mood matching the navy/gold identity). Sizes tuned per usage.

const u = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

// Cinematic hero background video (night city / tech mood).
// The browser tries sources in order; if all fail, the poster photo stays.
export const HERO_VIDEO_SOURCES = [
  "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
  "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-11748-large.mp4",
];

export const IMAGES = {
  heroPoster: u("1451187580459-43490279c0fa", 2000),
  ctaBg: u("1477959858617-67f85cf4f1df", 1800),
  aboutMain: u("1552664730-d307ca884978", 1200),
  aboutSmall: u("1556761175-b413da4baf72", 800),
  divisions: {
    tech: u("1498050108023-c5249f4df085", 1200),
    media: u("1561070791-2526d30994b5", 1200),
    marketing: u("1460925895917-afdab827c52f", 1200),
    ai: u("1677442136019-21780ecad995", 1200),
  } as Record<string, string>,
  portfolio: {
    branding: u("1558655146-9f40138edfeb", 1200),
    social: u("1611162617213-7d7a39e9b1d7", 1200),
    web: u("1551650975-87deedd944c3", 1200),
    apps: u("1512941937669-90a1b58e7e9c", 1200),
    ecommerce: u("1563013544-824ae1b704d3", 1200),
    motion: u("1574717024653-61fd2cf4d44d", 1200),
    ai: u("1485827404703-89b55fcc595e", 1200),
  } as Record<string, string>,
  avatars: [
    u("1507003211169-0a1dd7228f2d", 300),
    u("1494790108377-be9c29b29330", 300),
    u("1472099645785-5658abf4ff4e", 300),
    u("1573497019940-1c28c88b4f3e", 300),
    u("1560250097-0b93528c311a", 300),
  ],
};

export function portfolioImage(category: string, imageUrl: string) {
  return imageUrl || IMAGES.portfolio[category] || IMAGES.portfolio.branding;
}

export function divisionImage(slug: string) {
  return IMAGES.divisions[slug] || IMAGES.divisions.tech;
}
