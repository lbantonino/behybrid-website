import { sendContactMessage, type ContactMessage } from '@/lib/contact';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';

/**
 * Envoi d'un message de contact. Route serveur, comme la newsletter : la clé
 * d'API Brevo ne doit jamais partir dans le navigateur.
 */
export async function POST(request: Request) {
  // Plus strict que la newsletter : un message de contact se rédige, on n'en
  // envoie pas trois par minute de bonne foi.
  if (isRateLimited('contact', getClientIp(request), 3)) {
    return Response.json({ status: 'error' }, { status: 429 });
  }

  let payload: Partial<ContactMessage>;

  try {
    payload = (await request.json()) as Partial<ContactMessage>;
  } catch {
    return Response.json({ status: 'invalid' }, { status: 400 });
  }

  const result = await sendContactMessage(payload);
  const httpStatus = result === 'invalid' ? 400 : result === 'error' ? 502 : 200;

  return Response.json({ status: result }, { status: httpStatus });
}
