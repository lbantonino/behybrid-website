import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

/*
  Gabarit des trois pages légales, en deux langues sur une seule page.

  Pourquoi les deux versions empilées plutôt que deux adresses distinctes, ou
  un bouton de bascule :

  · deux adresses (/privacy et /fr/privacy) obligeraient à dupliquer le
    routage, les métadonnées et les liens du pied de page, pour trois pages
    que personne ne lit deux fois ;
  · un bouton de bascule demanderait du JavaScript, alors que ce sont
    précisément les pages qui doivent rester lisibles en toutes circonstances.

  Empilées, elles fonctionnent sans JavaScript, restent imprimables d'un bloc,
  et un lien d'ancrage permet d'aller directement à sa langue. Chaque version
  porte son propre attribut `lang`, sans quoi un lecteur d'écran prononcerait
  le français avec la phonétique anglaise.
*/

export function LegalDoc({
  eyebrow,
  title,
  titleFr,
  intro,
  introFr,
  children,
  childrenFr,
}: {
  eyebrow: string;
  title: string;
  titleFr: string;
  intro: string;
  introFr: string;
  children: React.ReactNode;
  childrenFr: React.ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip py-14 md:py-20">
      <Container className="relative">
        <div className="flex items-center gap-2.5 md:gap-3.5">
          <span className="h-px w-6 bg-accent md:w-8" />
          <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
            {eyebrow}
          </span>
        </div>

        <h1 className="mt-6 font-display text-[36px] font-black uppercase leading-[0.95] tracking-[-0.02em] md:mt-5 md:text-[64px] md:leading-[0.9]">
          {title}
        </h1>

        <p className="mt-5 max-w-[720px] text-body-sm leading-[1.7] text-muted md:text-body">
          {intro}
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[10px] font-bold uppercase tracking-[1.5px] text-faint">
          <span>Last updated {LEGAL_LAST_UPDATED}</span>
          <span aria-hidden>·</span>
          <a
            href="#francais"
            className="text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
          >
            Lire en français
          </a>
        </p>

        <div className="mt-10 max-w-[720px] md:mt-12">{children}</div>

        <hr className="mt-16 max-w-[720px] border-0 border-t border-white/10 md:mt-20" />

        {/*
          `lang="fr"` sur toute la version française : le document est déclaré
          en anglais, un lecteur d'écran prononcerait sinon ce bloc avec la
          phonétique anglaise.
        */}
        <div lang="fr" id="francais" className="scroll-mt-28">
          <h2 className="mt-14 font-display text-[30px] font-black uppercase leading-[0.95] tracking-[-0.02em] md:mt-16 md:text-[48px]">
            {titleFr}
          </h2>

          <p className="mt-5 max-w-[720px] text-body-sm leading-[1.7] text-muted md:text-body">
            {introFr}
          </p>

          <p className="mt-6 font-display text-[10px] font-bold uppercase tracking-[1.5px] text-faint">
            Dernière mise à jour : {LEGAL_LAST_UPDATED}
          </p>

          <div className="mt-10 max-w-[720px] md:mt-12">{childrenFr}</div>
        </div>
      </Container>
    </section>
  );
}

/** Titre de section à l'intérieur d'un document légal. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h3 className="font-display text-[17px] font-black uppercase tracking-[-0.01em] md:text-[20px]">
        {title}
      </h3>
      <div className="mt-3 space-y-3 text-body-sm leading-[1.75] text-muted md:text-body">
        {children}
      </div>
    </section>
  );
}

/** Liste à puces, au même rythme typographique que les paragraphes. */
export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="relative pl-5">
          <span
            aria-hidden
            className="absolute left-0 top-[0.62em] h-1.5 w-1.5 rounded-full bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Bloc d'identité (nom, adresse, numéro d'entreprise…), présenté en paires
 * plutôt qu'en phrases : c'est ce qu'un lecteur ou une autorité vient chercher.
 */
export function LegalFacts({
  rows,
}: {
  rows: { label: string; value: React.ReactNode }[];
}) {
  return (
    <dl className="mt-1 divide-y divide-white/8 border-y border-white/8">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-1 py-3 md:flex-row md:gap-6"
        >
          <dt className="font-display text-[10px] font-bold uppercase tracking-[1.5px] text-faint md:w-52 md:shrink-0 md:pt-1">
            {row.label}
          </dt>
          <dd className="text-body-sm leading-[1.7] text-ink md:text-body">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Lien interne stylé comme le reste du texte légal. */
export function LegalLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "text-ink underline decoration-accent/50 underline-offset-4 transition hover:decoration-accent";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * Marqueur d'information manquante. Visible à dessein : tant qu'une valeur
 * n'est pas confirmée, mieux vaut qu'elle saute aux yeux plutôt que d'être
 * remplacée par une phrase inventée.
 */
export function LegalPending({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-accent/15 px-1.5 py-0.5 font-display text-[11px] font-bold uppercase tracking-[1px] text-accent">
      {children}
    </span>
  );
}
