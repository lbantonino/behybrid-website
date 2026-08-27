import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  FOOTER_CLUB_LINKS,
  FOOTER_EXPLORE_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_SOCIAL_LINKS,
  activeLinks,
} from "@/lib/nav-links";

/** Colonnes de liens : celles qui n'ont plus aucun lien actif disparaissent. */
const FOOTER_COLUMNS = [
  { title: "Explore", links: activeLinks(FOOTER_EXPLORE_LINKS) },
  { title: "Club", links: activeLinks(FOOTER_CLUB_LINKS) },
  { title: "Follow", links: activeLinks(FOOTER_SOCIAL_LINKS) },
].filter((column) => column.links.length > 0);

const LEGAL_LINKS = activeLinks(FOOTER_LEGAL_LINKS);

function FooterColumn({
  title,
  links,
  className = "",
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3.5 md:gap-3 ${className}`}>
      <span className="font-display text-label font-bold uppercase tracking-wide text-accent md:text-label">
        {title}
      </span>
      {links.map((link) => {
        const isExternal = link.href.startsWith("http");
        return (
          <Link
            key={link.href}
            href={link.href}
            // Les réseaux sociaux s'ouvrent à côté, sans quitter le site.
            {...(isExternal
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
            className="text-body-sm text-muted transition-colors hover:text-ink"
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="overflow-x-clip border-t border-line bg-bg">
      <div className="bg-bg-alt">
        <Container className="flex flex-col gap-4 py-12 md:flex-row md:items-start md:justify-between md:gap-10">
          <Reveal from="left">
            <p className="font-display text-h3 font-extrabold uppercase md:text-h3">
              <span className="text-accent">Stay</span> In The Loop
            </p>
            <p className="mt-0.5 text-body-sm text-muted md:mt-1.5 md:text-body-sm">
              Early event access, club news, training insights.
            </p>
          </Reveal>
          <Reveal from="right" duration={4000} delay={150}>
            <NewsletterForm />
          </Reveal>
        </Container>
      </div>

      <Container className="grid grid-cols-3 gap-x-8 gap-y-9 pb-10 pt-12 md:grid-cols-[repeat(4,max-content)] md:justify-between md:gap-10 md:pb-10 md:pt-16">
        <Reveal from="left" className="col-span-3 md:col-span-1 md:self-center">
          <Image
            src="/logo/logo-site.png"
            alt="BEHYBRID — Run Club Brussels"
            width={909}
            height={163}
            className="h-auto w-[150px] md:w-[180px]"
          />
        </Reveal>
        {FOOTER_COLUMNS.map((column, index) => (
          <Reveal
            key={column.title}
            from="right"
            duration={4000}
            delay={150 + index * 150}
          >
            <FooterColumn title={column.title} links={column.links} />
          </Reveal>
        ))}
      </Container>

      <Container className="flex flex-col items-start gap-4 border-t border-line py-7 text-left text-[12px] text-faint md:flex-row md:items-center md:justify-between md:gap-2 md:py-6 md:text-body-sm">
        <span>© 2026 BEHYBRID — Brussels</span>
        {LEGAL_LINKS.length > 0 ? (
          <div className="grid w-full grid-cols-3 justify-between md:flex md:w-auto md:gap-8">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </footer>
  );
}
