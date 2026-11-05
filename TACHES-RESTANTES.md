# BEHYBRID, ce qu'il reste à faire

> État vérifié le **14/09/2026** directement sur `https://www.behybridrunclub.com`,
> sur la base locale Supabase et sur le code du dépôt. Chaque point coché a été
> constaté, pas supposé.

Le site est en ligne, le domaine est branché, les six pages publiques répondent
et le calendrier lit bien Supabase. Ce qui reste tient en trois blocs : un
blocage invisible qui empêche Google de voir le site, du contenu à produire, et
des chantiers de fond qui ne sont pas urgents.

---

## 1. Bloquants, à traiter en premier

### 1.1 Le site est en `noindex`, Google ne l'indexera jamais

**C'est le point le plus grave, et il est invisible à l'œil.**

Constaté aujourd'hui sur la production :

```
https://www.behybridrunclub.com/robots.txt
  User-Agent: *
  Disallow: /

<meta name="robots" content="noindex, follow">
```

Le site dit aux moteurs de recherche de ne pas l'indexer. Tant que c'est le cas,
aucun travail de référencement ne sert à rien : ni le `sitemap.xml`, ni les
données structurées, ni les titres. Le site n'apparaîtra jamais dans Google.

**Cause :** la variable `NEXT_PUBLIC_ALLOW_INDEXING` n'est pas à `"true"` sur
Vercel. C'est le garde-fou voulu dans [.env.example](.env.example) pour éviter
d'indexer une préversion. Il n'a simplement jamais été levé depuis la mise en
ligne.

**À faire :**

1. Vercel > le projet > Settings > Environment Variables
2. `NEXT_PUBLIC_ALLOW_INDEXING` = `true`, coché pour **Production** uniquement
3. Redéployer (une variable n'est prise en compte qu'au build suivant)
4. Revérifier `https://www.behybridrunclub.com/robots.txt` : il doit dire
   `Allow: /` et donner l'adresse du sitemap

Le même interrupteur pilote le `robots.txt` et les balises `noindex` des pages,
donc les deux se corrigent d'un coup. Voir [src/app/robots.ts](src/app/robots.ts).

### 1.2 Une adresse email du club, et une seule

Trois adresses différentes circulent aujourd'hui sur le site et autour :

| Adresse | Où elle sert | Fichier |
| --- | --- | --- |
| `gianlucalobianco03@gmail.com` | affichée sur `/contact`, reçoit les messages du formulaire | [src/lib/site.ts:90](src/lib/site.ts#L90) |
| `gianluca.behybrid@gmail.com` | contact officiel **et** adresse RGPD dans les trois pages légales | [src/lib/legal.ts:65](src/lib/legal.ts#L65) |
| `lb.antonino7@gmail.com` | expéditeur des emails envoyés par le site (Brevo) | `.env.local`, variable `BREVO_SENDER_EMAIL` |

**Deux problèmes distincts :**

- **Incohérence juridique.** Les pages légales annoncent une adresse pour
  exercer ses droits sur les données personnelles qui n'est pas celle affichée
  sur la page contact. Un visiteur qui veut faire supprimer ses données écrit à
  une adresse, le club en surveille une autre.
- **Délivrabilité.** La newsletter part d'une adresse Gmail. Brevo le signale
  lui-même : Gmail n'autorise pas Brevo à envoyer en son nom, donc une partie
  des emails de confirmation d'inscription part en spam ou est rejetée. Les
  inscrits ne reçoivent alors jamais leur confirmation, et ne sont donc jamais
  inscrits.

**À faire :**

1. Créer une adresse sur le domaine du club, par exemple `hello@behybridrunclub.com`.
   Le choix exact (`hello@`, `run@`, `contact@`) est à trancher avec Gianluca.
   Le domaine étant chez Vercel côté DNS, l'hébergement mail se prend à part
   (Google Workspace, Infomaniak, Zoho...).
2. L'ajouter dans Brevo sous Expéditeurs, domaine, IP, puis **authentifier le
   domaine** (DKIM et DMARC) dans l'onglet Domaines. Sans cette étape, changer
   d'adresse ne règle rien.
3. Reporter la même adresse partout : `CLUB_EMAIL` dans `site.ts`,
   `contactEmail` et `privacyEmail` dans `legal.ts`, et les variables
   `CONTACT_TO_EMAIL` et `BREVO_SENDER_EMAIL` en local **et sur Vercel**.

### 1.3 Les 9 portraits de « The Crew »

Décision prise le 31/08, toujours valable : demander sa photo à chaque membre et
les valider ensemble avant de communiquer sur le site. Rien ne casse au build,
le site a juste l'air de fonctionner, et un visiteur voit des visages flous.

État au 14/09, inchangé depuis le 31/08, pour 4,3 Mo au total :

| Fichier (`public/photos/`) | Poids | Taille | Verdict |
| --- | --- | --- | --- |
| `team-gianluca.jpeg` | 27 Ko | 640 × 640 | correct, ne pas y toucher |
| `team-olivia.png` | 49 Ko | 192 × 206 | trop petit |
| `team-gaetan.png` | 152 Ko | 278 × 390 | trop petit |
| `team-clara.png` | 198 Ko | 320 × 290 | trop petit |
| `team-andre.png` | 205 Ko | 312 × 304 | trop petit |
| `team-adrien.png` | 393 Ko | 492 × 482 | trop lourd |
| `team-anais.png` | 616 Ko | 584 × 566 | trop lourd |
| `team-emie.png` | 726 Ko | 608 × 678 | trop lourd |
| `team-antonino.png` | 2,0 Mo | 1313 × 1198 | trop lourd |

**Deux défauts opposés, une seule cause.** Les portraits s'affichent dans un
cercle de 260 px en desktop, donc il faut environ **520 px de côté** pour rester
net sur un écran Retina. Quatre fichiers sont en dessous : Olivia est agrandie
presque trois fois, donc visiblement floue, et pour ceux-là réexporter ne suffit
pas, il faut repartir de l'original sinon on étire du flou. Les quatre autres
ont le défaut inverse. La cause commune est le format : Gianluca pèse 27 Ko en
JPEG pour la meilleure définition du lot, tous les autres sont en PNG, un format
fait pour les logos, pas pour les photos.

**Ce qu'il faut demander aux 8 membres concernés :** une photo en **JPEG,
640 × 640, cadrée carrée, visage centré**, moins de 300 Ko. Gianluca est déjà
conforme. Objectif : passer de 4,3 Mo à environ 250 Ko, net partout.

---

## 2. Référencement, une fois le `noindex` levé

Le socle technique est déjà en place et vérifié en production : `sitemap.xml`,
`robots.ts`, image de partage OpenGraph, favicons, et les données structurées
(8 `SportsEvent` avec date, lieu et prix, plus le `SportsClub`) se génèrent bien
sur `/calendar`. Reste ce qui ne peut se faire qu'après la levée du `noindex` :

- [ ] **Google Search Console** : créer la propriété pour
      `behybridrunclub.com`, la valider par enregistrement DNS, y soumettre
      `https://www.behybridrunclub.com/sitemap.xml` et demander l'indexation des
      pages principales. Sans ça, on attend le passage spontané de Google.
- [ ] **Test des résultats enrichis** : coller l'URL de `/calendar` dans
      `search.google.com/test/rich-results` et confirmer qu'un entraînement à
      venir y apparaît avec sa date, son lieu et son prix à 0 €. Impossible tant
      que la page est en `noindex`.
- [ ] **Fiche Google Business Profile** pour le club à Bruxelles. C'est ce qui
      fait apparaître BEHYBRID dans les recherches locales du type « run club
      Bruxelles », souvent plus rentable que le référencement classique pour un
      club de quartier.
- [ ] **Vérifier les titres et descriptions** page par page une fois indexé :
      ce sont eux qui s'affichent dans les résultats, et ils ne se contrôlent
      vraiment qu'en voyant le rendu réel.
- [ ] **Mesure d'audience : décision à prendre.** Les pages `/privacy` et
      `/cookie-policy` affirment aujourd'hui « aucun cookie, aucune mesure
      d'audience, aucun traceur publicitaire ». C'est vrai, et c'est confortable
      juridiquement : pas de bandeau cookies. Mais on ne sait rien du trafic. Si
      tu veux des statistiques, prendre un outil sans cookie (Vercel Analytics
      ou Plausible) **et** corriger les deux pages légales en conséquence. Ne
      jamais ajouter Google Analytics sans refonte du volet cookies.

---

## 3. Contenu et fonctionnalités

- [ ] **Page `/join-us`.** Le lien existe déjà, désactivé par `enabled: false`
      dans [src/lib/nav-links.ts](src/lib/nav-links.ts). Aujourd'hui le bouton
      « Join the club » de l'accueil ancre vers la section « Become A Member »,
      ce qui tient, mais une vraie page ferait mieux le travail.
- [ ] **Boutique.** Même statut, `enabled: false`. **À demander à Gianluca
      avant toute chose** : `behybridathlete.com` pointe vers une adresse IP
      Shopify, donc une boutique a été commencée. Savoir ce qui existe déjà
      (produits, visuels, paiement configuré) avant de repartir de zéro.
- [ ] **Authentification et espace membre** (Supabase). Le `TODO` est déjà posé
      dans [src/components/layout/site-header.tsx:18](src/components/layout/site-header.tsx#L18),
      où `isAuthenticated` est figé à `false`.
- [ ] **Espace administrateur** pour que Gianluca gère les entraînements sans
      passer par la console Supabase. Aujourd'hui chaque séance s'ajoute à la
      main en base. C'est tenable pour dix événements, pas pour une saison.
- [ ] **Remplir le calendrier au-delà du 28 octobre.** La base s'arrête là. Le
      site n'affiche que les entraînements à venir, donc il se videra tout seul
      à cette date, sans erreur ni alerte.
- [ ] **Version anglaise du README.**

---

## 4. Robustesse, à faire un jour

- [ ] **Le fallback silencieux du calendrier.** Si Supabase devient
      injoignable, [src/lib/calendar-events.ts](src/lib/calendar-events.ts)
      sert une liste d'entraînements codée en dur, sans aucun signal. C'est
      exactement ce qui s'est produit après la mise en ligne : le site a affiché
      19:30 pendant que la base disait 19:00, et ça n'a été découvert qu'à l'œil,
      par hasard. Le corriger pour qu'il journalise l'échec côté serveur, visible
      dans les logs Vercel.
- [ ] **Revue de code complète** à refaire maintenant que les pages légales sont
      écrites, à republier à la même adresse que le rapport du 31/08.
- [ ] **Vérifier que les liens désactivés le sont toujours** avant chaque
      communication publique : boutique, espace membre, `/join-us`, `/login`,
      `/sign-up` sont tous à `enabled: false` au 14/09.

---

## Ce qui est fait, pour mémoire

Pour ne pas refaire le tour à chaque fois. Vérifié le 14/09 :

- Site en ligne sur Vercel, domaine `behybridrunclub.com` branché, redirection
  vers `www` en place
- Les 8 routes répondent en 200 : `/`, `/calendar`, `/contact`, `/privacy`,
  `/legal-notice`, `/cookie-policy`, `/style-guide`, `/newsletter/confirmed`
- **Supabase est branché en production** : le calendrier affiche bien 19:00,
  comme la base. Le problème du 10/09, où la prod servait le jeu de secours à
  19:30, est réglé.
- Les trois pages légales sont écrites, sans aucun placeholder, et couvrent les
  deux sources de collecte (newsletter et formulaire de contact)
- Newsletter Brevo et formulaire de contact en service
- SEO technique : `sitemap.xml`, `robots.ts`, image OpenGraph, favicons, données
  structurées `SportsClub` et `SportsEvent`
- Pages d'erreur : 404, `error.tsx`, `global-error.tsx`, testées en conditions
  réelles
