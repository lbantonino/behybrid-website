/*
  Identité légale du club, source unique des trois pages légales.

  Toutes les valeurs ont été fournies par Antonino le 02/09 et vérifiées avec
  lui : forme juridique, numéro d'entreprise, siège, administrateurs,
  hébergeur. Rien n'est deviné ici.

  Le seul élément encore variable est le nom de domaine, qui n'apparaît pas
  dans ce fichier : il vient de `NEXT_PUBLIC_SITE_URL`.

  Modifier une de ces valeurs modifie les trois pages légales d'un coup, ce
  qui est exactement le but : elles ne doivent jamais pouvoir diverger.
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

  /*
    Siège social, confirmé par Antonino sur l'extrait BCE le 02/09.

    Deux écritures, parce que les pages légales sont bilingues : la version
    anglaise affichait sinon « Belgique » au milieu d'un texte anglais, le
    mélange de langues que le reste du site a précisément éliminé. La rue et le
    numéro ne se traduisent pas, seul le pays change.
  */
  address: "Rue des Alcyons 86, 1082 Berchem-Sainte-Agathe, Belgique",
  addressEn: "Rue des Alcyons 86, 1082 Berchem-Sainte-Agathe, Belgium",

  /**
   * Administrateurs désignés à l'article 15 des statuts. Une ASBL est
   * représentée par son organe d'administration : c'est cette liste, et non
   * une personne choisie au hasard, qui engage l'association.
   */
  administrators: ["Gianluca Lo Bianco", "Patrizia Tripoli"] as const,

  /**
   * Responsable de la publication du site, c'est-à-dire la personne qu'un
   * lecteur ou une autorité contacte en premier. Gianluca Lo Bianco, qui est
   * administrateur et titulaire de l'adresse de contact du club.
   */
  publisher: "Gianluca Lo Bianco",

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
 * Vercel, confirmé par Antonino le 02/09 après un premier échange où Hostinger
 * avait été cité. La distinction compte : Hostinger héberge le nom de domaine,
 * ce qui n'est pas la même chose qu'héberger une application Next.js avec des
 * routes serveur, laquelle exige un environnement qui exécute Node.js.
 */
export const HOST = {
  name: "Vercel Inc.",
  address: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
  addressEn: "340 S Lemon Ave #4133, Walnut, CA 91789, United States",
  website: "https://vercel.com",
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
    countryEn: "France",
    role: "Envoi des emails de confirmation et de la newsletter, hébergement de la liste d'inscrits, acheminement des messages du formulaire de contact.",
    roleEn: "Sending confirmation emails and the newsletter, hosting the subscriber list, delivering contact form messages.",
    website: "https://www.brevo.com/legal/privacypolicy/",
  },
  {
    name: HOST.name,
    country: "États-Unis",
    countryEn: "United States",
    role: "Hébergement du site et acheminement des requêtes.",
    roleEn: "Hosting the website and routing requests.",
    website: "https://vercel.com/legal/privacy-policy",
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
