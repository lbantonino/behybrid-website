/**
 * Le club court à Bruxelles : c'est ce fuseau qui fait foi, pas celui du
 * serveur (temps universel sur Vercel) ni celui du visiteur (qui peut être en
 * voyage). Un membre à New York doit voir le calendrier bruxellois.
 *
 * Module volontairement minuscule et sans dépendance : il est importé aussi
 * bien côté serveur que dans des composants client, et le sortir de
 * `calendar-events.ts` évite d'embarquer tout le jeu d'événements de secours
 * dans le paquet envoyé au navigateur.
 */
export const CLUB_TIME_ZONE = 'Europe/Brussels';

/**
 * Date du jour à Bruxelles.
 *
 * Passe par `Intl` plutôt que par les méthodes de `Date`, qui répondent dans
 * le fuseau de la machine. Le résultat est donc identique sur le serveur et
 * dans le navigateur, ce qui compte : plusieurs composants sont rendus des deux
 * côtés, et deux réponses différentes provoqueraient une erreur d'hydratation
 * React.
 */
export function getClubToday(): {
  year: number;
  month: number;
  day: number;
  iso: string;
} {
  const iso = new Intl.DateTimeFormat('en-CA', {
    timeZone: CLUB_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const [year, month, day] = iso.split('-').map(Number);

  // `month` est ramené sur 0-11, la convention de `Date` et de la grille.
  return { year, month: month - 1, day, iso };
}
