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
- ✅ **Calendrier** des entraînements et sorties
- ✅ **Header, footer et navigation** partagés sur tout le site
- ✅ **Identité visuelle** intégrée (logos, photos, polices Archivo + Montserrat)
- ✅ **Design system documenté** sur la page interne `/style-guide`
- ✅ **Formulaire newsletter** (interface prête)
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

**Dernière mise à jour : 2026-08-20**

### Où on en est

Le socle public est en place : page d'accueil, calendrier et style guide fonctionnels, avec un build de production qui passe. Grosse passe de direction artistique : toute la typographie du site est passée à **Archivo** (9 poids) avec **Montserrat Black** en accent, en remplacement d'Akzidenz Grotesk Pro. Le hero de l'accueil a été entièrement repensé (bandeau défilant, titre "PERFORM & CONNECT", carte "NEXT RUN", hauteur plein écran) et enrichi d'animations : écran de chargement "running" (coureur + barre de progression), entrées décalées des blocs, indicateur de scroll, et léger zoom du logo au survol. Les maquettes Figma des écrans clés (accueil, boutique, calendrier) sont finalisées en desktop et mobile.

**La page d'accueil est terminée, en desktop comme en mobile.** Les quatre sections plein écran (hero, What's BEHYBRID, How We Move, Become A Member), la galerie et le pied de page sont finalisés et ne bougeront plus. Le parcours interne est cohérent : le bouton "Join The Club" ancre vers la section d'inscription, la carte "Next Run" mène au run correspondant dans le calendrier, le logo et les liens du menu ramènent en haut, et tous les déplacements verticaux partagent le même défilement doux de 1,6 seconde.

La section **"Become A Member"** est refondue en desktop : en-tête de section, titre à 70px, sous-titre en une ligne, les quatre étapes sur une rangée séparées par des flèches vertes, et un panneau "What You Get" centré, en 3D, avec sa pastille à cheval sur la bordure et les six avantages en trois colonnes. Son mobile reste à faire.

La section **"How We Move"** est terminée en desktop et en mobile : photo plein cadre assombrie et trame technique, titre à 70px, sous-titre, deux cartes floutées avec badge, numéro d'index et pastilles, et un bandeau défilant collé au bord bas. Les trois titres de l'accueil partagent désormais la même taille (70px en desktop). Les révélations au scroll se rejouent à chaque retour à l'écran, sur toutes les sections, hero compris.

La section **"What's BEHYBRID"** est désormais terminée en desktop et en mobile. Refondue d'après les maquettes Figma, elle occupe toute la hauteur de l'écran : barre d'en-tête de section ("About The Club" / "Est. 2024"), grand titre, paragraphe, trois chiffres clés (100+ runners, Every week, Since 2024) et quatre cartes numérotées remplaçant l'ancien bloc d'icônes. Deux halos verts diffus animent le fond. Les cartes, ainsi que la carte "Next Run" du hero, s'inclinent en 3D vers le curseur avec un reflet vert qui le suit. Toutes les colonnes se révèlent au scroll, la gauche par la gauche et les cartes par la droite en cascade.

Le **hero mobile** est finalisé : contenu centré, titre agrandi, et tout le bloc (jusqu'à la carte "Next Run" condensée) tient dans un seul écran sans scroll (`svh` pour éviter le zoom au scroll). Le **menu hamburger mobile** est retravaillé : deux zones distinctes (navigation publique en haut, compte en bas), tailles harmonisées, fond noir plein, et blocage du scroll de la page quand il est ouvert. Corrections mobile : accès au serveur de dev depuis un vrai iPhone (`allowedDevOrigins`) et désactivation de la détection auto iOS des dates/heures (`formatDetection`) qui cassait l'hydratation.

### Prochaine étape

**La page `/calendar`**, jamais retravaillée depuis la refonte de l'accueil. Ensuite, les pages manquantes (`/join-us`, `/shop`, `/login`, `/sign-up` et les trois pages légales), puis le back (authentification Supabase, boutique Stripe, espace admin).

**À régler avant toute mise en ligne** : six routes du menu et du pied de page renvoient encore une erreur 404, faute de pages existantes.

### Reste à faire (vue d'ensemble)

- Finitions UI de l'accueil, sections suivantes (desktop puis mobile)
- Mettre à jour la page `/style-guide` avec la nouvelle typo Archivo (l'ancien specimen Akzidenz est obsolète)
- Page `/join-us`
- Authentification et espace membre (Supabase)
- Boutique et paiement (Stripe)
- Espace administrateur (gestion membres, événements, produits)
- Pages légales (`/privacy`, `/legal-notice`, `/terms`)
- Déploiement (Vercel)
- Version anglaise du README

### Journal des sessions

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
