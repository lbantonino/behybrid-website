import { subscribeToNewsletter } from '@/lib/brevo';

/**
 * Inscription à la newsletter.
 *
 * Pourquoi une route serveur plutôt qu'un appel direct depuis le formulaire :
 * la clé d'API Brevo donne accès au compte entier. Elle ne doit jamais partir
 * dans le navigateur, donc c'est le serveur qui parle à Brevo.
 */

/**
 * Garde-fou minimal contre l'abus : la route déclenche l'envoi d'un email,
 * sans authentification. Quelques adresses par minute et par IP suffisent
 * largement à un usage normal.
 *
 * Limite assumée : ce compteur vit en mémoire, donc il est propre à chaque
 * instance du serveur et disparaît au redémarrage. Il gêne un script naïf,
 * il n'arrêterait pas une attaque distribuée. Une vraie protection demanderait
 * un compteur partagé (Redis) ou un service dédié ; ce n'est pas justifié pour
 * un formulaire de newsletter de club de course.
 */
const RATE_LIMIT = { max: 5, windowMs: 60_000 };
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }

  entry.count += 1;

  return entry.count > RATE_LIMIT.max;
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || 'inconnue';

  if (isRateLimited(ip)) {
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
