import { absoluteUrl } from '@/lib/site';

/**
 * Inscription à la newsletter, via Brevo.
 *
 * Ce fichier ne doit jamais être importé depuis un composant client : il lit
 * `BREVO_API_KEY`, qui donne accès au compte Brevo (envoyer des emails, lire
 * les contacts). Il n'est appelé que par la route serveur `/api/newsletter`.
 */

const BREVO_API = 'https://api.brevo.com/v3';

export type SubscribeResult =
  /** Adresse acceptée, email de confirmation parti. */
  | 'pending'
  /** Déjà inscrite et confirmée : rien n'a été renvoyé. */
  | 'already'
  /** Adresse mal formée ou refusée par Brevo. */
  | 'invalid'
  /** Panne réseau, ou configuration absente côté serveur. */
  | 'error';

/**
 * Validation volontairement permissive : une adresse, un arobase, un point
 * après. Vouloir valider finement une adresse email en expression régulière
 * est une impasse connue, et de toute façon inutile ici : le double opt-in
 * tranche pour de bon, puisqu'une adresse qui n'existe pas ne confirmera
 * jamais. Cette vérification ne sert qu'à éviter un appel réseau pour rien.
 */
export function isPlausibleEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function getConfig() {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);

  if (!apiKey || !Number.isInteger(listId) || !Number.isInteger(templateId)) {
    return null;
  }

  return { apiKey, listId, templateId };
}

type BrevoContact = {
  listIds?: number[];
  emailBlacklisted?: boolean;
};

/**
 * Le contact est-il déjà inscrit à cette liste, et toujours abonné ?
 *
 * `null` signifie inconnu de Brevo. Une personne désinscrite (`emailBlacklisted`)
 * est traitée comme absente : elle a le droit de revenir, et devra reconfirmer.
 */
async function isAlreadySubscribed(
  email: string,
  { apiKey, listId }: { apiKey: string; listId: number },
) {
  const response = await fetch(
    `${BREVO_API}/contacts/${encodeURIComponent(email)}`,
    { headers: { 'api-key': apiKey }, cache: 'no-store' },
  );

  if (response.status === 404) return false;
  if (!response.ok) throw new Error(`Brevo contacts: ${response.status}`);

  const contact = (await response.json()) as BrevoContact;

  return (
    !contact.emailBlacklisted && (contact.listIds ?? []).includes(listId)
  );
}

export async function subscribeToNewsletter(
  email: string,
): Promise<SubscribeResult> {
  const address = email.trim().toLowerCase();

  if (!isPlausibleEmail(address)) return 'invalid';

  const config = getConfig();

  if (!config) {
    console.error(
      'Newsletter : configuration Brevo absente (BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID).',
    );
    return 'error';
  }

  try {
    if (await isAlreadySubscribed(address, config)) return 'already';

    // Brevo envoie lui-même l'email de confirmation et n'inscrit le contact
    // qu'après le clic. La preuve du consentement reste donc chez lui,
    // horodatée, sans que le site ait à la stocker.
    const response = await fetch(`${BREVO_API}/contacts/doubleOptinConfirmation`, {
      method: 'POST',
      headers: {
        'api-key': config.apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: address,
        includeListIds: [config.listId],
        templateId: config.templateId,
        redirectionUrl: absoluteUrl('/newsletter/confirmed'),
      }),
    });

    if (response.ok) return 'pending';

    // Brevo refuse certaines adresses (jetables, syntaxe qu'il juge invalide).
    // C'est la faute du visiteur, pas une panne : on le lui dit.
    if (response.status === 400) {
      console.error('Newsletter : Brevo a refusé l’adresse', await response.text());
      return 'invalid';
    }

    console.error('Newsletter : Brevo a répondu', response.status, await response.text());
    return 'error';
  } catch (cause) {
    console.error('Newsletter : appel Brevo impossible', cause);
    return 'error';
  }
}
