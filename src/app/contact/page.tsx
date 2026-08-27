import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FOOTER_SOCIAL_LINKS, activeLinks } from "@/lib/nav-links";

export const metadata: Metadata = {
  title: "Contact — BEHYBRID Run Club Brussels",
  description:
    "Une question sur le club, un premier run d'essai ? Écris-nous ou retrouve BEHYBRID sur les réseaux.",
};

/**
 * Squelette de la page contact, à étoffer : le formulaire reste à écrire et à
 * brancher. En attendant, elle donne au moins les vrais moyens de nous joindre,
 * ce qui vaut mieux qu'un lien mort dans le menu.
 */
export default function ContactPage() {
  return (
    <section className="relative flex min-h-[calc(100lvh-5rem)] flex-col overflow-x-clip md:h-[calc(100vh-5rem)] md:min-h-0 md:overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,241,51,0.14),transparent_68%)] blur-3xl md:-top-32 md:h-[620px] md:w-[620px]" />
      </div>

      <Container className="relative pt-7 md:pt-14">
        <div className="flex items-center gap-2.5 md:gap-3.5">
          <span className="h-px w-6 bg-accent md:w-8" />
          <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
            Get In Touch
          </span>
        </div>
        <h1 className="mt-9 text-center font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:mt-4 md:text-left md:text-[70px] md:leading-[0.9]">
          Contact
        </h1>
        <p className="mt-4 text-center text-[15px] leading-[1.6] text-muted md:mt-6 md:max-w-[520px] md:text-left md:text-[17px]">
          Une question, une envie de courir avec nous, ou juste un bonjour. La
          porte est ouverte.
        </p>
      </Container>

      <Container className="relative flex flex-1 items-center pb-10 pt-10 md:pb-0 md:pt-0">
        <div className="flex w-full flex-col gap-3">
          {activeLinks(FOOTER_SOCIAL_LINKS).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-between rounded-2xl border border-line bg-bg-alt px-6 py-5 transition-colors hover:border-accent md:px-8 md:py-6"
            >
              <span className="font-display text-[18px] font-black uppercase md:text-[24px]">
                {link.label}
              </span>
              <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
                Ouvrir →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
