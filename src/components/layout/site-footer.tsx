import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";
import { FooterLogo } from "./logo";
import { Container } from "@/components/ui/container";
import {
  FOOTER_CLUB_LINKS,
  FOOTER_EXPLORE_LINKS,
  FOOTER_SOCIAL_LINKS,
} from "@/lib/nav-links";

const LEGAL_LINKS = [
  { label: "Legal Notice", href: "/legal-notice" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-2.5 md:gap-3">
      <span className="font-display text-label font-bold uppercase tracking-wide text-accent md:text-label">
        {title}
      </span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-label text-muted-light transition-colors hover:text-ink md:text-body-sm"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="bg-bg-alt">
        <Container className="flex flex-col gap-4 py-[50px] md:flex-row md:items-center md:justify-between md:gap-10">
          <div>
            <p className="font-display text-h3 font-extrabold uppercase md:text-h3">
              <span className="text-accent">Stay</span> In The Loop
            </p>
            <p className="mt-1.5 text-body-sm text-muted md:mt-1.5 md:text-body-sm">
              Early event access, club news, training insights.
            </p>
          </div>
          <NewsletterForm />
        </Container>
      </div>

      <Container className="grid grid-cols-3 gap-4 pb-7 pt-8 md:grid-cols-[1fr_200px_200px_220px] md:gap-10 md:pb-10 md:pt-16">
        <div className="col-span-3 md:col-span-1">
          <FooterLogo className="h-3 w-auto md:h-4 md:w-[160px]" />
          <p className="mt-0.5 text-caption uppercase tracking-wide text-faint md:mt-2.5 md:text-label md:leading-tight md:tracking-[2px]">
            Run Club Brussels.
          </p>
        </div>
        <FooterColumn title="Explore" links={FOOTER_EXPLORE_LINKS} />
        <FooterColumn title="Club" links={FOOTER_CLUB_LINKS} />
        <FooterColumn title="Follow" links={FOOTER_SOCIAL_LINKS} />
      </Container>

      <Container className="flex flex-col items-center gap-2 border-t border-line py-5 text-center text-label text-faint md:flex-row md:items-center md:justify-between md:text-left md:py-6 md:text-body-sm">
        <span>© 2026 BEHYBRID — Brussels</span>
        <div className="flex gap-4 md:gap-8">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
