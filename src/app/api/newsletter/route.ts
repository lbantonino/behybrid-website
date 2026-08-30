import { subscribeToNewsletter } from '@/lib/brevo';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';

/**
 * Inscription à la newsletter.
 *
 * Pourquoi une route serveur plutôt qu'un appel direct depuis le formulaire :
 * la clé d'API Brevo donne accès au compte entier. Elle ne doit jamais partir
 * dans le navigateur, donc c'est le serveur qui parle à Brevo.
 */

export async function POST(request: Request) {
  if (isRateLimited('newsletter', getClientIp(request), 5)) {
    return Response.json({ status: 'error' }, { status: 429 });
  }

  let email: unknown;

  try {
    ({ email } = (await request.json()) as { email?: unknown });
  } catch {
    return Response.json({ status: 'invalid' }, { status: 400 });
  }

  if (typeof email !== 'string') {
    return Response.json({ status: 'invalid' }, { status: 400 });
  }

  const result = await subscribeToNewsletter(email);

  // "already" n'est pas une erreur : la demande a été comprise et traitée.
  const httpStatus =
    result === 'invalid' ? 400 : result === 'error' ? 502 : 200;

  return Response.json({ status: result }, { status: httpStatus });
}
