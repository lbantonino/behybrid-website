import type { Metadata } from "next";
import {
  LegalDoc,
  LegalFacts,
  LegalLink,
  LegalList,
  LegalSection,
} from "@/components/legal/legal-doc";
import { CLUB, HOST } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal Notice — BEHYBRID Run Club Brussels",
  description:
    "Who publishes and hosts the BEHYBRID Run Club Brussels website.",
};

/*
  Mentions légales. Obligations belges pour une ASBL disposant d'un site :
  dénomination, forme juridique, numéro d'entreprise, siège, et identité de
  l'hébergeur. Toutes les valeurs viennent de src/lib/legal.ts, pour que les
  trois pages ne puissent pas diverger.
*/
export default function Page() {
  const identity = [
    { label: "Legal name", value: CLUB.legalName },
    { label: "Legal form", value: "Non-profit association (ASBL) under Belgian law" },
    { label: "Company number", value: CLUB.companyNumber },
    { label: "VAT", value: "Not subject to VAT" },
    { label: "Registered office", value: CLUB.addressEn },
    { label: "Administrators", value: CLUB.administrators.join(", ") },
    { label: "Publication director", value: CLUB.publisher },
    {
      label: "Contact",
      value: (
        <LegalLink href={`mailto:${CLUB.contactEmail}`} external>
          {CLUB.contactEmail}
        </LegalLink>
      ),
    },
  ];

  const identiteFr = [
    { label: "Dénomination", value: CLUB.legalName },
    { label: "Forme juridique", value: CLUB.legalForm },
    { label: "Numéro d'entreprise", value: CLUB.companyNumber },
    { label: "TVA", value: CLUB.vatStatus },
    { label: "Siège social", value: CLUB.address },
    { label: "Administrateurs", value: CLUB.administrators.join(", ") },
    { label: "Responsable de la publication", value: CLUB.publisher },
    {
      label: "Contact",
      value: (
        <LegalLink href={`mailto:${CLUB.contactEmail}`} external>
          {CLUB.contactEmail}
        </LegalLink>
      ),
    },
  ];

  const host = [
    { label: "Host", value: HOST.name },
    { label: "Address", value: HOST.addressEn },
    {
      label: "Website",
      value: (
        <LegalLink href={HOST.website} external>
          vercel.com
        </LegalLink>
      ),
    },
  ];

  return (
    <LegalDoc
      eyebrow="Legal"
      title="Legal Notice"
      titleFr="Mentions légales"
      intro="Who runs this website, who hosts it, and how to reach us. Belgian law requires an association with a website to publish these details."
      introFr="Qui édite ce site, qui l'héberge, et comment nous joindre. Le droit belge impose à une association disposant d'un site d'en publier les informations."
      childrenFr={
        <>
          <LegalSection level={3} title="Éditeur du site">
            <p>
              Ce site est édité par l&apos;association ci-dessous, qui en assume
              la responsabilité éditoriale.
            </p>
            <LegalFacts rows={identiteFr} />
          </LegalSection>

          <LegalSection level={3} title="Hébergeur">
            <p>
              Le site est hébergé par la société suivante, qui n&apos;intervient
              pas sur son contenu.
            </p>
            <LegalFacts
              rows={[
                { label: "Hébergeur", value: HOST.name },
                { label: "Adresse", value: HOST.address },
                {
                  label: "Site",
                  value: (
                    <LegalLink href={HOST.website} external>
                      vercel.com
                    </LegalLink>
                  ),
                },
              ]}
            />
          </LegalSection>

          <LegalSection level={3} title="Propriété intellectuelle">
            <p>
              Le nom BEHYBRID, le logo, les textes, la mise en page et les
              photographies publiés sur ce site appartiennent à
              l&apos;association ou à ses membres, qui en ont autorisé
              l&apos;usage. Ils sont protégés par le droit d&apos;auteur.
            </p>
            <p>
              Toute reproduction ou réutilisation, même partielle, en dehors du
              cadre privé, suppose notre accord écrit préalable. Une demande
              suffit, elle est généralement bien accueillie.
            </p>
            <p>
              Les photographies montrent des membres du club. Si vous
              apparaissez sur l&apos;une d&apos;elles et souhaitez qu&apos;elle
              soit retirée, écrivez-nous : nous la retirons sans discuter et
              sans vous demander de motif.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Responsabilité">
            <p>
              Les informations publiées ici, notamment les dates, horaires et
              lieux des entraînements, sont données de bonne foi et peuvent
              changer, en particulier selon la météo. Vérifiez le calendrier ou
              nos réseaux avant de vous déplacer.
            </p>
            <p>
              La course à pied est une activité physique. Chacun participe sous
              sa propre responsabilité et reste juge de son état de santé.
              L&apos;association n&apos;est pas responsable des accidents
              survenus lors des sorties, sauf faute de sa part.
            </p>
            <p>
              Le site renvoie vers Instagram, TikTok et Strava. Nous ne
              contrôlons ni leur contenu ni leurs pratiques : leurs propres
              conditions s&apos;y appliquent.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Données personnelles">
            <p>
              La façon dont ce site traite les données personnelles est décrite
              dans notre{" "}
              <LegalLink href="/privacy">politique de confidentialité</LegalLink>
              . L&apos;usage des cookies, ou plutôt leur absence, est expliqué
              dans la{" "}
              <LegalLink href="/cookie-policy">politique de cookies</LegalLink>.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Droit applicable">
            <p>
              Ces mentions relèvent du droit belge. En cas de litige, et à
              défaut de solution amiable, les cours et tribunaux de{" "}
              {CLUB.city} sont compétents.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Signaler un contenu">
            <p>
              Une erreur, un contenu inapproprié, une photo à retirer ? Écrivez
              à{" "}
              <LegalLink href={`mailto:${CLUB.contactEmail}`} external>
                {CLUB.contactEmail}
              </LegalLink>{" "}
              ou passez par la{" "}
              <LegalLink href="/contact">page contact</LegalLink>. Nous
              répondons généralement sous 24 heures.
            </p>
          </LegalSection>
        </>
      }
    >
      <LegalSection title="Site publisher">
        <p>
          This website is published by the association below, which is
          editorially responsible for it.
        </p>
        <LegalFacts rows={identity} />
      </LegalSection>

      <LegalSection title="Hosting">
        <p>
          The website is hosted by the company below, which plays no part in its
          content.
        </p>
        <LegalFacts rows={host} />
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The BEHYBRID name, the logo, the texts, the layout and the photographs
          published here belong to the association or to its members, who have
          agreed to their use. They are protected by copyright.
        </p>
        <p>
          Any reproduction or reuse outside private use, even partial, requires
          our prior written agreement. Just ask, we usually say yes.
        </p>
        <p>
          The photographs show club members. If you appear in one and would
          rather it were taken down, write to us: we remove it, no questions
          asked.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p>
          The information published here, in particular the dates, times and
          locations of training sessions, is given in good faith and may change,
          especially with the weather. Check the calendar or our social accounts
          before heading out.
        </p>
        <p>
          Running is a physical activity. Everyone takes part under their own
          responsibility and remains the judge of their own fitness. The
          association is not liable for accidents during sessions, except where
          it is at fault.
        </p>
        <p>
          This site links to Instagram, TikTok and Strava. We control neither
          their content nor their practices: their own terms apply there.
        </p>
      </LegalSection>

      <LegalSection title="Personal data">
        <p>
          How this website handles personal data is described in our{" "}
          <LegalLink href="/privacy">Privacy Policy</LegalLink>. The use of
          cookies, or rather their absence, is explained in the{" "}
          <LegalLink href="/cookie-policy">Cookie Policy</LegalLink>.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          This notice is governed by Belgian law. In the event of a dispute, and
          failing an amicable solution, the courts of {CLUB.city} have
          jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="Reporting content">
        <p>
          Spotted a mistake, inappropriate content, or a photo you want removed?
          Write to{" "}
          <LegalLink href={`mailto:${CLUB.contactEmail}`} external>
            {CLUB.contactEmail}
          </LegalLink>{" "}
          or use the <LegalLink href="/contact">contact page</LegalLink>. We
          usually reply within 24 hours.
        </p>
      </LegalSection>

      <LegalSection title="At a glance">
        <LegalList
          items={[
            "We publish this site ourselves, as a Belgian non-profit association.",
            "We do not sell anything on it and we run no advertising.",
            "Everything we do with your data is explained in plain language.",
          ]}
        />
      </LegalSection>
    </LegalDoc>
  );
}
