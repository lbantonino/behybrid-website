import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";
import { FooterLogo } from "./logo";
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
    <div className="flex flex-col gap-3">
      <span className="text-xs font-bold uppercase tracking-wide text-accent">
        {title}
      </span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-muted transition-colors hover:text-ink"
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
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-b border-line px-6 py-10 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-ink">
            Stay <span className="text-accent">in the loop</span>
          </p>
          <p className="text-sm text-muted">
            Early event access, club news, training insights.
          </p>
        </div>
        <NewsletterForm />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-12 md:grid-cols-4 md:px-10">
        <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
          <FooterLogo />
          <p className="text-xs uppercase tracking-wide text-muted">
            Run Club Brussels
          </p>
        </div>
        <FooterColumn title="Explore" links={FOOTER_EXPLORE_LINKS} />
        <FooterColumn title="Club" links={FOOTER_CLUB_LINKS} />
        <FooterColumn title="Follow" links={FOOTER_SOCIAL_LINKS} />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span>© 2026 BEHYBRID — Brussels</span>
        <div className="flex gap-4">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
