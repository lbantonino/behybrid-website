import type { Metadata } from "next";
import {
  LegalDoc,
  LegalLink,
  LegalList,
  LegalSection,
} from "@/components/legal/legal-doc";
import { CLUB } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy — BEHYBRID Run Club Brussels",
  description:
    "This website sets no cookies at all. Here is what that means, and how it was verified.",
};

/*
  Politique de cookies.

  Le contenu de cette page repose sur une mesure, pas sur une déclaration
  d'intention : chargement des quatre pages publiques dans un navigateur, puis
  relevé des cookies, du stockage local et des requêtes sortantes. Résultat au
  02/09/2026 : zéro, zéro, zéro.

  À REFAIRE si l'on ajoute une mesure d'audience, une vidéo intégrée, une carte,
  une police distante ou un espace membre. Chacun de ces ajouts déposerait des
  cookies et rendrait cette page fausse, ainsi qu'obligatoire la bannière de
  consentement dont on se passe aujourd'hui.
*/
export default function Page() {
  return (
    <LegalDoc
      eyebrow="Cookies"
      title="Cookie Policy"
      titleFr="Politique de cookies"
      intro="This website sets no cookies. Not a reduced set, not essential ones only: none at all. Here is what that means, and how we checked."
      introFr="Ce site ne dépose aucun cookie. Pas un nombre réduit, pas seulement les indispensables : aucun. Voici ce que cela implique, et comment nous l'avons vérifié."
      childrenFr={
        <>
          <LegalSection level={3} title="Aucun cookie, et c'est vérifiable">
            <p>
              Nous avons chargé les quatre pages publiques du site dans un
              navigateur et relevé ce qu&apos;elles laissaient derrière elles.
            </p>
            <LegalList
              items={[
                "Cookies déposés : aucun.",
                "Données conservées dans le navigateur : aucune.",
                "Requêtes vers un autre site que le nôtre : aucune.",
              ]}
            />
            <p>
              Vous pouvez le constater vous-même : ouvrez les outils de
              développement de votre navigateur, onglet Application ou Stockage.
              Vous n&apos;y trouverez rien à notre nom.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Pourquoi il n'y a pas de bandeau">
            <p>
              Le bandeau de consentement n&apos;est obligatoire que si un site
              dépose des cookies non indispensables. Ce n&apos;est pas notre cas.
            </p>
            <p>
              Vous en afficher un serait absurde et même trompeur : il vous
              demanderait d&apos;accepter quelque chose qui n&apos;existe pas.
              Nous préférons cette page, qui vous dit simplement qu&apos;il
              n&apos;y a rien à accepter.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Ce que nous n'utilisons pas">
            <p>
              La liste compte davantage que la précédente, parce que ces outils
              sont présents sur presque tous les sites.
            </p>
            <LegalList
              items={[
                "Aucune mesure d'audience, ni Google Analytics ni équivalent.",
                "Aucun pixel publicitaire, ni Meta, ni TikTok, ni autre.",
                "Aucun bouton de partage embarqué : nos liens vers Instagram, TikTok et Strava sont de simples liens.",
                "Aucune police ni script chargé depuis un serveur extérieur.",
                "Aucune carte ni vidéo intégrée.",
              ]}
            />
            <p>
              Conséquence directe : nous ne savons pas combien de personnes
              visitent ce site, ni d&apos;où elles viennent. C&apos;est le prix
              de cette page, et nous le trouvons raisonnable.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Une nuance honnête">
            <p>
              Quand vous quittez notre site en cliquant vers Instagram, TikTok
              ou Strava, vous entrez chez eux. Ils déposent alors leurs propres
              cookies, selon leurs propres règles, sur lesquelles nous
              n&apos;avons aucune prise.
            </p>
            <p>
              De même, si vous cliquez le lien de confirmation d&apos;un email de
              newsletter, vous passez par Brevo, qui vous ramène ensuite ici.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Si cela change">
            <p>
              Le jour où le site ouvrira un espace membre ou une boutique, des
              cookies deviendront nécessaires, ne serait-ce que pour vous garder
              connecté ou retenir un panier.
            </p>
            <p>
              Cette page sera alors réécrite <em>avant</em> la mise en service,
              et un vrai bandeau de consentement apparaîtra. Nous ne
              l&apos;ajouterons pas en silence.
            </p>
          </LegalSection>

          <LegalSection level={3} title="Une question">
            <p>
              Écrivez à{" "}
              <LegalLink href={`mailto:${CLUB.privacyEmail}`} external>
                {CLUB.privacyEmail}
              </LegalLink>{" "}
              ou passez par la{" "}
              <LegalLink href="/contact">page contact</LegalLink>. Le traitement
              de vos données est détaillé dans la{" "}
              <LegalLink href="/privacy">politique de confidentialité</LegalLink>
              .
            </p>
          </LegalSection>
        </>
      }
    >
      <LegalSection title="No cookies, and you can check">
        <p>
          We loaded all four public pages in a browser and looked at what they
          left behind.
        </p>
        <LegalList
          items={[
            "Cookies set: none.",
            "Data kept in your browser: none.",
            "Requests to any site other than ours: none.",
          ]}
        />
        <p>
          You can see it for yourself: open your browser&apos;s developer tools,
          Application or Storage tab. You will find nothing under our name.
        </p>
      </LegalSection>

      <LegalSection title="Why there is no banner">
        <p>
          A consent banner is only required when a site sets non-essential
          cookies. That is not our case.
        </p>
        <p>
          Showing you one would be pointless, and even misleading: it would ask
          you to accept something that does not exist. We prefer this page,
          which simply tells you there is nothing to accept.
        </p>
      </LegalSection>

      <LegalSection title="What we do not use">
        <p>
          This list matters more than the previous one, because these tools are
          on almost every website.
        </p>
        <LegalList
          items={[
            "No analytics, neither Google Analytics nor any equivalent.",
            "No advertising pixel, from Meta, TikTok or anyone else.",
            "No embedded share buttons: our links to Instagram, TikTok and Strava are plain links.",
            "No font or script loaded from an outside server.",
            "No embedded map or video.",
          ]}
        />
        <p>
          The direct consequence: we do not know how many people visit this
          site, or where they come from. That is the price of this page, and we
          find it reasonable.
        </p>
      </LegalSection>

      <LegalSection title="One honest caveat">
        <p>
          When you leave our site by clicking through to Instagram, TikTok or
          Strava, you are on their turf. They set their own cookies, under their
          own rules, over which we have no say.
        </p>
        <p>
          Likewise, clicking the confirmation link in a newsletter email takes
          you through Brevo before bringing you back here.
        </p>
      </LegalSection>

      <LegalSection title="If this changes">
        <p>
          The day the site opens a member area or a shop, cookies will become
          necessary, if only to keep you signed in or remember a basket.
        </p>
        <p>
          This page will be rewritten <em>before</em> that goes live, and a real
          consent banner will appear. We will not add one quietly.
        </p>
      </LegalSection>

      <LegalSection title="Any question">
        <p>
          Write to{" "}
          <LegalLink href={`mailto:${CLUB.privacyEmail}`} external>
            {CLUB.privacyEmail}
          </LegalLink>{" "}
          or use the <LegalLink href="/contact">contact page</LegalLink>. How we
          handle your data is set out in the{" "}
          <LegalLink href="/privacy">Privacy Policy</LegalLink>.
        </p>
      </LegalSection>
    </LegalDoc>
  );
}
