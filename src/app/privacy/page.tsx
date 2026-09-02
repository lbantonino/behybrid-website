import type { Metadata } from "next";
import {
  LegalDoc,
  LegalFacts,
  LegalLink,
  LegalList,
  LegalSection,
} from "@/components/legal/legal-doc";
import { CLUB, DPA, PROCESSORS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — BEHYBRID Run Club Brussels",
  description:
    "How BEHYBRID Run Club Brussels collects, uses and protects your personal data.",
};

/*
  Politique de confidentialité.

  Chaque affirmation de cette page a été vérifiée dans le code, pas recopiée
  d'un modèle. En particulier :

  · le formulaire de contact n'enregistre rien en base, il envoie un email
    (src/lib/contact.ts) ;
  · la newsletter passe par un double opt-in Brevo, seule l'adresse est
    transmise (src/lib/brevo.ts) ;
  · l'adresse IP ne sert qu'au compteur anti-abus, en mémoire, une minute
    (src/lib/rate-limit.ts) ;
  · Supabase ne contient que les entraînements, aucune donnée personnelle ;
  · aucun cookie, aucun stockage local, aucune requête vers un tiers, mesuré
    dans un navigateur sur les quatre pages publiques.

  Si l'un de ces points change, cette page doit changer le même jour.
*/
export default function Page() {
  const controller = [
    { label: "Controller", value: CLUB.legalName },
    { label: "Company number", value: CLUB.companyNumber },
    { label: "Registered office", value: CLUB.addressEn },
    {
      label: "Contact",
      value: (
        <LegalLink href={`mailto:${CLUB.privacyEmail}`} external>
          {CLUB.privacyEmail}
        </LegalLink>
      ),
    },
  ];

  const responsable = [
    { label: "Responsable du traitement", value: CLUB.legalName },
    { label: "Numéro d'entreprise", value: CLUB.companyNumber },
    { label: "Siège social", value: CLUB.address },
    {
      label: "Contact",
      value: (
        <LegalLink href={`mailto:${CLUB.privacyEmail}`} external>
          {CLUB.privacyEmail}
        </LegalLink>
      ),
    },
  ];

  return (
    <LegalDoc
      eyebrow="Privacy"
      title="Privacy Policy"
      titleFr="Politique de confidentialité"
      intro="What we collect, why, for how long, and what you can ask us to do about it. Written to be read, not to be skipped."
      introFr="Ce que nous collectons, pourquoi, pendant combien de temps, et ce que vous pouvez nous demander. Écrite pour être lue, pas pour être sautée."
      childrenFr={
        <>
          <LegalSection level={3} title="En résumé">
            <LegalList
              items={[
                "Deux formulaires seulement collectent des données : la newsletter et le contact.",
                "Aucun cookie, aucune mesure d'audience, aucun traçage publicitaire.",
                "Vos messages ne sont enregistrés dans aucune base : ils arrivent par email.",
                "Nous ne vendons ni ne partageons vos données, jamais.",
              ]}
            />
          </LegalSection>

          <LegalSection level={3} title="Responsable du traitement">
            <LegalFacts rows={responsable} />
          </LegalSection>

          <LegalSection level={3} title="Ce que nous collectons, et seulement cela">
            <p>
              <strong className="text-ink">Newsletter.</strong> Votre adresse
              email, rien d&apos;autre. Pas de nom, pas de prénom.
            </p>
            <p>
              <strong className="text-ink">Formulaire de contact.</strong> Votre
              prénom, votre nom, votre adresse email, le sujet choisi et votre
              message.
            </p>
            <p>
              <strong className="text-ink">Adresse IP.</strong> Elle est utilisée
              une minute, en mémoire du serveur, pour compter les envois et
              empêcher qu&apos;un programme automatique n&apos;abuse des
              formulaires. Elle n&apos;est ni enregistrée, ni consultée, ni
              rattachée à vous.
            </p>
            <p>
              Il n&apos;y a pas de compte utilisateur sur ce site, donc pas de
              mot de passe, pas d&apos;historique de navigation, pas de profil.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Pourquoi, et sur quelle base">
            <LegalFacts
              rows={[
                {
                  label: "Newsletter",
                  value:
                    "Vous envoyer les actualités du club. Base : votre consentement, confirmé par un clic dans un email.",
                },
                {
                  label: "Formulaire de contact",
                  value:
                    "Répondre à votre message. Base : votre demande, et notre intérêt légitime à y répondre.",
                },
                {
                  label: "Adresse IP",
                  value:
                    "Empêcher l'abus automatisé des formulaires. Base : notre intérêt légitime à protéger le service.",
                },
              ]}
            />
          </LegalSection>

          <LegalSection level={3} title="La newsletter fonctionne en double confirmation">
            <p>
              Quand vous saisissez votre adresse, vous n&apos;êtes pas inscrit
              pour autant. Un email vous est envoyé, et vous ne rejoignez la
              liste qu&apos;après avoir cliqué le lien qu&apos;il contient.
            </p>
            <p>
              Ce choix nous coûte des inscriptions et nous l&apos;assumons : il
              garantit que personne ne peut inscrire l&apos;adresse de
              quelqu&apos;un d&apos;autre, et il nous permet de prouver votre
              accord, ce que le RGPD exige.
            </p>
            <p>
              Chaque email contient un lien de désinscription. Un clic suffit,
              sans justification, et sans passer par nous.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Vos messages ne sont stockés nulle part">
            <p>
              Le formulaire de contact n&apos;écrit dans aucune base de données.
              Votre message part directement dans la boîte email du club, comme
              si vous nous aviez écrit vous-même.
            </p>
            <p>
              C&apos;est un choix, et il vous protège : il n&apos;existe aucun
              fichier de messages à pirater, à exporter ou à oublier quelque
              part. La contrepartie est que votre message vit dans une boîte
              email, avec la durée de conservation qui va avec.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Combien de temps">
            <LegalFacts
              rows={[
                {
                  label: "Adresse newsletter",
                  value:
                    "Jusqu'à votre désinscription. Ensuite, Brevo garde une trace de la désinscription pour ne plus vous écrire, ce qui est aussi une obligation.",
                },
                {
                  label: "Messages de contact",
                  value:
                    "Le temps de traiter votre demande, puis dans l'historique de la boîte email du club. Vous pouvez demander leur suppression.",
                },
                {
                  label: "Adresse IP",
                  value: "Moins d'une minute, en mémoire vive. Jamais écrite sur un disque.",
                },
              ]}
            />
          </LegalSection>

          <LegalSection level={3} title="Qui d'autre voit ces données">
            <p>
              Deux prestataires, pas un de plus. Ils agissent pour notre compte
              et n&apos;ont pas le droit d&apos;utiliser vos données pour eux.
            </p>
            {PROCESSORS.map((p) => (
              <p key={p.name}>
                <strong className="text-ink">{p.name}</strong> ({p.country}) —{" "}
                {p.role}{" "}
                <LegalLink href={p.website} external>
                  Leur politique de confidentialité
                </LegalLink>
                .
              </p>
            ))}
            <p>
              Vercel étant établi aux États-Unis, un transfert hors Union
              européenne est possible. Il est encadré par les clauses
              contractuelles types de la Commission européenne.
            </p>
            <p>
              Nous ne vendons rien, ne louons rien et ne partageons vos données
              avec aucun annonceur, aucun réseau social, aucun courtier. Il
              n&apos;y a rien à ajouter à cette phrase.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Vos droits">
            <p>
              Le RGPD vous donne les droits suivants, et il vous suffit
              d&apos;un email pour les exercer.
            </p>
            <LegalList
              items={[
                "Savoir quelles données nous avons sur vous, et en obtenir une copie.",
                "Les faire corriger si elles sont inexactes.",
                "Les faire effacer.",
                "Limiter ou refuser leur utilisation.",
                "Les recevoir dans un format réutilisable.",
                "Retirer votre consentement à tout moment, sans que cela remette en cause ce qui a été fait avant.",
              ]}
            />
            <p>
              Écrivez à{" "}
              <LegalLink href={`mailto:${CLUB.privacyEmail}`} external>
                {CLUB.privacyEmail}
              </LegalLink>
              . Nous répondons sous un mois, et en pratique bien plus vite.
            </p>
            <p>
              Si notre réponse ne vous satisfait pas, vous pouvez saisir
              l&apos;{DPA.name}, {DPA.address} —{" "}
              <LegalLink href={DPA.website} external>
                autoriteprotectiondonnees.be
              </LegalLink>
              .
            </p>
          </LegalSection>

          <LegalSection level={3} title="Sécurité">
            <p>
              Le site est servi en HTTPS. Les clés d&apos;accès à nos
              prestataires restent sur le serveur et ne sont jamais envoyées à
              votre navigateur. Les formulaires sont protégés contre les envois
              automatisés.
            </p>
            <p>
              Aucun système n&apos;est infaillible, mais la meilleure protection
              reste celle-ci : nous conservons le strict minimum, et le
              formulaire de contact ne conserve rien du tout.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Mineurs">
            <p>
              Si vous êtes mineur, demandez l&apos;accord d&apos;un parent avant
              de vous inscrire à la newsletter. Si vous constatez qu&apos;un
              enfant s&apos;est inscrit sans cet accord, écrivez-nous et nous
              supprimerons l&apos;adresse.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Évolutions">
            <p>
              Cette page changera le jour où le site changera, par exemple s&apos;il
              ouvre un espace membre ou une boutique. La date en haut de page
              indique la dernière relecture.
            </p>
          </LegalSection>
        </>
      }
    >
      <LegalSection title="The short version">
        <LegalList
          items={[
            "Only two forms collect data: the newsletter and the contact form.",
            "No cookies, no analytics, no advertising trackers.",
            "Your messages are not stored in any database: they arrive by email.",
            "We never sell or share your data.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Who is responsible">
        <LegalFacts rows={controller} />
      </LegalSection>

      <LegalSection title="What we collect, and nothing else">
        <p>
          <strong className="text-ink">Newsletter.</strong> Your email address,
          nothing else. No name, no surname.
        </p>
        <p>
          <strong className="text-ink">Contact form.</strong> Your first name,
          last name, email address, the topic you pick, and your message.
        </p>
        <p>
          <strong className="text-ink">IP address.</strong> Used for one minute,
          in the server&apos;s memory, to count submissions and stop automated
          abuse of the forms. It is never written down, never looked at, never
          tied to you.
        </p>
        <p>
          There are no user accounts on this site, so no passwords, no browsing
          history, no profile.
        </p>
      </LegalSection>

      <LegalSection title="Why, and on what basis">
        <LegalFacts
          rows={[
            {
              label: "Newsletter",
              value:
                "To send you club news. Basis: your consent, confirmed by clicking a link in an email.",
            },
            {
              label: "Contact form",
              value:
                "To answer your message. Basis: your own request, and our legitimate interest in replying.",
            },
            {
              label: "IP address",
              value:
                "To prevent automated abuse of the forms. Basis: our legitimate interest in protecting the service.",
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="The newsletter uses double confirmation">
        <p>
          Entering your address does not subscribe you. We send you an email,
          and you only join the list after clicking the link inside it.
        </p>
        <p>
          This costs us subscribers and we accept that: it makes it impossible
          to sign someone else up, and it lets us prove your consent, which the
          GDPR requires.
        </p>
        <p>
          Every email carries an unsubscribe link. One click, no explanation
          needed, no need to go through us.
        </p>
      </LegalSection>

      <LegalSection title="Your messages are not stored anywhere">
        <p>
          The contact form writes to no database. Your message goes straight to
          the club&apos;s mailbox, exactly as if you had written to us yourself.
        </p>
        <p>
          That is a deliberate choice, and it protects you: there is no message
          file to be breached, exported or forgotten somewhere. The trade-off is
          that your message lives in a mailbox, with the retention that implies.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <LegalFacts
          rows={[
            {
              label: "Newsletter address",
              value:
                "Until you unsubscribe. Brevo then keeps a record of the unsubscribe so we never write to you again, which is also an obligation.",
            },
            {
              label: "Contact messages",
              value:
                "As long as needed to handle your request, then in the club mailbox history. You can ask us to delete them.",
            },
            {
              label: "IP address",
              value: "Under a minute, in memory. Never written to disk.",
            },
          ]}
        />
      </LegalSection>

      <LegalSection title="Who else sees this data">
        <p>
          Two service providers, not one more. They act on our behalf and may
          not use your data for themselves.
        </p>
        {PROCESSORS.map((p) => (
          <p key={p.name}>
            <strong className="text-ink">{p.name}</strong> ({p.countryEn}) —{" "}
            {p.roleEn}{" "}
            <LegalLink href={p.website} external>
              Their privacy policy
            </LegalLink>
            .
          </p>
        ))}
        <p>
          Vercel is based in the United States, so a transfer outside the
          European Union is possible. It is covered by the European
          Commission&apos;s standard contractual clauses.
        </p>
        <p>
          We sell nothing, rent nothing, and share your data with no advertiser,
          no social network and no data broker. There is nothing to add to that
          sentence.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          The GDPR gives you the rights below, and one email is enough to
          exercise them.
        </p>
        <LegalList
          items={[
            "Know what data we hold about you, and get a copy.",
            "Have it corrected if it is wrong.",
            "Have it erased.",
            "Restrict or object to its use.",
            "Receive it in a reusable format.",
            "Withdraw your consent at any time, without affecting what was done before.",
          ]}
        />
        <p>
          Write to{" "}
          <LegalLink href={`mailto:${CLUB.privacyEmail}`} external>
            {CLUB.privacyEmail}
          </LegalLink>
          . We answer within a month, and in practice far sooner.
        </p>
        <p>
          If our answer does not satisfy you, you may lodge a complaint with the
          Belgian Data Protection Authority, {DPA.address} —{" "}
          <LegalLink href={DPA.website} external>
            autoriteprotectiondonnees.be
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          The site is served over HTTPS. The keys to our providers stay on the
          server and are never sent to your browser. The forms are protected
          against automated submissions.
        </p>
        <p>
          No system is perfect, but the best protection is this one: we keep the
          bare minimum, and the contact form keeps nothing at all.
        </p>
      </LegalSection>

      <LegalSection title="Minors">
        <p>
          If you are under 18, ask a parent before subscribing to the
          newsletter. If you find that a child has subscribed without that
          agreement, write to us and we will delete the address.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          This page will change when the site does, for instance if it opens a
          member area or a shop. The date at the top shows the last review.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
