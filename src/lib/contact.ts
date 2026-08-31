import { isPlausibleEmail } from "@/lib/brevo";
import { CLUB_EMAIL } from "@/lib/site";

/**
 * Formulaire de contact : le message part par email chez le club.
 *
 * On n'enregistre rien nulle part, et c'est délibéré. Stocker les messages en
 * base obligerait à construire un endroit pour les consulter, que personne
 * n'ouvrirait. La boîte mail de Gianluca est déjà cet endroit.
 *
 * Ce fichier lit la clé d'API Brevo : il ne doit jamais être importé depuis un
 * composant client.
 */

export const CONTACT_TOPICS = [
  { value: "joining", label: "Joining the club" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export type ContactMessage = {
  firstName: string;
  lastName: string;
  email: string;
  topic: ContactTopic;
  message: string;
  /** Champ piège : toujours vide chez un humain. Voir `sendContactMessage`. */
  company?: string;
};

export type ContactResult = "sent" | "invalid" | "error";

/** Les valeurs saisies finissent dans un email en HTML : jamais brutes. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LIMITS = { name: 80, email: 200, message: 4000 };

/**
 * Valide et normalise la saisie. Renvoie `null` si quelque chose ne va pas,
 * sans préciser quoi : le formulaire signale déjà les champs manquants côté
 * navigateur, et détailler ici n'aiderait qu'un robot.
 */
function parse(input: Partial<ContactMessage>): ContactMessage | null {
  const firstName = input.firstName?.trim() ?? "";
  const lastName = input.lastName?.trim() ?? "";
  const email = input.email?.trim().toLowerCase() ?? "";
  const message = input.message?.trim() ?? "";
  const topic = CONTACT_TOPICS.find((t) => t.value === input.topic)?.value;

  if (!firstName || firstName.length > LIMITS.name) return null;
  if (!lastName || lastName.length > LIMITS.name) return null;
  if (!email || email.length > LIMITS.email || !isPlausibleEmail(email))
    return null;
  // Dix caractères : en dessous, il n'y a pas de message, seulement un test.
  if (message.length < 10 || message.length > LIMITS.message) return null;
  if (!topic) return null;

  return { firstName, lastName, email, topic, message };
}

export async function sendContactMessage(
  input: Partial<ContactMessage>,
): Promise<ContactResult> {
  /*
    Champ piège rempli : c'est un robot. On répond 'sent' et on n'envoie rien.

    Mentir est ici le bon comportement : signaler le rejet apprendrait à
    l'auteur du robot quel champ éviter, alors qu'un succès simulé le laisse
    croire que le spam est passé. Un humain ne peut pas déclencher ce cas, le
    champ étant masqué et hors du parcours au clavier.
  */
  if (input.company) {
    console.warn("Contact : message ignoré, champ piège rempli.");
    return "sent";
  }

  const data = parse(input);

  if (!data) return "invalid";

  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || CLUB_EMAIL;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? "BEHYBRID";

  if (!apiKey || !to || !senderEmail) {
    console.error(
      "Contact : configuration absente (BREVO_API_KEY, CONTACT_TO_EMAIL, BREVO_SENDER_EMAIL).",
    );
    return "error";
  }

  const topicLabel = CONTACT_TOPICS.find((t) => t.value === data.topic)!.label;
  const fullName = `${data.firstName} ${data.lastName}`;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json" },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: to }],
        // Répondre dans la boîte mail suffit alors à écrire au visiteur, sans
        // avoir à recopier son adresse.
        replyTo: { email: data.email, name: fullName },
        subject: `${topicLabel} — ${fullName}`,
        htmlContent: `
          <div style="font-family:system-ui,sans-serif;line-height:1.6">
            <p><strong>${escapeHtml(fullName)}</strong> &lt;${escapeHtml(data.email)}&gt;</p>
            <p><strong>Sujet :</strong> ${escapeHtml(topicLabel)}</p>
            <hr />
            <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
          </div>
        `,
      }),
    });

    if (response.ok) return "sent";

    console.error(
      "Contact : Brevo a répondu",
      response.status,
      await response.text(),
    );
    return "error";
  } catch (cause) {
    console.error("Contact : appel Brevo impossible", cause);
    return "error";
  }
}
