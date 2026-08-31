import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CLUB_EMAIL } from "@/lib/site";
import { FOOTER_SOCIAL_LINKS, activeLinks } from "@/lib/nav-links";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact — BEHYBRID Run Club Brussels",
  description:
    "A question, a run with us, or just a hello. Write to BEHYBRID Run Club Brussels.",
};

/** Lucide a retiré les icônes de marque : celle-ci est dessinée à la main. */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Galerie de bas de page. Même motif que celles de l'accueil et du calendrier :
 * en desktop les photos arrivent toutes par la gauche, en commençant par celle
 * de droite ; en mobile elles alternent gauche, droite, gauche.
 */
const CONTACT_GALLERY = [
  {
    file: "gallery-1.jpg",
    from: "left" as const,
    delay: "delay-[0ms] md:delay-[600ms]",
  },
  {
    file: "gallery-contact-1.jpg",
    from: "right-phone" as const,
    delay: "delay-[300ms]",
    /*
      Cette photo est presque carrée (2268 × 1841) là où ses voisines sont
      larges (578 × 320). En mobile, le cadre étant deux fois plus large que
      haut, elle est rognée sur sa hauteur et le centrage par défaut coupait les
      visages : la bande visible commençait au pixel 437 alors que les têtes
      occupent la zone 240 à 570. L'ancrage à 25 % fait glisser la photo vers le
      bas dans son cadre et remonte cette bande à 218.

      Rien à corriger en desktop : le cadre y est plus haut que large, la photo
      est donc cadrée sur sa hauteur et les visages sont entiers.
    */
    position: "object-[50%_25%] md:object-center",
  },
  {
    file: "gallery-contact-3.jpg",
    from: "left" as const,
    delay: "delay-[600ms] md:delay-[0ms]",
  },
];

/** Le lien Instagram vient de la navigation, seule source de vérité du site. */
const INSTAGRAM = activeLinks(FOOTER_SOCIAL_LINKS).find(
  (link) => link.label === "Instagram",
);

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: CLUB_EMAIL,
    href: `mailto:${CLUB_EMAIL}`,
  },
  {
    icon: InstagramIcon,
    label: "Instagram · Fastest reply",
    // "@behybrid.run" se déduit de l'URL : une poignée de moins à tenir à jour.
    value: `@${INSTAGRAM?.href.replace(/\/$/, "").split("/").pop() ?? "behybrid.run"}`,
    href: INSTAGRAM?.href ?? null,
  },
  {
    icon: MapPin,
    label: "Where we meet",
    value: "Parc du Cinquantenaire · Brussels",
    href: null,
  },
];

function Channel({ channel }: { channel: (typeof CHANNELS)[number] }) {
  const Icon = channel.icon;

  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[10px] font-bold uppercase tracking-[1.5px] text-muted">
          {channel.label}
        </span>
        <span className="block truncate font-display text-[14px] font-bold phone-lg:text-[15px] md:text-[16px]">
          {channel.value}
        </span>
      </span>
    </>
  );

  const className =
    "flex items-center gap-3.5 rounded-2xl border border-line bg-bg-alt px-4 py-3.5 md:gap-4 md:px-5 md:py-4.5";

  // Le lieu n'est pas un lien : rien à ouvrir, et un faux lien se paie en clics
  // déçus.
  if (!channel.href) {
    return <div className={className}>{content}</div>;
  }

  const isExternal = channel.href.startsWith("http");

  return (
    <Link
      href={channel.href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`${className} transition-colors hover:border-accent`}
    >
      {content}
    </Link>
  );
}

export default function ContactPage() {
  return (
    <>
      {/*
        Desktop : la section tient dans un écran, le défilement mène ensuite à la
        galerie, puis à la newsletter et au pied de page.

        Chaque colonne porte sa propre hauteur pleine, et c'est volontaire.
        À gauche, l'en-tête reste posé en haut avec les tailles et marges exactes
        de /calendar (passer d'une page à l'autre ne doit rien déplacer), et les
        cartes se centrent dans ce qui reste. À droite, le formulaire se centre
        sur la hauteur totale de l'écran, marge égale en haut et en bas.

        Mobile : aucune contrainte de hauteur, un formulaire de six champs ne
        tient pas dans un écran de téléphone sans descendre sous le plancher de
        lisibilité qu'on s'est fixé.

        Animations : même vocabulaire que le reste du site. Le contenu arrive par
        la gauche, le panneau par la droite, et les cartes en cascade pour que
        l'oeil les prenne une par une plutôt que d'un bloc.
      */}
      <section className="relative overflow-x-clip md:h-[calc(100vh-5rem)] md:overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,241,51,0.14),transparent_68%)] blur-3xl md:-top-32 md:h-[620px] md:w-[620px]" />
        </div>

        <Container className="relative h-full pb-9 pt-7 md:pb-0 md:pt-0">
          <div className="grid gap-8 md:h-full md:grid-cols-2 md:gap-14">
            {/* Colonne gauche : en-tête en haut, cartes centrées dans le reste. */}
            <div className="flex flex-col md:h-full md:min-h-0 md:pt-14">
              <Reveal from="left">
                <div className="flex items-center gap-2.5 md:gap-3.5">
                  <span className="h-px w-6 bg-accent md:w-8" />
                  <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
                    Get In Touch
                  </span>
                </div>

                <h1 className="mt-9 text-center font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:mt-4 md:text-left md:text-[70px] md:leading-[0.9]">
                  Contact
                </h1>

                <p className="mt-3 max-w-[440px] text-center text-body-sm text-muted md:mt-4 md:text-left md:text-body">
                  A question, a run with us, or just a hello. The door is open.
                </p>
              </Reveal>

              <div className="mt-8 md:mt-0 md:flex md:min-h-0 md:flex-1 md:flex-col md:justify-center">
                <div className="flex flex-col gap-2.5 md:gap-4">
                  {CHANNELS.map((channel, index) => (
                    <Reveal
                      key={channel.label}
                      from="left"
                      duration={2200}
                      delay={150 + index * 140}
                    >
                      <Channel channel={channel} />
                    </Reveal>
                  ))}
                </div>

                <Reveal from="left" duration={2200} delay={570}>
                  <p className="mt-5 flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-[1.5px] text-faint md:mt-7">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    Usually replies within 24 h
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Colonne droite : formulaire centré sur la hauteur de l'écran. */}
            <div className="md:flex md:h-full md:min-h-0 md:items-center">
              <Reveal
                from="right"
                duration={2200}
                delay={150}
                className="w-full rounded-2xl border border-line bg-bg-alt p-5 md:p-7"
              >
                <div className="mb-5 flex items-center gap-2.5 md:mb-6 md:gap-3.5">
                  <span className="h-px w-6 bg-accent md:w-8" />
                  <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
                    Send A Message
                  </span>
                </div>

                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-9 grid grid-cols-1 gap-0.5 overflow-x-clip md:mt-14 md:grid-cols-3 md:gap-0">
        {CONTACT_GALLERY.map((photo) => (
          <Reveal
            key={photo.file}
            from={photo.from}
            className={`relative h-[160px] w-full md:h-[340px] ${photo.delay}`}
          >
            <Image
              src={`/photos/${photo.file}`}
              alt="BEHYBRID Run Club Brussels"
              fill
              sizes="(min-width: 860px) 33vw, 100vw"
              className={`object-cover ${photo.position ?? ""}`}
            />
          </Reveal>
        ))}
      </section>
    </>
  );
}
