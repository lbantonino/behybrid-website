# BEHYBRID Website

> Le site web et la boutique en ligne du **BEHYBRID Run Club Brussels**.
> Une web app complète, du design à la mise en ligne, conçue et développée en solo avec l'IA comme copilote.

**Démo en ligne :** _à venir_ · **Statut :** en développement actif

`Next.js 16` · `React 19` · `TypeScript` · `Tailwind CSS 4` · `Supabase` · `Stripe`

---

## Le club BEHYBRID

BEHYBRID est un run club bruxellois fondé en **juillet 2024** par les frères **Gianluca Lo Bianco** (coach sportif et running) et **Antonino Lo Bianco** (développeur qui apprend à exploiter l'IA de façon concrète et utile, en charge de tout l'écosystème digital du club). Gianluca porte le volet sportif, Antonino la vie du club et sa présence digitale.

Le nom vient de leur pratique : deux athlètes **hybrides**, qui mêlent la course à pied au cardio et à la musculation. BEHYBRID, c'est "être hybride".

Le club propose des **entraînements hebdomadaires** orientés performance individuelle, pour aider chacun à atteindre ses objectifs de course à pied, ainsi que **deux sorties en équipe par mois** (la Team BEHYBRID), à but commercial ou non. On y trouve autant l'esprit de compétition que la convivialité, et le plus souvent les deux se rejoignent : tout le monde se sent à la fois compétitif et bien entouré.

Ses valeurs : **communauté, dépassement de soi, devenir la meilleure version de soi-même**, avec un mindset de guerrier et des gens de qualité.

Aujourd'hui, BEHYBRID rassemble **plus d'une centaine de membres inscrits**, avec 20 à 40 participants par entraînement selon les saisons. Présent sur Instagram et TikTok, le club arrive bientôt sur le web avec ce site.

---

## Les besoins auxquels le site répond

Jusqu'ici, BEHYBRID vivait uniquement sur les réseaux sociaux. Le club avait besoin d'une vraie base digitale pour structurer sa croissance. Le site répond à cinq besoins concrets :

- **Expliquer le club (landing page).** Une porte d'entrée claire qui présente BEHYBRID, sa philosophie et donne envie de rejoindre la communauté.
- **Vendre (boutique en ligne).** Un shop pour proposer les produits du club, avec un paiement en ligne sécurisé.
- **Rassembler autour des événements (calendrier).** Un calendrier des entraînements et des sorties en équipe, pour que chacun sache quand et où courir.
- **Créer un espace membre (authentification).** Bien plus qu'un simple login : un véritable espace communautaire. Le membre s'inscrit aux entraînements et aux sorties, suit sa participation, accède à des avantages réservés (tarifs shop, événements privés), gère ses commandes et son profil. C'est ce qui transforme un site vitrine en plateforme communautaire.
- **Piloter la communauté (gestion des membres).** Une vue d'ensemble sur tous les membres du club, pour accompagner sa montée en puissance et fidéliser une communauté grandissante.

---

## Fonctionnalités

Légende : ✅ en place · 🚧 en cours · ⬜ à venir

### Site public

- ✅ **Landing page** présentant le club, sa philosophie et ses valeurs
- ✅ **Calendrier** des entraînements et sorties (données réelles, lecture Supabase, liens Strava)
- ✅ **Header, footer et navigation** partagés sur tout le site
- ✅ **Identité visuelle** intégrée (logos, photos, polices Archivo + Montserrat)
- ✅ **Design system documenté** sur la page interne `/style-guide`
- ✅ **Formulaire newsletter** branché sur Brevo en double opt-in (inscription réelle, email de confirmation, cas « déjà inscrit » traité)
- ✅ **Page contact** (`/contact`) : coordonnées, formulaire branché sur Brevo (le message arrive par email chez le club), galerie animée
- 🚧 **Pages légales** (`/legal-notice`, `/privacy`, `/cookie-policy`), créées, contenu à écrire
- ⬜ **Page "Rejoindre"** (`/join-us`), parcours d'entrée dans la communauté

### Espace membre

- ⬜ **Inscription et connexion** sécurisées
- ⬜ **Profil personnel** éditable
- ⬜ **Inscription aux entraînements et sorties** depuis le calendrier
- ⬜ **Suivi des commandes** et adresses enregistrées
- ⬜ **Avantages membres** (tarifs shop, contenus réservés)

### Boutique

- ⬜ **Catalogue produits**
- ⬜ **Panier et paiement en ligne** sécurisé
- ⬜ **Historique d'achats**

### Espace administrateur

- ⬜ **Vue d'ensemble des membres** du club
- ⬜ **Gestion des événements** du calendrier
- ⬜ **Gestion des produits** de la boutique

---

## Mon rôle

Ce projet est mené **en solo, de bout en bout**, par Antonino Lo Bianco. Il couvre l'ensemble de la chaîne, de l'idée au produit :

- **Conception produit** : traduire les besoins réels du club en fonctionnalités concrètes.
- **Design UI/UX** : conception des maquettes et de l'identité visuelle sur Figma, avant passage au code.
- **Développement front-end** : intégration de l'interface avec Next.js, React, TypeScript et Tailwind CSS.
- **Développement back-end** : base de données, authentification et logique serveur avec Supabase.
- **Paiement et sécurité** : intégration Stripe et architecture pensée pour protéger les données personnelles et bancaires (voir la section sécurité).
- **Déploiement** : mise en ligne et hébergement sur Vercel.

L'objectif : porter un projet réel, utilisé par de vraies personnes, du premier trait de design jusqu'à la mise en production.

---

## La stack et les choix techniques

Chaque outil a été choisi pour une raison précise, avec la sécurité et la fiabilité comme fil conducteur.

| Domaine | Choix | Pourquoi ce choix |
| --- | --- | --- |
| **Framework** | Next.js 16 + React 19 | Rendu serveur pour des pages rapides et un bon référencement, et une logique sensible qui reste côté serveur, jamais exposée au navigateur. |
| **Langage** | TypeScript | Typage strict qui évite une large classe d'erreurs avant même l'exécution. |
| **Style** | Tailwind CSS 4 | Un design system cohérent et rapide à faire évoluer, sans CSS dispersé. |
| **Base de données + Auth** | Supabase | Une base Postgres managée avec authentification intégrée et sécurité au niveau des lignes (RLS), sans serveur à administrer soi-même. |
| **Paiement** | Stripe | Standard de l'industrie, certifié PCI. Les données bancaires ne transitent jamais par notre serveur. |
| **Hébergement** | Vercel | Déploiement continu, HTTPS automatique et secrets chiffrés. |

**Le principe directeur : déléguer la sécurité aux spécialistes.** Plutôt que de réinventer l'authentification, le paiement ou l'infrastructure, le projet s'appuie sur des acteurs éprouvés (Supabase, Stripe, Vercel) et concentre l'effort sur l'expérience et la logique métier. Un choix à la fois plus sûr et plus réaliste pour livrer un produit fiable.

---

## Du web design au développement

Ce projet suit une démarche design-first : penser l'expérience et l'identité visuelle avant d'écrire la première ligne de code. Un univers sombre, un accent vert signature, une typographie affirmée (Archivo, avec Montserrat Black en accent sur certains signes) et une direction artistique forte, cohérente sur tout le site.

### Les maquettes (Figma)

Les écrans ont d'abord été conçus sur Figma, en versions desktop et mobile, pour une expérience pensée responsive dès le départ.

#### Page d'accueil

<p>
  <img src="docs/images/Home-d.png" width="520" alt="Maquette accueil desktop">
  <img src="docs/images/Home-m.png" width="170" alt="Maquette accueil mobile">
</p>

#### Page boutique

<p>
  <img src="docs/images/Shop-d.png" width="520" alt="Maquette boutique desktop">
  <img src="docs/images/shop-m.png" width="170" alt="Maquette boutique mobile">
</p>

#### Page calendrier

<p>
  <img src="docs/images/Calendar-d.png" width="520" alt="Maquette calendrier desktop">
  <img src="docs/images/Calendar-m.png" width="170" alt="Maquette calendrier mobile">
</p>

### Le design system

Base visuelle cohérente extraite des maquettes, formalisée en tokens dans le code (couleurs, typographie, rayons) et en composants réutilisables (`Button`, `Badge`), pour garantir l'homogénéité de toutes les pages. Documentée sur la page interne `/style-guide`.

![Design system BEHYBRID : couleurs, typographie, rayons et composants](docs/images/design-system.png)

### Le site en ligne

Traduction fidèle des maquettes en interface réelle avec Next.js et Tailwind CSS, du design statique au produit déployé et interactif.

_[Captures du site déployé à venir]_

---

## Construit avec l'IA

Ce projet est développé main dans la main avec l'IA, avec deux outils Anthropic complémentaires : **Claude Code** pour toute la partie développement (code, architecture, logique) et **Claude Design** pour explorer des directions visuelles et concevoir le design system. L'IA n'est pas un gadget ici, c'est une méthode de travail à part entière.

Concrètement, l'IA intervient pour :

- **Accélérer le développement** : générer, relire et affiner le code avec Claude Code, tout en gardant la main sur l'architecture et les décisions.
- **Explorer le design** : obtenir des idées et une première direction visuelle avec Claude Design, puis créer les maquettes moi-même sur Figma à partir de cette base. Claude Design a ensuite aidé à concevoir le design system.
- **Renforcer la sécurité** : passer en revue le code sensible (authentification, paiement, données personnelles) avant chaque mise en production.
- **Structurer la réflexion** : cadrer les besoins, comparer les choix techniques, documenter le projet.
- **Apprendre plus vite** : comprendre en profondeur ce que je construis, plutôt que copier sans saisir.

**Ma conviction :** l'IA ne remplace pas le développeur, elle démultiplie celui qui sait s'en servir avec discernement. Ce projet est autant un site pour BEHYBRID qu'une démonstration concrète de cette approche : construire des produits réels, fiables et sécurisés, en intégrant l'IA intelligemment à chaque étape.

Cette démarche s'inscrit dans un objectif plus large : développer une expertise en intégration de l'IA et, à terme, en faire une activité de services (freelance ou agence) au service de projets concrets.

---

## Défis et apprentissages

Construire une web app complète en solo apporte son lot de défis concrets. Quelques-uns rencontrés sur ce projet :

- **Sécuriser des paiements et des données réelles.** Concevoir une architecture où les données bancaires ne transitent jamais par le serveur, et où chaque utilisateur ne peut accéder qu'à ses propres données. Cela a demandé de comprendre la logique de délégation à Stripe et la sécurité au niveau des lignes (RLS) de Supabase.
- **Travailler avec une version récente de Next.js.** Next.js 16 introduit des changements par rapport aux versions plus documentées. Il a fallu lire la documentation à jour plutôt que se fier aux réflexes habituels.
- **Piloter l'IA sans la subir.** Apprendre à faire produire du code de qualité par l'IA tout en gardant le contrôle : vérifier, corriger, comprendre, et ne jamais déployer sans relecture, surtout sur le code sensible.
- **Penser produit, pas seulement code.** Traduire les besoins réels d'un club et de ses membres en fonctionnalités cohérentes, en gardant l'utilisateur final au centre.

Chaque étape est autant un livrable qu'un apprentissage, dans une montée en compétence continue vers l'expertise en développement et en intégration de l'IA.

---

## Avancement du projet

> Section mise à jour à chaque session de travail. Reflète l'état réel du projet et le point exact où l'on s'est arrêté.

**Dernière mise à jour : 2026-09-02**

### Où on en est

Le socle public est en place : page d'accueil, calendrier et style guide fonctionnels, avec un build de production qui passe. Grosse passe de direction artistique : toute la typographie du site est passée à **Archivo** (9 poids) avec **Montserrat Black** en accent, en remplacement d'Akzidenz Grotesk Pro. Le hero de l'accueil a été entièrement repensé (bandeau défilant, titre "PERFORM & CONNECT", carte "NEXT RUN", hauteur plein écran) et enrichi d'animations : écran de chargement "running" (coureur + barre de progression), entrées décalées des blocs, indicateur de scroll, et léger zoom du logo au survol. Les maquettes Figma des écrans clés (accueil, boutique, calendrier) sont finalisées en desktop et mobile.

**La page d'accueil est terminée, en desktop comme en mobile**, section "The Crew" comprise. Les quatre sections plein écran (hero, What's BEHYBRID, How We Move, Become A Member), la galerie et le pied de page sont finalisés et ne bougeront plus. Le parcours interne est cohérent : le bouton "Join The Club" ancre vers la section d'inscription, la carte "Next Run" lit le premier entraînement à venir depuis la même source que `/calendar` et mène au run correspondant, le logo et les liens du menu ramènent en haut, et tous les déplacements verticaux partagent le même défilement doux de 1,6 seconde.

La section **"Become A Member"** est refondue en desktop : en-tête de section, titre à 70px, sous-titre en une ligne, les quatre étapes sur une rangée séparées par des flèches vertes, et un panneau "What You Get" centré, en 3D, avec sa pastille à cheval sur la bordure et les six avantages en trois colonnes. Son mobile reste à faire.

La section **"How We Move"** est terminée en desktop et en mobile : photo plein cadre assombrie et trame technique, titre à 70px, sous-titre, deux cartes floutées avec badge, numéro d'index et pastilles, et un bandeau défilant collé au bord bas. Les trois titres de l'accueil partagent désormais la même taille (70px en desktop). Les révélations au scroll se rejouent à chaque retour à l'écran, sur toutes les sections, hero compris.

La section **"What's BEHYBRID"** est désormais terminée en desktop et en mobile. Refondue d'après les maquettes Figma, elle occupe toute la hauteur de l'écran : barre d'en-tête de section ("About The Club" / "Est. 2024"), grand titre, paragraphe, trois chiffres clés (300+ runners, Every week, Since 2024) et quatre cartes numérotées remplaçant l'ancien bloc d'icônes. Deux halos verts diffus animent le fond. Les cartes, ainsi que la carte "Next Run" du hero, s'inclinent en 3D vers le curseur avec un reflet vert qui le suit. Toutes les colonnes se révèlent au scroll, la gauche par la gauche et les cartes par la droite en cascade.

Le **hero mobile** est finalisé : contenu centré, titre agrandi, et tout le bloc (jusqu'à la carte "Next Run" condensée) tient dans un seul écran sans scroll (`svh` pour éviter le zoom au scroll). Le **menu hamburger mobile** est retravaillé : deux zones distinctes (navigation publique en haut, compte en bas), tailles harmonisées, fond noir plein, et blocage du scroll de la page quand il est ouvert. Corrections mobile : accès au serveur de dev depuis un vrai iPhone (`allowedDevOrigins`) et désactivation de la détection auto iOS des dates/heures (`formatDetection`) qui cassait l'hydratation.

**La page `/calendar` est terminée**, desktop et mobile, et a passé une revue complète le 29/08. Elle lit Supabase côté serveur quand `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont configurés, avec repli sur un jeu local. Le premier import a été préparé à partir du fichier Excel d'Antonino : schéma SQL, CSV propre et guide dans `docs/SUPABASE_EVENTS.md`.

Elle est **autonome dans le temps** : la liste ne montre que les entraînements à venir, la carte "Next Run" de l'accueil lit la même source, et le calendrier mensuel reste navigable sur les mois passés sans que leurs journées soient cliquables. Remplir la base suffit, le site suit. Chaque séance affiche son type (Perform en vert, Connect en gris) et le logo Strava quand `stravaUrl` est renseigné, ou **Strava soon** tant que l'event officiel n'existe pas.

La revue du 29/08 a produit cinq correctifs, dont trois bugs réels : le décalage en cascade des révélations n'est plus proportionnel au nombre d'événements (une saison complète aurait laissé le dernier run invisible sept secondes), les ancres sont construites sur le `slug` et non sur la date affichée (`28 OCT` ne distingue ni deux années ni deux séances d'un même jour), et la date du jour est calculée dans le fuseau de Bruxelles des deux côtés, ce qui supprime un écart d'hydratation mensuel et un run qui disparaissait de la liste à 2h du matin. S'y ajoutent une hiérarchie de titres correcte (`h1` / `h2` / `h3`, la page n'avait qu'un `h1`) et des données structurées `SportsEvent` pour Google.

### Revue de code

Une revue complète du site a été établie le **31/08/2026** sur le commit
`91ba13c` : ce qui tient (mesuré, pas supposé), sept incohérences relevées, six
risques techniques dont un bloquant, et les points à traiter avant la mise en
ligne. Le rapport a été **mis à jour le même jour** après les corrections.

**Rapport consultable** : https://claude.ai/code/artifact/2efadb48-a5d2-444d-96c5-ae7a3da8e373

> **À refaire une fois les trois pages légales écrites**, demandé par Antonino le
> 31/08. Il faudra alors **mettre à jour ce rapport à la même adresse** plutôt
> qu'en publier un second, pour que le lien ci-dessus reste valable, et le
> relire juste avant le déploiement.

**État au 31/08 après corrections.** Le point bloquant TEC-01 est réglé : sans
JavaScript, le site n'est plus un écran noir. Six des sept incohérences sont
traitées, la septième (**INC-04**) n'en était pas une, voir ci-dessous. Reste
ouverte **INC-03**, les portraits, devenus le point 7 de la checklist de
déploiement, plus trois risques techniques non bloquants : les photos sources
restant à alléger, dont un PNG de 2,4 Mo pour une photographie (TEC-03, dont la
partie code est faite), aucun test sur
les deux routes serveur qui envoient des emails (TEC-04), et un gris à 4,38 de
contraste sous le seuil AA de 4,5 sur le fond des panneaux (TEC-05, corrigé le 02/09). **TEC-02
est réglé** : la 404 et les écrans d'erreur existent et sont aux couleurs du
club.

Une limite connue et hors périmètre de TEC-01 : sans JavaScript, les deux
formulaires s'affichent mais n'envoient rien, puisqu'ils passent par `fetch`.
Corriger cela demande une action serveur, c'est un autre chantier.

### Prochaine étape

Les deux premiers points de la liste du 28/08 sont faits : la newsletter est
branchée sur Brevo (30/08) et la page `/contact` est terminée (30/08). Reste :

1. **Écrire les trois pages légales** : `/legal-notice`, `/privacy`, `/cookie-policy`. Les pages existent et partagent le gabarit `LegalPage`, il n'y a que le contenu à insérer. Elles doivent couvrir **deux** sources de collecte de données, la newsletter et le formulaire de contact, et non une seule. La mention de consentement sous le formulaire de contact pointe déjà vers `/privacy`, encore vide.
2. **Refaire la revue complète du site** une fois ces pages écrites, et la republier à la même adresse.

**Puis** : la page `/join-us`, la boutique, l'espace membre. Leurs liens sont déjà en place dans `src/lib/nav-links.ts`, désactivés par `enabled: false`.

### Décision durable : inscriptions Strava

Ne pas remettre un bouton d'ajout calendrier `.ics` comme action principale des événements. Le frère d'Antonino crée déjà les events Strava 1 à 2 jours avant chaque séance pour compter les inscriptions et centraliser les participants.

La bonne stratégie est donc :

- garder les entraînements visibles à l'avance sur le site ;
- ajouter un champ `stravaUrl` aux événements ;
- afficher **Strava soon** tant que l'event Strava officiel n'existe pas ;
- afficher **Join** dès que `stravaUrl` est renseigné ;
- plus tard, avec Supabase, ajouter une colonne `strava_url` pour activer le bouton sans modifier le code ni redéployer.

Workflow mensuel recommandé avec Gianluca :

1. Créer les 4 events Strava du mois à l'avance, idéalement en une seule session.
2. Récupérer les 4 URLs Strava officielles.
3. Les associer aux 4 entraînements correspondants du site.
4. Vérifier que les 4 boutons **Join** sont visibles sur `/calendar`.
5. Laisser Strava gérer les inscriptions, le nombre de participants et les notifications.

Cette décision doit rester dans le README jusqu'au branchement réel de Supabase/Strava.

### Checklist de déploiement

> À relire intégralement lors de la revue qui précède la mise en ligne. Chaque
> ligne est une chose qui **ne peut pas** être faite avant de connaître le
> domaine de production, et qui casse silencieusement si on l'oublie : rien
> n'échouera au build, le site aura juste l'air de fonctionner.

**0. Trancher le nom de domaine avant tout le reste.**
Antonino possède déjà **`behybridathlete.com`** (créé le 04/06/2024 chez Hostinger,
payé jusqu'au 04/06/2028, DNS pointant vers Shopify, aucune boîte mail configurée).
Il ne convient pas : **le club ne dit jamais « athlete »**, sa langue est *run*,
*runner*, *Perform*, *Connect*. Un domaine employant un mot que personne ne prononce
crée un décalage permanent avec la marque.

Piste retenue par Antonino le 30/08 : **`behybridrunclub.com`**, le plus explicite et
le plus proche du nom officiel « BEHYBRID Run Club Brussels ». Alternative courte :
`behybridrun.com`. Les deux étaient libres au 30/08, comme `behybridbrussels.com`,
`behybridclub.com`, `runbehybrid.com`, `wearebehybrid.com`, `behybridbxl.com`.

Écartés : `behybrid.com` est parqué en vente chez Afternic/GoDaddy (donc le réflexe
`.com` d'un visiteur mène à une page de vente, pire qu'une erreur) ; `behybrid.be` est
réservé depuis le 12/12/2022 via Hostnet et jamais exploité ; `behybrid.run` est plus
élégant mais ajoute trois frottements (réflexe `.com` non satisfait, extension refusée
par les validateurs d'email anciens, réputation d'envoi moins établie).

Le mot-clé dans le domaine ne pèse presque plus rien en référencement depuis 2012 :
c'est le contenu, les titres et les données structurées qui positionnent le site.
Choisir sur la sonorité et l'usage, pas sur Google.

**Ce point est le premier de la liste parce que tous les suivants en dépendent**, et
que changer de domaine après la mise en ligne coûte cher : emails à refaire, liens
partagés morts, référencement à reconstruire, flocages et bios à corriger.

**À demander à Gianluca** : `behybridathlete.com` pointe vers une adresse IP de
Shopify. Une boutique a donc été commencée. Savoir ce qui existe (produits, visuels,
paiement configuré) avant de reprendre le sujet boutique du site.

**1. Définir `NEXT_PUBLIC_SITE_URL` sur l'hébergeur.**
Le vrai domaine, sans barre oblique finale, par exemple `https://www.behybrid.run`.
Tant qu'elle est absente, le code retombe sur `http://localhost:3000`. Conséquence :
les données structurées de `/calendar` (les `SportsEvent` lus par Google) pointent
vers une machine locale et **Google les ignore purement et simplement**. La variable
sert aussi de `metadataBase`, donc les futures images de partage seraient également
cassées. Voir `src/lib/site.ts`.

**2. Vérifier les données structurées une fois en ligne.**
Coller l'URL de `/calendar` dans le test des résultats enrichis de Google
(`search.google.com/test/rich-results`). On doit y voir un événement par
entraînement à venir, avec date, lieu et prix à 0 €. Ce test est impossible en
local, la page devant être publiquement accessible.

**3. Reporter les variables Supabase.**
`SUPABASE_URL` et `SUPABASE_ANON_KEY` ne sont que dans `.env.local`, qui n'est pas
versionné. Sans elles en production, le site sert le jeu d'événements de secours
codé en dur dans `src/lib/calendar-events.ts`, donc un calendrier figé et faux.

**4. Ce qui n'est pas encore écrit et qui devra l'être.**
Image de partage (`openGraph`), `sitemap.xml` et `robots.txt`. `metadataBase` étant
en place, les trois sont rapides, mais aucun n'existe aujourd'hui : un lien du site
partagé sur WhatsApp ou Instagram n'affiche aucune vignette.

**5. Changer l'adresse d'expéditeur Brevo.**
La newsletter part aujourd'hui de `lb.antonino7@gmail.com`, une adresse Freemail.
Brevo signale lui-même que le domaine n'est pas conforme aux exigences de Google,
Yahoo et Microsoft : Gmail n'autorise pas Brevo à envoyer en son nom, donc une
partie des emails de confirmation finira en spam ou sera rejetée. Créer une adresse
sur le domaine du club, l'ajouter dans Expéditeurs, domaine, IP, et authentifier le
domaine (DKIM et DMARC) depuis l'onglet Domaines.

Le choix de l'adresse exacte (`hello@`, `newsletter@`, `run@`...) est à décider avec
Gianluca, décision prise le 29/08. Aucune conséquence sur le code : l'expéditeur est
un réglage Brevo, pas une valeur du dépôt. Tant que ce point n'est pas fait, ne pas
ouvrir le formulaire au public : les inscrits ne recevraient jamais l'email de
confirmation, et ne seraient donc jamais inscrits.

**6. Vérifier que les liens désactivés le sont toujours.**
`src/lib/nav-links.ts` masque boutique, espace membre et `/join-us` via `enabled:
false`. Confirmer qu'aucun n'a été réactivé par inadvertance.

**7. Remplacer les 9 portraits de « The Crew ».**
Décision d'Antonino le 31/08 : demander à chaque membre de lui envoyer une photo,
puis les valider ensemble (taille et poids) **avant** la mise en ligne. Rien ne
casse au build, le site a juste l'air de fonctionner : c'est exactement le genre de
point qui passe inaperçu jusqu'à ce qu'un visiteur voie un visage flou.

État au 31/08, pour 4,3 Mo au total :

| Fichier (`public/photos/`) | Poids | Taille | Verdict |
| --- | --- | --- | --- |
| `team-gianluca.jpeg` | 28 Ko | 640 × 640 | correct, ne pas y toucher |
| `team-olivia.png` | 52 Ko | 192 × 206 | trop petit |
| `team-gaetan.png` | 156 Ko | 278 × 390 | trop petit |
| `team-clara.png` | 200 Ko | 320 × 290 | trop petit |
| `team-andre.png` | 208 Ko | 312 × 304 | trop petit |
| `team-adrien.png` | 396 Ko | 492 × 482 | trop lourd |
| `team-anais.png` | 616 Ko | 584 × 566 | trop lourd |
| `team-emie.png` | 728 Ko | 608 × 678 | trop lourd |
| `team-antonino.png` | 2000 Ko | 1313 × 1198 | trop lourd |

**Deux problèmes distincts, à ne pas confondre.** Les portraits sont affichés dans
un cercle de 260 px en desktop (`src/components/layout/team-slider.tsx`), donc il
faut environ **520 px de côté** pour rester net sur un écran Retina. Quatre fichiers
sont en dessous : Olivia est agrandie de près de trois fois, donc visiblement floue.
Pour ceux-là, **réexporter ne suffit pas**, il faut repartir du fichier d'origine,
sinon on ne fait qu'étirer du flou. Les quatre autres ont le défaut inverse : celui
d'Antonino pèse 2 Mo pour un cercle de 260 px, soit environ 40 fois plus de pixels
qu'affichés.

**La cause commune, c'est le format.** Gianluca pèse 28 Ko en JPEG pour la meilleure
définition du lot ; tous les autres sont en PNG, un format fait pour les logos et
les captures d'écran, pas pour les photos. Ce seul choix explique le rapport de 1 à 70.

**Ce qu'il faut demander aux 8 membres concernés** : une photo en **JPEG, 640 × 640,
cadrée carrée, visage centré**, moins de 300 Ko. Gianluca est déjà conforme.
Objectif : passer de 4,3 Mo à environ 250 Ko, avec un rendu net partout.

### Reste à faire (vue d'ensemble)

- Contenu des trois pages légales (newsletter + formulaire de contact à couvrir)
- Portraits de « The Crew » à remplacer avant la mise en ligne (point 7 de la checklist)
- Référencement : image de partage `openGraph`, `sitemap.xml`, `robots.txt`
- Page `/join-us`
- Authentification et espace membre (Supabase)
- Boutique et paiement (Stripe)
- Espace administrateur (gestion membres, événements, produits)
- Déploiement (Vercel)
- Version anglaise du README

### Journal des sessions

**2026-09-02**

- **Indexation fermée par défaut**, pour pouvoir déployer une préversion Vercel sans risque. Il faut poser explicitement `NEXT_PUBLIC_ALLOW_INDEXING=true` sur la production ; toute autre valeur, et l'absence de variable, valent non. Le sens est délibéré : oublier d'autoriser coûte quelques jours de référencement, oublier d'interdire laisse dans Google un doublon `*.vercel.app` qui survit des mois au vrai domaine. Vérifié dans les deux sens, et `/style-guide` comme `/newsletter/confirmed` gardent leur propre `noindex` même quand l'indexation est ouverte.
- **En-têtes de sécurité HTTP ajoutés : le site n'en renvoyait aucun.** `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` et `Strict-Transport-Security`, servis sur toutes les routes, images optimisées et API comprises.
- **Un compromis assumé sur la politique de contenu.** La version stricte exige un jeton unique par requête, ce qui force le rendu dynamique de toutes les pages et retire à Next la pré-génération. Pour un site sans compte ni paiement, le coût dépasse le gain, d'où `unsafe-inline` sur scripts et styles. Restent pleinement efficaces `frame-ancestors`, `base-uri`, `form-action` et `object-src`, qui empêchent d'encadrer le site, de détourner ses liens relatifs, de rediriger l'envoi d'un formulaire et de charger un greffon.
- **Vérifié que la politique ne casse rien** : douze combinaisons page × format, **zéro violation**, menu mobile qui s'ouvre et formulaires qui réagissent toujours.

- **Une phrase par ligne sur grand écran**, demandé par Antonino dans la foulée. Les deux mentions gardent leur coupure naturelle en mobile, qu'il juge parfaite, et reçoivent une coupure forcée au-delà d'un seuil.
- **Les deux seuils diffèrent, et ce n'est pas une incohérence.** La newsletter bascule au point de rupture desktop habituel (860 px) : elle vit dans le pied de page, dont la largeur y est déjà stable. Le formulaire de contact attend **1280 px** : entre 860 et 1280, sa colonne ne fait que 300 à 390 px, la première phrase s'y coupe déjà en deux, et la coupure forcée y ajoutait une troisième ligne. Constaté en mesurant, pas prévu.
- **Vérifié sur dix largeurs** (375, 390, 430, 859, 860, 1024, 1279, 1280, 1440, 1920) : deux lignes partout, et le texte réellement rendu a été relu ligne par ligne pour confirmer que la coupure tombe bien entre les deux phrases.

- **TEC-05 corrigé : les deux mentions sur les données personnelles passent le seuil d'accessibilité.** Sous le formulaire de contact et sous la newsletter, elles étaient en `#7a7a75` sur le fond des panneaux `#111111`, en 11 px : contraste mesuré **4,38**, pour un minimum AA de 4,5. Ce sont précisément les deux textes que le RGPD demande de rendre lisibles.
- **Deux changements, pas un.** Le gris pâle `--color-faint` passe de `#7a7a75` à `#7e7e79`, ce qui porte le contraste à **4,63** sur les panneaux et 4,85 sur le fond. Et les deux mentions passent de `text-[11px]` à `text-body-sm` (13 px), à la demande d'Antonino. Agrandir seul n'aurait pas suffi : le seuil AA ne s'assouplit qu'à partir de 18,7 px, et personne ne veut une mention légale de cette taille sous un bouton d'envoi.
- **Pourquoi 13 px et pas 12** : le 11 px correspondait au jeton `text-label`, conçu pour des libellés en capitales espacées du type `NEXT RUN`. Ces mentions sont des phrases en minuscules sur deux lignes, le même chiffre n'y produit pas la même lisibilité. `text-body-sm` existait déjà, ce qui évite d'ajouter une quinzième taille en dur.
- **`#7e7e79` plutôt que `#7c7c77`**, qui suffirait tout juste à 4,50 : se poser sur le seuil, c'est repasser dessous au premier ajustement d'un fond. Le choix est commenté dans `globals.css` avec la consigne de ne pas « harmoniser » cette valeur vers le bas.
- **Effet de bord rattrapé** : la mention newsletter portait deux `<br>` posés à la main, calibrés pour du 11 px. À 13 px ils produisaient une troisième ligne en mobile. Ils ont été retirés, le texte se coupe désormais tout seul. Vérifié sur six largeurs, de l'iPhone SE au 1920 : **deux lignes partout**.
- **Erreur commise et corrigée en cours de route** : j'avais d'abord écrit `phone-lg:max-w-[460px]`, or `phone-lg` est une plage bornée (428 à 859,98 px) et non un minimum. La classe ne s'appliquait donc pas en desktop, où le paragraphe restait à 300 px et repassait à trois lignes.

**2026-08-31**

- **SEC-01 corrigé : les six failles de sécurité des dépendances sont éliminées, `npm audit` renvoie zéro.** Aucune ne venait du code du site. Trois ont été réglées par `npm audit fix` seul (nanoid, js-yaml, brace-expansion) ; les trois autres (sharp, postcss, et Next qui en hérite) exigeaient une montée de version.
- **Next 16.2.12 → 16.3.3, et sharp 0.34.5 → 0.35.4.** Faite explicitement plutôt qu'avec `npm audit fix --force`, qui accepte au besoin des changements de version majeure sans le demander. Ici la montée est mineure, donc sans rupture annoncée, mais `eslint-config-next` a été aligné sur la même version pour éviter que les règles ne divergent du framework.
- **La faille qui comptait vraiment est celle de `sharp`**, quatre CVE héritées de libvips. C'est la bibliothèque qui redimensionne les images côté serveur, donc le composant exposé en production. Les autres se déclenchent sur des entrées hostiles que le site n'accepte pas : personne ne peut y téléverser d'image ni de fichier YAML.
- **Vérifié après la montée**, pas seulement compilé : TypeScript et ESLint à zéro, build de production réussi, les 8 routes en 200 et les adresses inconnues en 404, les deux formulaires refusant toujours les entrées invalides (400) et la méthode GET (405), une seule photo de hero servie par écran, l'écran de chargement toujours joué puis retiré, et les quatre pages testées restant lisibles sans JavaScript.
- **Faux signal à connaître** : juste après un vidage de `.next/cache/images`, le premier affichage mesure plus de 2 secondes, le temps que sharp transforme les images. Sur cinq chargements suivants, la médiane retombe à 228 ms en desktop et 172 ms en mobile. Ne pas conclure à une régression sur la première mesure.

- **Photos converties et allégées : `public/photos` passe de 19 Mo à 8,1 Mo.** Douze fichiers étaient des photographies enregistrées en PNG, un format fait pour les logos et les aplats, qui mémorise chaque pixel sans perte. D'où 452 Ko pour une image de 578 × 320, quand `team-gianluca.jpeg` pesait 28 Ko en 640 × 640. Huit ont été converties en JPEG à dimensions identiques, et trois sources surdimensionnées ont été réduites (`hero-group-mobile` 3812 × 5718 → 1200 × 1800, `how-we-move` 4698 × 3132 → 2400 × 1600, `gallery-contact-1` 2268 × 1841 → 1200 × 974).
- **Les dimensions cibles ont été choisies sur ce que Next demande réellement, pas au jugé.** Premier essai à 1600 px de côté le plus long : le hero mobile tombait à 1066 px de large, sous les 1200 px que Next réclame pour un iPhone en densité 3. Refait à 1800, soit 1200 × 1800. Les proportions sont conservées partout, ce qui préserve le calcul de cadrage de `gallery-contact-1`.
- **Piège de mesure** : Next garde les images optimisées dans `.next/cache/images`, et cette réserve survit à un nouveau build. Les premières mesures après conversion montraient donc les anciens fichiers et un gain nul sur `how-we-move`. Après vidage du cache, la page d'accueil desktop passe de **2353 Ko à 761 Ko** (`how-we-move` 590 → 311 Ko), et le mobile de 577 à 537 Ko.
- **À noter, et non corrigé** : les photos de galerie ne font que 578 px de large en source alors qu'un écran retina en demande environ 950. Elles étaient déjà dans cet état, la conversion n'y change rien, mais elles resteront légèrement floues tant qu'on n'aura pas les fichiers d'origine. À joindre à la demande faite à l'équipe.
- **Portraits de l'équipe volontairement laissés intacts**, décision d'Antonino : ils dépendent des photos que chaque membre doit envoyer, et restent un point à traiter avant le déploiement.

- **Le hero était téléchargé deux fois par chaque visiteur.** Le premier point de TEC-03, et le plus coûteux : les deux cadrages du hero, mobile et desktop, étaient rendus par deux `<Image>` dont on masquait l'une en CSS. Or `display: none` agit après coup, alors que le navigateur trouve les deux sources en lisant le HTML, et `priority` posait un préchargement sur chacune. Mesuré sur un build de production, sans défiler : **1310 Ko de hero mobile téléchargés sur un écran d'ordinateur** (56 % de toutes les images de la page d'accueil), et 181 Ko de hero desktop sur un iPhone.
- **Corrigé avec `getImageProps`**, la méthode documentée par Next pour ce cas : les jeux de sources optimisés des deux photos sont placés dans un `<picture>`, et le navigateur choisit avant de télécharger quoi que ce soit. Résultat mesuré : `2197 → 887 Ko` en desktop, `577 → 396 Ko` en mobile, une seule photo de hero servie à chaque fois, et le basculement tombe exactement sur le point de rupture de Tailwind (859 px → mobile, 860 px → desktop).
- **Piège de `getImageProps`** : il ne pose pas le préchargement que `priority` ajoutait. Sans latence réseau, la différence est invisible, ce qui aurait pu faire croire que ce n'était pas un problème. Mesuré sur un réseau 4G simulé (9 Mb/s, 40 ms de latence, médiane sur 7 chargements), l'absence de préchargement coûtait **56 ms en desktop et 100 ms en mobile**. Deux `<link rel="preload">` ont donc été rétablis, **conditionnés par `media`** : la version d'origine en posait deux sans condition et faisait concourir pour la bande passante une photo que le visiteur ne verrait jamais.
- **Correction à ma propre revue.** J'y écrivais que « le visiteur ne télécharge pas ces poids-là, Next redimensionne à la volée ». C'est vrai du redimensionnement et faux du nombre d'images : je raisonnais sur le poids des fichiers sources sans mesurer ce qui partait réellement sur le réseau. C'est le poids gaspillé qui compte, pas celui du dépôt.
- **Reste de TEC-03**, à faire avec les portraits : convertir `hero-group-desktop.png` (2,4 Mo de PNG pour une photographie) en JPEG, et alléger les deux sources de plus de 3 Mo (`hero-group-mobile.jpg` fait 3812 × 5718, soit 21,8 mégapixels pour un téléphone).

- **TEC-02 corrigé : page 404 et écrans d'erreur aux couleurs du club.** Trois fichiers, pour trois niveaux de panne. `not-found.tsx` répond à toute adresse inconnue (« This Page Took A Detour »), `error.tsx` attrape une erreur de rendu de page (« We Pulled A Muscle », avec un bouton de reprise et la référence pour retrouver l'erreur dans les journaux), et `global-error.tsx` couvre le cas où c'est le layout racine lui-même qui casse.
- **Deux pièges de la version 16 de Next, lus dans la doc embarquée avant d'écrire.** La fonction de reprise s'appelle `unstable_retry` et non plus `reset` depuis la 16.2 : elle refait la requête et le rendu, là où `reset` se contentait de vider l'état, donc c'est la seule qui ait une chance d'aboutir sur une panne réseau passagère. Et `metadata` n'est pas lu dans `not-found.tsx`, seulement dans `global-not-found` : inutile d'y déclarer un `noindex`, Next le pose automatiquement sur toute réponse en 404.
- **`global-error.tsx` ne dépend de rien**, par obligation : il remplace tout le document, donc aucune feuille de style du site ne l'atteint. Tout y est écrit en ligne, couleurs de la charte en dur, police système, et le lien de retour est une balise `<a>` nue et non `next/link`, parce que le routeur fait partie de ce qui vient d'échouer. La règle ESLint qui l'interdit est désactivée sur cette seule ligne, avec sa raison.
- **Vérifié en conditions réelles**, pas seulement compilé : `/rien`, `/shop`, `/join-us` et `/calendar/nawak` répondent bien 404 et non 200 (un faux 200 ferait indexer des pages vides par Google) ; une route qui échoue volontairement, ajoutée puis supprimée, a servi à voir `error.tsx` sur un build de production et à cliquer sur son bouton de reprise ; et le layout a été temporairement piégé pour déclencher `global-error.tsx`. Aucune trace de ces tests ne subsiste. La 404 reste lisible sans JavaScript.
- **Un détail de rendu corrigé au passage** : le zéro du « 404 » était en vert atténué, ce qui donnait un olive terne. Les trois chiffres partagent désormais la même teinte. Le vert du club perd sa valeur de signal dès qu'on l'emploie en décor : ici il ne sert qu'au trait de l'en-tête et au bouton.

- **TEC-01 corrigé, le point bloquant de la revue.** Sans JavaScript, le site était un écran noir définitif : l'écran de chargement est un calque opaque servi par le serveur et retiré par le seul JavaScript, et les 67 blocs animés du site partent à `opacity: 0`. Un bloc `<noscript>` dans `src/app/layout.tsx` masque le calque et rend les blocs visibles ; il ne s'applique jamais quand le JavaScript tourne, le navigateur ignorant purement et simplement le contenu d'un `<noscript>` dans ce cas.
- **Un défaut découvert au passage**, invisible dans les mesures et visible sur la capture : le hero attend jusqu'à 2,5 s avant d'apparaître, un délai calibré pour laisser passer un écran de chargement qui, sans JavaScript, ne s'affiche jamais. Le visiteur voyait donc la page, mais après 2,5 s devant une photo muette. Une troisième règle remet `--enter-delay` à zéro dans ce cas précis.
- **Mesuré avec Playwright, JavaScript désactivé**, avant et après. Avant : calque présent sur les 7 pages, 67 blocs invisibles sur 67, luminosité moyenne de l'accueil à 10/255. Après : calque absent, 0 bloc invisible, luminosité 56/255, page lisible en 1,2 s. Avec JavaScript, aucun changement : l'écran de chargement est toujours visible à 0,3 s, retiré à 2,9 s, et `--enter-delay` vaut toujours 2000 ms.
- **INC-01, la langue.** `lang="fr"` alors que tout le contenu est en anglais : un lecteur d'écran prononçait l'anglais avec la phonétique française et Google classait le site dans la mauvaise langue. Passé à `lang="en"`, et les quatre descriptions françaises réécrites. Les lieux (« Parc du Cinquantenaire ») restent en français, ce sont des noms propres.
- **INC-02, onze libellés d'accessibilité traduits.** Ce sont les seuls textes du site qu'on n'a jamais sous les yeux, donc les seuls qu'on ne relit jamais : c'est pour ça qu'ils avaient dérivé.
- **INC-06, trois duplications supprimées.** URL Instagram dans `nav-links.ts`, copyright et email du club dans `site.ts`. Trois décisions vont plus loin qu'un simple déplacement : l'année du copyright est **calculée** dans le fuseau du club (rien à faire au 1er janvier, et même résultat côté serveur et côté navigateur), la poignée Instagram se **déduit** de l'URL, et l'adresse affichée est **la même constante** que celle qui reçoit les messages, qui pouvaient jusqu'ici diverger en silence.
- **`src/lib/club-time.ts` extrait** pour partager le calcul de l'année entre un composant serveur et un composant client. Sans cette extraction, importer le copyright dans le menu mobile embarquait tout le jeu d'événements de secours du calendrier dans le paquet JavaScript envoyé au navigateur.
- **INC-04 annulé : ce n'était pas une incohérence.** Gaëtan passe de « Digital Producer » à « Pacer », et le fait qu'Anaïs porte le même rôle est **normal et voulu** : un run club a plusieurs pacers d'allures différentes, Anaïs pour les plus lents et Gaëtan pour les plus rapides. Ma lecture d'un « doublon » venait de ce que je jugeais des rôles sans connaître le fonctionnement du club. À ne plus signaler.
- **INC-05, décision inverse de la revue.** Les numéros `01` à `04` des cartes « What's BEHYBRID » sont **conservés**, choix assumé d'Antonino après avoir essayé de les retirer et d'y mettre un monogramme. Un commentaire dans le code enregistre que la question a été posée et tranchée, pour que personne ne les retire plus tard en croyant corriger un oubli.
- **INC-07 clos par Antonino.** Le cadrage mobile de `gallery-contact-1.jpg` est descendu pour faire entrer les visages (bande visible 437→1405 devenue 218→1186), desktop inchangé. Le format hors norme ne le dérange pas.
- **Portraits de l'équipe reportés au déploiement**, à la demande d'Antonino : il demandera une photo à chaque membre et on validera taille et poids ensemble. Devenu le **point 7 de la checklist de déploiement**, avec le détail des 9 fichiers.

**2026-08-30**

- **Page `/contact` terminée**, desktop et mobile, refondue d'après deux maquettes. Les trois gros liens sociaux ont disparu (ils faisaient doublon avec le pied de page, situé juste en dessous) au profit de trois cartes d'information : email, Instagram signalé comme la réponse la plus rapide, et lieu de rendez-vous. S'y ajoutent un formulaire complet, la pastille « Usually replies within 24 h » et une galerie de trois photos animée comme celles de l'accueil et du calendrier.
- **Le message arrive par email, rien n'est stocké.** Choix assumé : mettre les messages en base obligerait à construire un endroit pour les consulter, que personne n'ouvrirait. La boîte mail de Gianluca est déjà cet endroit. L'adresse du visiteur est placée en `replyTo`, donc répondre depuis Gmail écrit directement à la personne sans recopier son adresse.
- **Compteur anti-abus mutualisé** (`src/lib/rate-limit.ts`) entre la newsletter et le contact, au lieu d'être copié. Le contact est plus strict, trois envois par minute contre cinq : on ne rédige pas trois messages en une minute de bonne foi.
- **Chaîne validée deux fois sur du réel**, en redirigeant temporairement le destinataire vers une adresse d'Antonino pour ne pas écrire à Gianluca pendant les tests. Validation vérifiée sur cinq cas de refus : champs vides, email mal formé, sujet inventé, message trop court, prénom fait d'espaces.
- **Échelle de titres unifiée.** `Never Miss A Run` et `Contact` partagent désormais la chaîne de classes exacte des titres de l'accueil (42px centré en mobile, 70px aligné à gauche en desktop), et les deux pages ont le même retrait haut : passer de `/calendar` à `/contact` ne déplace plus rien. Antonino revient ainsi sur son refus du 28/08 d'agrandir le titre du calendrier.
- **Titre et en-tête du calendrier inversés** : l'en-tête vert dit maintenant `Never Miss A Run` et le titre `Calendar`. Les deux pages ont donc un titre d'un seul mot, au même endroit et à la même taille.
- **Mise en page desktop de `/contact`** : chaque colonne porte sa propre hauteur pleine. L'en-tête reste en haut, les cartes se centrent dans ce qui reste, le formulaire se centre sur la hauteur totale de l'écran.
- **Faux positif à connaître** : React signale un écart d'hydratation sur `/calendar` à cause d'attributs `__gcruniqueid` et `__gcrremoteframetoken`. Ils n'existent pas dans le code, c'est une extension du navigateur qui les injecte. Vérifiable en navigation privée.
- **Champ piège contre les robots** ajouté au formulaire de contact : un champ masqué, hors du parcours au clavier, qu'un humain ne peut ni voir ni atteindre. Rempli, le message est ignoré et la route répond quand même « envoyé » : signaler le rejet apprendrait à l'auteur du robot quel champ éviter, alors qu'un faux succès le laisse croire que son spam est passé. Ça n'arrête pas un robot écrit pour ce site précis, ça élimine le spam générique, qui est l'essentiel.
- **Validation du navigateur rendue au formulaire de contact** : le `noValidate` avait été copié du formulaire newsletter, qui n'a qu'un champ. Sur cinq champs, un message générique sous le bouton ne dit pas lequel est fautif, alors que le navigateur le pointe. La validation serveur reste la seule qui fasse foi.
- **Reste à faire sur ce formulaire** : la mention de consentement renvoie vers `/privacy`, qui est encore vide.

- **Newsletter en service, chaîne complète validée sur du réel.** Deux adresses personnelles inscrites, emails reçus, liens de confirmation cliqués, contacts effectivement présents dans la liste 3. Les quatre branches du code sont vérifiées : inscription complète, déjà inscrit (y compris avec majuscules et espaces, l'adresse étant normalisée), adresse invalide, panne serveur.
- **Piège Brevo qui a coûté une heure** : `doubleOptinConfirmation` répondait `An active DOI template does not exist` alors que Brevo déclarait lui-même le modèle `isActive: true` **et** `doiTemplate: true`. Le modèle doit porter l'étiquette (champ *Tag*) **`optin`**, que ni le message d'erreur ni l'interface ne réclament. Un premier diagnostic était faux : le test d'isolation utilisait une adresse invalide, or Brevo valide l'adresse avant le modèle et s'arrêtait donc avant le vrai problème.
- **Message d'erreur corrigé** : tout code 400 de Brevo était traduit en « adresse invalide », donc une panne de configuration accusait le visiteur d'une faute qu'il n'avait pas commise et le faisait retaper une adresse pourtant correcte. On ne parle plus d'adresse invalide que si Brevo parle d'adresse.
- **Newsletter branchée sur Brevo.** Le formulaire affichait jusqu'ici une confirmation sans rien enregistrer. Il appelle désormais une route serveur qui parle à Brevo, la clé d'API ne quittant jamais le serveur.
- **Double opt-in**, choisi avec Antonino. Le RGPD n'impose pas la méthode mais impose de **prouver** le consentement : sans confirmation par email, n'importe qui pourrait inscrire l'adresse d'un tiers sans qu'on ait rien à montrer. C'est Brevo qui envoie l'email et n'inscrit qu'après le clic, donc la preuve horodatée reste chez lui, sans que le site ait à la stocker.
- **Configuration Brevo** : liste `Newsletter site` (id 3), modèle `Double opt-in newsletter` (id 1) dont le bouton porte un lien de type « double opt-in », c'est ce type et rien d'autre qui fait qu'un modèle devient un modèle de confirmation. Les trois valeurs ont été vérifiées contre l'API réelle avant d'écrire la moindre ligne.
- **« Déjà inscrit » dit franchement**, choix assumé d'Antonino. Le compromis est documenté dans le code : cela permet de tester si une adresse est dans la liste, information sans enjeu ici, alors qu'une réponse uniforme ferait attendre en vain un email à quelqu'un qui se réinscrit. Une personne désinscrite est traitée comme absente : elle a le droit de revenir.
- **Garde-fou contre l'abus** : la route déclenche des envois d'email sans authentification, d'où une limite de cinq tentatives par minute et par IP. Sa faiblesse est écrite dans le code plutôt que tue : le compteur vit en mémoire, il gêne un script naïf et n'arrêterait pas une attaque distribuée.
- **Page `/newsletter/confirmed`** pour l'arrivée après le clic, en `noindex` puisqu'on n'atteint cette page que par un lien privé.
- **Testé** : validation des adresses (400), méthode GET (405), limite de débit par IP (5 passent, la 6e bloque, un autre visiteur n'est pas affecté), page de confirmation. **Non testé : l'envoi réel**, donc aussi le fait que Brevo accepte une redirection vers `localhost` en développement.
- **Reste à faire** : nettoyer le modèle Brevo, où des blocs de la maquette boutique subsistent sous le contenu (cartes « Votre produit », coupon PROMO15), puis dérouler le test complet depuis le formulaire du site.
- **Piège Brevo, à ne pas réapprendre** : l'API `doubleOptinConfirmation` répondait `An active DOI template does not exist` alors que Brevo déclarait lui-même le modèle `isActive: true` **et** `doiTemplate: true`. Cause réelle : le modèle doit porter l'étiquette (champ *Tag*) **`optin`**, sans quoi l'API ne le voit pas. Le message d'erreur ne mentionne jamais l'étiquette, et l'interface ne la réclame nulle part. Posée par API sur le modèle 1.
- **`.env.example` était couvert par `.gitignore`** et n'avait donc jamais été versionné. Exception ajoutée : c'est le seul endroit qui documente les variables à configurer.

**2026-08-29**

- **Revue complète de la page `/calendar`**, menée avant d'attaquer la newsletter. Cinq points relevés, tous corrigés le jour même.
- **Cascade des révélations plafonnée** : chaque ligne d'événement déclenche sa propre animation en entrant dans l'écran, et son délai était proportionnel à son rang (`300 + index * 140`). Avec onze runs le dernier attendait 1,7 seconde, mais avec une saison complète en base il serait resté invisible sept secondes après être apparu. Le délai s'arrête maintenant au cinquième événement, à 860 ms.
- **Ancres construites sur le `slug`** et non sur la date affichée. `event-28-oct` ne distinguait ni deux années ni deux séances d'une même journée, ce qui aurait produit des `id` en double dans le DOM. L'hypothèse « un entraînement par jour » reste posée dans la grille du mois, mais elle est désormais écrite en commentaire et sa violation dégrade proprement au lieu de casser.
- **Fuseau du club fixé à `Europe/Brussels`**, via `getClubToday()`. La date du jour était lue avec les méthodes de `Date`, qui répondent dans le fuseau de la machine : le serveur Vercel en temps universel et le navigateur bruxellois pouvaient donc afficher deux mois différents, une fois par mois entre minuit et 2h, provoquant un écart d'hydratation React. Le même bug faisait disparaître un run du matin dès 2h du matin la veille. La comparaison se fait maintenant entre dates ISO sous forme de texte, où aucun fuseau ne peut s'inviter.
- **Hiérarchie de titres** : la page n'avait qu'un `h1` suivi de onze titres d'entraînement en `<p>`. Le mois et « Next Runs » passent en `h2`, les séances en `h3`, la flèche décorative en `aria-hidden`.
- **Données structurées `SportsEvent`** ajoutées (`src/components/calendar/events-json-ld.tsx`) : nom, début et fin, lieu, organisateur, lien Strava en `offers` et prix à 0 € (sans prix déclaré, Google n'affiche pas de résultat enrichi). Le décalage horaire est calculé par `Intl` et bascule donc tout seul à l'heure d'hiver, vérifié sur le run du 28 octobre 2026.
- **`metadataBase` et `NEXT_PUBLIC_SITE_URL`** introduits (`src/lib/site.ts`), avec repli local en développement. D'où la nouvelle **checklist de déploiement** plus haut dans ce README.
- **Métadonnées de `/calendar`** ajoutées : la page héritait du titre de l'accueil et ressortait donc sous le même nom dans Google.
- **Textes** : l'introduction promettait « Reserve your spot » alors qu'aucune réservation n'existe sur la page, remplacée par « The next Perform and Connect runs. Join the event on Strava. ». Sur l'accueil, « For All Levels » est retiré de la carte Next Run en mobile uniquement.
- **Nettoyage** : suppression de l'export mort `EVENTS`.
- **Pied du menu hamburger mobile** : le panneau n'était que trois liens flottant dans un écran noir vide, alors que le pied de page qui porte les liens sociaux est à quatre écrans de défilement. Ajout des trois logos Instagram, TikTok et Strava, d'une ligne `© 2026 BEHYBRID — Brussels` et d'un halo vert centré repris du langage des sections de l'accueil. Rien de tout cela n'existe en desktop, le panneau étant déjà en `md:hidden`.
- **Tailles par logo, pas taille commune** : les fichiers d'icônes ne sont pas construits pareil. Instagram et TikTok sont des tuiles carrées avec 12px de marge transparente intégrée, Strava est un chevron qui occupe toute la hauteur de son canevas. À taille de boîte égale, le chevron écrasait les deux autres, d'où 44px pour les tuiles contre 28px pour le chevron.
- **Piège du cache CSS en développement, diagnostiqué** : sur iPhone, le chevron Strava débordait de sa pastille alors que le CSS compilé était correct. Cause réelle : Turbopack ne change pas le nom du fichier CSS quand son contenu change, Safari servait donc une feuille en cache. Les classes déjà utilisées ailleurs dans le site s'y trouvaient et s'affichaient bien ; les deux classes créées pour l'occasion en étaient absentes, laissant l'image sans contrainte de taille. Conclusion retenue : sur du travail mobile testé sur un vrai appareil, préférer des classes déjà présentes dans le site, et forcer le rechargement avant de conclure à un bug de mise en page.

**2026-08-28**

- **La page `/calendar` est considérée comme faite.** Entraînements réels de Gianluca (septembre-octobre 2026) en place, calendrier mensuel navigable, lecture Supabase active, liens Strava fonctionnels, révélations au scroll. On y reviendra plus tard si besoin : reste ouverte la question de filtrer la liste "Next Events" selon le mois affiché.
- **Menu mobile corrigé** : `overflow: hidden` sur le body est ignoré par iOS Safari, et cassait au passage l'ancrage `sticky` du header, ce qui envoyait le logo et la croix hors écran dès qu'on avait scrollé. Le body est désormais figé en `position: fixed` à la position courante, restaurée à la fermeture, et le header passe en `fixed` pendant l'ouverture.
- **Mise en évidence d'un événement revue** : plus aucun fond ni surlignement, seules les couleurs de texte passent au vert. Le bouton Strava garde sa couleur de marque en permanence.
- **Deux bugs de fond identifiés en inspectant le CSS réellement compilé**, après deux hypothèses erronées de ma part :
  - `border-[#FC4C02]` n'était jamais générée par Tailwind v4 : cette écriture est ambiguë entre largeur et couleur de bordure, donc rien n'était émis et la bordure retombait sur `currentColor`, c'est-à-dire blanc. La forme correcte est `border-[color:#FC4C02]`.
  - Le sélecteur CSS `:target` n'est pas réévalué lors d'une navigation Next.js entre deux pages, qui passe par l'API History. Arriver depuis la carte "Next Run" de l'accueil ne déclenchait donc jamais la mise en évidence. Nouveau composant `EventHighlight` qui pose la classe lui-même.

- **Page Calendar animée** : ajout des révélations au scroll sur l'en-tête, la grille du mois, la galerie et la liste "Next Events". Les événements apparaissent désormais un par un avec un léger décalage, date après date.
- **Calendrier mensuel interactif** : la grille écrite en dur a été remplacée par un composant client `MonthCalendar`. Il démarre sur le vrai mois actuel, surligne le jour d'aujourd'hui, les flèches précédent/suivant naviguent entre les mois et les années, les points verts se recalculent à partir des dates des événements, et les jours avec event sont cliquables pour descendre vers la séance correspondante.
- **Dates desktop harmonisées** : les dates de la liste "Next Events" se lisent maintenant sur deux lignes en desktop (`7` puis `OCT`, comme `11` puis `OCT`) pour garder une colonne régulière.
- **Lien Strava pour les inscriptions** : abandon de l'ajout calendrier direct du site. La liste Calendar affiche désormais une action **Join** quand un `stravaUrl` est renseigné, et **Strava soon** quand le frère d'Antonino n'a pas encore créé l'event Strava.
- **Données d'événements isolées** : les événements ont été déplacés dans `src/lib/calendar-events.ts` pour préparer plus proprement le futur branchement Supabase et recevoir les URLs Strava au fil de l'eau.
- **Ajustement contenu et UI** : la statistique "What's BEHYBRID" passe à `300+ Runners` après confirmation des 321 membres Strava, et les logos Strava sont retirés de la liste Calendar.
- **Préparation Supabase Events** : analyse de `data/import/behybrid-events.xlsx`, conversion en `data/import/behybrid-events.csv`, création du schéma `supabase/events.sql` et d'un guide d'import manuel dans `docs/SUPABASE_EVENTS.md`.
- **Lecture Supabase branchée** : `/calendar` appelle maintenant `getCalendarEvents()` côté serveur. Si `SUPABASE_URL` et `SUPABASE_ANON_KEY` sont présents, les événements viennent de Supabase via l'API REST ; sinon le site garde les données locales de secours.
- **Carte Next Run synchronisée** : la landing page appelle aussi `getCalendarEvents()` côté serveur. La carte du hero affiche automatiquement le premier événement à venir et pointe vers son ancre dans `/calendar`.

**2026-08-27**

- **Stratégie de publication arrêtée** : on sort une v1 avec accueil, calendrier, contact et pages légales, sans attendre la boutique, qui demande des décisions produit côté club (quels articles, quels visuels, quels formats). Un site en ligne avec trois pages utiles vaut mieux qu'un site complet qui ne sort jamais.
- **Mécanisme d'activation des liens** : chaque lien porte un indicateur `enabled` dans `src/lib/nav-links.ts`. Rien n'est supprimé, les pages non prêtes sont simplement masquées, et les remettre se fera en une valeur. Le menu affiche donc Home, Calendar, Contact ; les boutons de compte sont derrière un interrupteur unique `SHOW_ACCOUNT_LINKS`.
- **Pied de page adaptatif** : les colonnes sont générées à partir des données et celles sans lien actif disparaissent. La colonne "Club" s'efface, la grille garde ses quatre emplacements en desktop pour que "Follow" occupe la deuxième colonne et laisse la troisième vide, prête à la reprendre.
- **Nouvelles pages** : `/contact` (en-tête, titre, liens sociaux, formulaire à venir) et les trois pages légales, qui partagent le gabarit `LegalPage`.
- **Menu mobile** : les trois liens sont centrés verticalement tant que les liens de compte sont masqués, la disposition d'origine revenant automatiquement ensuite.
- **Mention de consentement** ajoutée sous le formulaire newsletter, avec une césure adaptée à chaque largeur pour tenir sur deux lignes partout.
- **Défilement horizontal corrigé sur iPhone** : le pied de page et la galerie n'étaient pas découpés alors qu'ils contiennent des révélations qui glissent de 48px. La règle globale s'applique désormais à `html` et `body`, iOS Safari ne propageant pas toujours la découpe déclarée sur `html` seul.
- **Contenu** : la carte "Next Run" affiche le titre de l'entraînement (Threshold Intervals) au lieu du détail de séance, la pastille Connect passe à "1 Run / Month", et l'ordre du crew est revu (Gianluca, Clara, Emie, André, Antonino, Adrien, Gaëtan, Olivia, Anaïs).

**2026-08-24**

- **Section "The Crew" terminée**, desktop et mobile. Neuf profils défilent toutes les 3 secondes : bulle photo ronde à contour vert, rôle, nom et accroche. Les neuf photos sont branchées, les rôles et accroches écrits (Gianluca est "Running Coach & Founder").
- **Trois formes essayées avant de trancher** : pellicule des neuf visages en bas de section, jugée kitsch parce que la section ne parlait plus qu'en cercles (une grande bulle, trois anneaux, neuf vignettes) ; puis la ligne des prénoms séparés par des points verts, retenue, qui oppose une matière typographique à la forme ronde et fait écho aux bandeaux du site.
- **Fond propre à la section**, pour ne pas ressembler aux deux sections voisines : couloirs de piste en diagonale à 115°, anneaux concentriques autour de la bulle, et un seul halo au lieu de deux.
- **Dossards retirés** en fin de parcours : un numéro de course suggère un classement, or personne ne précède personne dans l'équipe.
- **Animations** : bulle par la gauche, texte et navigation par la droite, barre des prénoms par le bas. Elles cohabitent avec le fondu de bascule entre profils, posé sur des éléments distincts.
- **Mobile** : anneaux à l'échelle réduite, prénoms en grille de trois pour garantir trois lignes quelle que soit la largeur, accroches à 13px sur iPhone standard.

**2026-08-20**

- **Page `/style-guide` remise à jour.** Elle était non seulement obsolète mais cassée : la section spécimen chargeait des fichiers `AkzidenzGroteskPro-*.woff2` supprimés lors du passage à Archivo, et affichait donc quinze échantillons dans une police de repli. Remplacée par les neuf graisses d'Archivo et l'accent Montserrat Black.
- Le texte sur la typographie annonçait deux familles distinctes, alors que `font-display` et `font-sans` pointent aujourd'hui vers la même police : la distinction n'est plus qu'une convention d'usage, c'est désormais écrit.
- **Ajouts au style guide** : tailles d'affichage hors échelle (titres à 70px en desktop, 40 à 42px en mobile), échelle des rayons portée de deux à cinq entrées, points de rupture (`base`, `phone-lg`, `md`) avec leurs plages, les trois variantes de `Badge` sur trois tailles, les pastilles, et une section Mouvement documentant `Reveal`, `ReplayOnView`, `TiltCard` et le bandeau défilant, avec une carte de démonstration survolable.
- **Finitions mobiles** : descriptions des quatre blocs de "What's BEHYBRID" à 17px sur Pro Max, pastilles des cartes de "How We Move" alignées bord à bord dans la carte, et dans "Become A Member" les étapes et la carte des avantages centrées horizontalement tout en gardant leurs textes alignés à gauche.
- **Galerie et pied de page animés** : les photos se révèlent en cascade, par la gauche en desktop (en partant de celle de droite) et en zigzag en mobile. Le bandeau newsletter, le logo et les colonnes de liens du pied de page suivent le même langage. Le composant `Reveal` gagne une direction `right-phone` (droite sur téléphone, gauche en desktop) et un délai facultatif, posable en classe pour varier au point de rupture.
- **Pied de page retravaillé** : vrais liens Instagram, TikTok et Strava ouverts dans un nouvel onglet, espacements mobiles élargis, liens remontés à 13px, et les deux rangées du bas alignées sur une trame de colonnes commune pour que "Club" tombe sur "Terms of Use" et "Follow" sur "Privacy Policy".
- **Défilement doux réécrit** : `behavior: "smooth"` ne permet pas de régler sa durée et va trop vite pour un site où chaque section fait un écran. Remplacé par une animation manuelle de 1,6 seconde avec courbe d'accélération, interrompue au moindre geste de l'utilisateur. Extraite dans `lib/smooth-scroll.ts` et partagée par les flèches, le bouton du hero, le logo et les liens du menu.
- **Parcours interne** : "Join The Club" ancre désormais vers la section "Become A Member" via le nouveau composant `ScrollButton` (l'ancre reste dans le `href`, donc le bouton fonctionne sans JavaScript). La carte "Next Run" mène à `/calendar#event-28-oct` : chaque événement du calendrier a son ancre, et celui qui est ciblé se met en évidence en CSS seul, via `:target`.
- **Contenu** : calendrier basculé de juillet à octobre 2026 (les quatre mercredis Perform, deux dimanches Connect), date du hero alignée sur le run du 28 octobre, et la dernière étape reformulée en "Tell the coach and you are in", plus fidèle au fonctionnement réel du club qu'une inscription en ligne qui n'existe pas.
- **Nouvelle section "The Crew"**, née de la revue : la page ne montrait aucun visage alors qu'un run club se vend par ses gens. Section plein écran placée entre "How We Move" et "Become A Member", c'est-à-dire là où naît l'objection ("qui mène ces séances, est-ce pour moi ?"), juste avant qu'on demande au visiteur de s'engager. Huit profils défilent un par un toutes les 3 secondes : bulle photo ronde à contour vert, rôle, nom et phrase d'accroche. Flèche droite permanente, flèche gauche à partir du deuxième profil, points de position. Pause au survol, minuteur remis à zéro au clic, et défilement automatique désactivé si le visiteur a demandé de réduire les animations.
- **Carrousel puis grille puis carrousel** : d'abord une bande courte à quatre profils, remplacée par une grille plein écran (un carrousel cache trois profils sur quatre), puis retour au défilement une fois passé à huit personnes, où tout afficher devenait trop dense.
- **Revue de design menée sur l'ensemble de la page.** Points traités : parcours de conversion, carte "Next Run" inerte, formulation de la dernière étape. Points écartés en connaissance de cause : pastilles sous 13px (indications secondaires), galerie sans lien (intention assumée), date en dur (provisoire). Points restants, non bloquants : la double numérotation (01-04 décoratifs sur "What's BEHYBRID" contre 1-4 séquentiels sur les étapes) et la hiérarchie titre/description à deux points d'écart.

**2026-08-18 (suite)**

- **Doctrine mobile arrêtée** : la lisibilité prime sur le "tout doit tenir dans un écran". Plancher à 13px, 15 à 16px pour un texte qu'on veut vraiment lire, et le scroll sur mobile n'est pas considéré comme un défaut. Plusieurs textes descendus trop bas pour tenir dans l'écran ont été remontés en conséquence.
- **Carte des avantages de "Become A Member" en une colonne sur mobile** : les six libellés étaient tombés à 8px pour tenir sur une ligne en deux colonnes. Empilés, ils disposent de 270px au lieu de 110 et remontent à 13px (14 sur Pro Max). Descriptions des quatre étapes portées à 16px.
- **Les quatre blocs de "What's BEHYBRID" repensés en mobile** : passage d'une grille 2x2 à un empilement de rectangles horizontaux (icône à gauche, texte à droite), hauteurs égales via `auto-rows-fr`, titres à 17px et descriptions à 15px. Motif : une colonne de 165px imposait des lignes de trois mots et un texte à 11px. Le numéro d'index est masqué en mobile, faute de place dans la rangée.
- **Écarts garantis entre les blocs** de la section (32px, 40px sur Pro Max) : ils étaient répartis par l'espace disponible, donc collés les uns aux autres dès que le contenu dépassait la hauteur d'écran.
- **Ajustements par taille d'iPhone** via `phone-lg` : carte "Next Run" du hero recentrée et redimensionnée, cartes de "How We Move" agrandies, bloc étapes + avantages centré verticalement sur Pro Max.

**2026-08-18**

- **Section "Become A Member" refondue en desktop** : section pleine hauteur sur fond noir avec deux halos verts, en-tête "Join The Club", titre raccourci en "Become A Member" (70px), sous-titre "In Four Steps · And What Do I Get?" en une ligne. Les quatre étapes passent d'une grille 2x2 à une rangée, séparées par des flèches vertes alignées sur les titres, titres d'étapes en Archivo Black.
- **Panneau "What You Get"** : cadre centré de 900px, coins à 24px, fond `bg-alt`, avec la pastille verte posée à cheval sur la bordure haute et les six avantages en trois colonnes sur deux rangées, icônes en carrés verts teintés (nouveau `BenefitMark`). Le panneau est en 3D complète, avec relief du contenu, puisqu'il n'a pas de `backdrop-filter` à préserver. Largeur calée pour que "Priority Access To Events" tienne sur une ligne.
- Révélations habituelles (titre et étapes par la gauche, panneau par la droite) et flèche de défilement vers la galerie.
- **Cohérence des entrées du hero** : le délai de 2 et 2,5 secondes ne servait qu'à laisser passer l'écran de chargement, mais s'appliquait aussi aux navigations internes, d'où une attente perçue en revenant du calendrier. Nouveau module `preloader-state.ts` : l'écran de chargement signale sa fin, et les entrées choisissent entre le délai long (premier chargement) et aucun délai (navigation interne). Une variable de module suffit, elle survit aux navigations et repart à zéro au rafraîchissement, comme l'écran de chargement lui-même.
- **L'ordre des avantages membres est volontairement conservé**, il diffère de la maquette.
- **Puis desktop retravaillé en deux colonnes**, pour retrouver la cohérence avec "What's BEHYBRID" : bloc de titre ancré en haut, les quatre étapes à gauche sous forme de **fil vertical numéroté** (pastilles rondes vertes, halo sur la dernière étape, titre en accent), et le panneau des avantages à droite, calé sur la hauteur exacte de la colonne de gauche. Les flèches entre étapes ont été essayées puis retirées. La pastille "What You Get" sur la bordure a laissé place à un en-tête interne (trait vert + libellé), au motif des en-têtes de section.
- **Les quatre étapes se révèlent l'une après l'autre**, 220ms d'écart, pour donner à lire le parcours dans l'ordre.
- **Version mobile de la section** : même fil vertical numéroté qu'en desktop, en plus compact, titre "Become A Member" centré sur deux lignes comme "What's BEHYBRID", et carte des avantages en deux colonnes sur trois rangées. Composant `CheckMark` supprimé, devenu inutile.
- **Travail par tailles d'iPhone** : nouvelle variante Tailwind `phone-lg` (428 à 860px) pour ajuster les grands iPhones (Plus, Pro Max) sans toucher aux modèles standards. Utilisée pour le hero (carte "Next Run" recentrée et redimensionnée), les cartes de "How We Move" et la carte des avantages.
- **Correctifs de fin de session sur le desktop de la section** : les deux colonnes reviennent à égalité (la carte avait été élargie pour faire tenir les libellés sur une ligne, au prix de l'uniformité), libellés ramenés à 12px en conséquence, et surtout la grille reprend sa hauteur naturelle. Elle héritait d'un `flex-1` utile en mobile mais qui, en desktop, l'étirait sur toute la hauteur de la section : la carte des avantages faisait alors près du double de la colonne des étapes.
- **Débordement horizontal corrigé** : les révélations décalent les blocs de 48px sur le côté, ce qui créait un défilement latéral en mobile. `overflow-x: clip` sur la page et sur la section concernée (`clip` et non `hidden`, qui casserait le `position: sticky` du header).

**2026-08-17**

- **Section "How We Move" refondue, desktop puis mobile** : photo existante assombrie (voile noir à 72%) avec une trame de fines lignes en surimpression, en-tête "Weekly Runs" aligné sur le motif de "About The Club", titre en blanc, sous-titre, et deux cartes en `backdrop-blur` avec badge, numéro d'index et pastilles (Track Sessions, VO₂ Max, Coach-Led / Easy Pace, Social, All Welcome). Bandeau défilant collé au bord bas, même vitesse et même sens que celui du hero. Section calée sur toute la hauteur de l'écran.
- **Mobile de cette section** : titre centré sur une ligne, sous-titre centré, cartes empilées en grille `auto-rows-fr` (hauteurs égales), pastilles ancrées en pied de carte, texte de la carte Perform raccourci. Rythme vertical aligné sur celui de "What's BEHYBRID" (28 / 36 / 16px).
- **Titres uniformisés** : les trois titres de l'accueil sont à 70px en desktop, la taille de "Perform & Connect".
- **Révélations rejouées à chaque passage** : `Reveal` n'arrête plus d'observer après la première apparition, et ses réglages (48px, 3s à gauche, 4s à droite, courbe du hero) sont alignés sur les entrées du hero. Nouveau composant `ReplayOnView` pour les blocs dont l'animation doit repartir sans casser leur `backdrop-filter` : il ne déplace pas son conteneur, il remonte son contenu et expose le délai d'entrée en variable CSS `--enter-delay` (long au premier chargement, nul ensuite). Utilisé pour le hero et les cartes de "How We Move".
- Nouveau keyframe `slide-in-left-translate`, miroir de celui de droite, et taille `xs` ajoutée au composant `Badge`.
- **Flèche de défilement** ajoutée en bas de "How We Move" (desktop), au-dessus du bandeau, vers la section suivante.

**2026-08-16**

- **Section "What's BEHYBRID" refondue en desktop** d'après la maquette : barre d'en-tête de section, titre à 68px, paragraphe élargi avec accroche en gras, trois chiffres clés séparés par des filets, et quatre cartes numérotées (icône teintée, numéro d'index, texte en pied de carte) à la place du bloc d'icônes. Deux halos verts diffus en fond. Section calée sur `calc(100vh - 5rem)`, la hauteur du header collant, pour que la flèche du hero tombe pile dessus.
- **Cartes 3D** (`TiltCard`) : inclinaison vers le curseur jusqu'à 8°, reflet vert qui suit la souris, bordure et ombre accent au survol, contenu décollé en profondeur. Appliqué aux quatre cartes et à la carte "Next Run" du hero. Deux pièges contournés : `transform-style: preserve-3d` et tout ancêtre transformé désactivent le `backdrop-filter`, d'où la variante `tilt-card--flat` et une animation d'entrée pilotée par `translate` au lieu de `transform`.
- **Révélations au scroll** (`Reveal`, écrit le 15/08 mais jamais branché) : CSS ajouté et composant câblé. Colonne de texte par la gauche, cartes par la droite en cascade de 200ms, sur 2,3s.
- **Section "What's BEHYBRID" en mobile** : en-tête, titre à 42px, paragraphe raccourci (version courte en mobile, texte complet conservé en desktop), chiffres clés répartis sur la largeur et les quatre cartes en 2x2, le tout justifié en hauteur. Hauteur en `lvh` (valeur figée, ne bouge pas pendant le scroll) après avoir écarté `svh` (trop court) et `dvh` (se réajuste en cours de scroll).
- **Navigation** : cliquer sur le lien du menu de la page courante remonte en haut en scroll doux, au lieu de ne rien faire. Nouveau composant `ScrollReset` : le navigateur ne restaure plus la position de scroll au rafraîchissement, on repart du hero. `ScrollCue` accepte désormais une ancre cible et une deuxième flèche a été ajoutée en bas de "What's BEHYBRID" (desktop).
- Composant `SquareMark` supprimé, plus utilisé nulle part depuis le passage aux cartes.

**2026-08-15**

- **Accès iPhone en dev fiabilisé** : l'IP locale du Mac avait changé de sous-réseau (`192.168.0.12` → `192.168.1.12`), ce qui faisait bloquer par Next.js 16 les requêtes du téléphone (origine non autorisée). Symptôme : la page restait figée sur le preloader (HTML chargé mais JS/hydratation bloqués en 403). Correction : `allowedDevOrigins` passé en wildcard `192.168.*.*` dans `next.config.ts`, donc valable quel que soit le sous-réseau/box, sans avoir à remettre l'IP à jour.
- **Composant `Reveal`** (`src/components/ui/reveal.tsx`) versionné : révélation au scroll (fondu + glissement) via `IntersectionObserver`, sans dépendance, respectant `prefers-reduced-motion`. Pas encore branché dans les pages (CSS `.reveal` et intégration à faire).

**2026-08-12**

- **Hero mobile refait** : contenu centré, titre agrandi (correction d'un bug de taille `53pxpx`), boutons en pleine largeur. Toute la section tient désormais dans un seul écran (`100svh`), carte "Next Run" condensée sur mobile (typos et marges réduites, contenu complet conservé), desktop inchangé.
- **Scroll mobile stabilisé** : passage de `dvh` à `svh` sur la hauteur du hero pour supprimer le zoom/reflow de l'image quand la barre du navigateur se rétracte.
- **Menu hamburger mobile** : réorganisé en deux zones (nav publique en haut, Log In / Sign Up en bas) via `justify-between`, tailles de liens harmonisées (Sign Up aligné sur Log In), et **blocage du scroll de la page** quand le menu est ouvert (`overflow: hidden` sur le body).
- **Test sur vrai iPhone** : ajout de `allowedDevOrigins` dans `next.config.ts` pour autoriser l'accès au serveur de dev via l'IP locale.
- **Fix hydratation iOS** : ajout de `formatDetection` (telephone/date/address/email = false) dans les métadonnées, car iOS Safari transformait les dates/heures du hero en liens et cassait l'hydratation React.

**2026-08-09**

- Refonte typographique complète du site : passage d'Akzidenz Grotesk Pro à **Archivo** (poids Thin → Black chargés en `@font-face`), avec **Montserrat Black** réservée à l'accent (utilitaire `font-mont`, ex. le "&" de "PERFORM & CONNECT"). Cohérence des poids sur tout le site (titres en black, sous-titres extrabold, textes medium/regular). Menu en Archivo ExtraBold.
- **Hero de l'accueil entièrement repensé** : bandeau "BEHYBRID · Run Club Brussels" défilant (marquee), titre "PERFORM & CONNECT", badge "Every Weeks", nouvelle accroche, boutons, et carte latérale "NEXT RUN" (date, lieu, workout, distance). Ancien bandeau "Next Event" supprimé. Hauteur du hero calée sur la taille de l'écran pour que le scroll arrive directement sur la section suivante ; photo en `object-cover` plein cadre.
- **Écran de chargement (preloader)** : animation "running" avec un coureur qui parcourt une barre de progression (remplissage blanc, fond en vert accent à faible opacité), ~2 s puis fondu. Ne s'affiche qu'à l'arrivée sur le site, pas lors de la navigation entre pages.
- **Animations d'arrivée** : entrées décalées des blocs du hero (gauche puis droite), indicateur de défilement (rond + flèche) en bas à droite qui scrolle vers la section suivante, et léger agrandissement du logo au survol.
- Ajustements UI accueil (desktop) : resserrement et agrandissement du bloc "How To Become A Member", galerie photos collée (sans gouttière), et divers réglages d'espacement.

**2026-07-31**

- Refonte complète du README en document vitrine et journal de bord vivant.
- Rédaction du document de sécurité `docs/SECURITE.md` (stack Supabase + Stripe + Vercel, RLS, RGPD, checklist).
- Intégration des maquettes Figma (accueil, boutique, calendrier, desktop + mobile).
- Définition de la démarche : design-first, construit avec Claude Code et Claude Design.
- Démarrage du design system : tokens de couleurs (palette de marque + échelle de neutres) et échelle typographique (9 niveaux), avec refactor complet du code (couleurs et tailles) et build de production validé.
- Design system terminé : espacements et rayons uniformisés, composants `Button` et `Badge` extraits, palette et typo simplifiées (7 tokens couleur, 7 niveaux typo, 2 rayons), page `/style-guide` reconstruite en vitrine et capturée dans le README.
- Ajustements UI de la page d'accueil (desktop) : menu du header centré et aligné sur le sous-titre du hero, tracking du titre resserré, section "What's BEHYBRID" (largeur du paragraphe, tailles harmonisées, retours à la ligne des descriptions), radius des icônes, resserrement du bloc "How We Move".
