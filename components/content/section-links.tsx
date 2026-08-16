import { linkPrimary, linkSecondary } from "@/lib/constants";

type SectionLinksProps = {
  links: Array<{
    href: string;
    label: string;
    external?: boolean;
    primary?: boolean;
  }>;
};

export function SectionLinks({ links }: SectionLinksProps) {
  return (
    <nav className="mt-8 flex flex-col gap-2 md:mt-10 md:flex-row md:gap-8">
      {links.map((link) => (
        <a
          key={link.href + link.label}
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener noreferrer" : undefined}
          className={link.primary ? linkPrimary : linkSecondary}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
