/*
  Identité légale du club, source unique des trois pages légales.

  ────────────────────────────────────────────────────────────────────────
  À COMPLÉTER PAR ANTONINO, avec Gianluca, AVANT LA MISE EN LIGNE.
  Tant qu'une valeur vaut `null`, la page affiche un marqueur visible
  « [à compléter] » plutôt qu'une phrase fausse : une mention légale
  inventée est pire qu'une mention absente.
  ────────────────────────────────────────────────────────────────────────

  Le point qui commande tous les autres est `legalForm`. Les obligations
  belges ne sont pas les mêmes pour une ASBL, une association de fait et une
  activité d'indépendant :

  · ASBL                  numéro d'entreprise et siège social obligatoires,
                          organe d'administration identifiable
  · association de fait   pas de personnalité juridique : ce sont les
                          personnes physiques qui répondent, il faut donc
                          nommer un responsable et donner son adresse
  · indépendant           numéro d'entreprise (BCE) et adresse professionnelle
*/
export const CLUB = {
  /** Nom officiel, tel qu'il doit apparaître dans un acte. */
  legalName: "BEHYBRID ASBL",

  /** Nom d'usage, celui que le public connaît. */
  tradingName: "BEHYBRID",

  /**
   * Forme juridique. Une ASBL a la personnalité juridique : c'est elle qui
   * répond, pas ses membres. D'où l'obligation d'afficher le numéro
   * d'entreprise et le siège social, imposée par le Code des sociétés et des
   * associations dès qu'elle a un site.
   */
  legalForm: "ASBL (association sans but lucratif) de droit belge",

  /** Numéro d'entreprise à la Banque-Carrefour des Entreprises. */
  companyNumber: "BE 1040.238.490",

  /**
   * Non assujettie à la TVA, information donnée par Antonino le 02/09.
   * Mentionné explicitement : l'absence de numéro de TVA sur un site
   * d'association se lit sinon comme un oubli.
   */
  vatStatus: "Non assujettie à la TVA",

  /**
   * Siège social.
   *
   * À VÉRIFIER : Antonino a écrit « 86 rue des alcyos, 1082 ». Le code postal
   * 1082 est celui de Berchem-Sainte-Agathe, et la voie qui s'en approche
   * s'écrit « Rue des Alcyons ». L'orthographe et la commune sont à confirmer
   * sur l'extrait BCE avant la mise en ligne : une adresse de siège fausse
   * dans des mentions légales n'est pas un détail.
   */
  address: "86 Rue des Alcyons, 1082 Berchem-Sainte-Agathe, Belgique",

  /**
   * Responsable de la publication. À confirmer : Antonino a donné une adresse
   * au nom de Gianluca, sans préciser qui est officiellement responsable.
   */
  publisher: null as string | null,

  /** Adresse de contact officielle, donnée par Antonino le 02/09. */
  contactEmail: "gianluca.behybrid@gmail.com",

  /** Adresse à laquelle exercer ses droits sur les données personnelles. */
  privacyEmail: "gianluca.behybrid@gmail.com",

  /** Ville de rattachement, pour la clause de juridiction. */
  city: "Bruxelles",
} as const;

/**
 * Hébergeur du site. Son identité est obligatoire dans les mentions légales
 * belges, au même titre que celle de l'éditeur.
 *
 * Hostinger, confirmé par Antonino le 02/09, et non Vercel comme le prévoyait
 * le README. `hostinger.fr` est la façade française de la société lituanienne
 * Hostinger International Ltd., qui est l'entité à déclarer.
 *
 * À VÉRIFIER, et la conséquence dépasse ces pages : une application Next.js
 * avec des routes serveur ne tourne pas sur une formule d'hébergement mutualisé
 * classique, prévue pour du PHP ou des fichiers statiques. Il faut une offre
 * qui exécute Node.js. À confirmer avant de s'engager, sous peine de découvrir
 * le problème le jour de la mise en ligne.
 */
export const HOST = {
  name: "Hostinger International Ltd.",
  address: "Jonavos g. 60C, 44192 Kaunas, Lituanie",
  website: "https://www.hostinger.fr",
} as const;

/**
 * Sous-traitants au sens du RGPD : les services extérieurs qui voient passer
 * des données personnelles pour le compte du club.
 *
 * Cette liste n'est pas déclarative, elle a été établie en relisant le code et
 * confirmée par Antonino le 02/09. Deux services, pas un de plus.
 *
 * Supabase n'y figure pas : la base ne contient que les entraînements, aucune
 * donnée personnelle. Aucune mesure d'audience, aucun réseau social embarqué,
 * aucune police distante. Vérifié en observant les requêtes réseau des quatre
 * pages publiques : zéro appel sortant vers un tiers.
 */
export const PROCESSORS = [
  {
    name: "Brevo (Sendinblue SAS)",
    country: "France",
    role: "Envoi des emails de confirmation et de la newsletter, hébergement de la liste d'inscrits, acheminement des messages du formulaire de contact.",
    website: "https://www.brevo.com/legal/privacypolicy/",
  },
  {
    name: HOST.name,
    country: "Lituanie",
    role: "Hébergement du site et acheminement des requêtes.",
    website: "https://www.hostinger.fr/politique-de-confidentialite",
  },
] as const;

/**
 * Date de dernière révision des pages légales, affichée en bas de chacune.
 *
 * Écrite à la main et non calculée : elle doit indiquer la dernière fois qu'un
 * humain a relu le texte, pas la dernière fois qu'un fichier a été touché.
 */
export const LEGAL_LAST_UPDATED = "2 September 2026";

/** Autorité de contrôle compétente pour un responsable établi en Belgique. */
export const DPA = {
  name: "Autorité de protection des données",
  address: "Rue de la Presse 35, 1000 Bruxelles",
  website: "https://www.autoriteprotectiondonnees.be",
} as const;
