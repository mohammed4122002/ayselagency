// Centralized photography library (Unsplash direct links, corporate mood
// matching the navy/gold identity). Sizes are tuned per usage.

const u = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const IMAGES = {
  heroBg: u("1519389950473-47ba0277781c", 2000),
  ctaBg: u("1477959858617-67f85cf4f1df", 1800),
  aboutMain: u("1522071820081-009f0129c71c", 1200),
  aboutSmall: u("1556761175-b413da4baf72", 800),
  divisions: {
    tech: u("1498050108023-c5249f4df085", 1200),
    media: u("1561070791-2526d30994b5", 1200),
    marketing: u("1460925895917-afdab827c52f", 1200),
    ai: u("1518770660439-4636190af475", 1200),
  } as Record<string, string>,
  portfolio: {
    branding: u("1558655146-9f40138edfeb", 1200),
    social: u("1511707171634-5f897ff02aa9", 1200),
    web: u("1467232004584-a241de8bcf5d", 1200),
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
