export type SocialLink = {
  label: string;
  link: string;
};

export function filterSocialLinks(links: SocialLink[]): SocialLink[] {
  return links.filter((item) => Boolean(item.link?.trim()));
}
