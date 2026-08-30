/**
 * Garde-fou minimal contre l'abus des routes publiques qui déclenchent un
 * envoi d'email. Quelques envois par minute et par adresse IP suffisent
 * largement à un usage normal.
 *
 * Limite assumée : ce compteur vit en mémoire, il est donc propre à chaque
 * instance du serveur et disparaît au redémarrage. Il gêne un script naïf, il
 * n'arrêterait pas une attaque distribuée. Une vraie protection demanderait un
 * compteur partagé (Redis) ou un service dédié ; ce n'est pas justifié pour les
 * formulaires d'un club de course.
 */
const WINDOW_MS = 60_000;

/** Un compteur par usage, pour que le contact et la newsletter ne se gênent pas. */
const buckets = new Map<string, Map<string, { count: number; resetAt: number }>>();

export function isRateLimited(scope: string, key: string, max: number) {
  const bucket = buckets.get(scope) ?? new Map();
  buckets.set(scope, bucket);

  const now = Date.now();
  const entry = bucket.get(key);

  if (!entry || now > entry.resetAt) {
    bucket.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;

  return entry.count > max;
}

/** Adresse du visiteur, telle que la transmet l'hébergeur. */
export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');

  return forwardedFor?.split(',')[0]?.trim() || 'inconnue';
}
