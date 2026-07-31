# Architecture de sécurité, BEHYBRID Website

> Document de référence pour construire et exploiter la boutique BEHYBRID (`/shop`) sans fuite de données personnelles ni bancaires.
> Public concerné : de vrais utilisateurs avec de vraies coordonnées personnelles et de vrais paiements.
> À relire avant chaque mise en production.

---

## 1. La règle d'or, non négociable

**Aucune donnée bancaire ne doit jamais toucher notre serveur, notre code ou notre base de données.**

Les numéros de carte, dates d'expiration et CVV ne transitent QUE par le prestataire de paiement (Stripe). Notre site ne reçoit qu'un jeton (token) et une confirmation de paiement.

Conséquence directe : en ne touchant jamais aux données de carte, on reste hors du périmètre lourd de la norme **PCI-DSS**. Stripe est certifié PCI niveau 1 et assume cette responsabilité à notre place.

Si un jour tu vois du code qui reçoit, stocke ou logue un numéro de carte, c'est une erreur grave à corriger immédiatement.

---

## 2. La stack et le rôle sécurité de chaque brique

| Couche | Outil | Ce qu'il sécurise à notre place |
|---|---|---|
| Frontend + serveur | Next.js 16 + React 19 | La logique sensible tourne côté serveur (Server Actions / API routes), invisible du navigateur |
| Base de données + Auth | Supabase (Postgres managé) | Authentification, stockage, et surtout Row Level Security (voir section 4) |
| Paiement | Stripe (Checkout ou Payment Element) | Toute la manipulation des cartes bancaires, certifié PCI niveau 1 |
| Hébergement | Vercel | HTTPS automatique, chiffrement des secrets, aucune machine à administrer |

Principe général : on délègue la sécurité aux spécialistes (Stripe, Supabase, Vercel). Notre responsabilité se concentre sur la **configuration correcte** de ces outils, pas sur la réinvention de la sécurité.

---

## 3. Gestion des secrets et des clés

### Les deux clés Supabase, à ne jamais confondre

| Clé | Où elle peut aller | Pouvoir |
|---|---|---|
| `anon` (publique) | Navigateur, code frontend | Limité, soumis à RLS |
| `service_role` (secrète) | UNIQUEMENT variables d'environnement serveur | Tout-puissant, contourne RLS |

**Règle absolue :** la clé `service_role` ne doit jamais apparaître dans du code envoyé au navigateur, dans un commit, ni dans un fichier versionné. Une `service_role` qui fuite = toute la base est ouverte à n'importe qui.

### Où vivent les secrets

- En local : dans un fichier `.env.local` (jamais committé, déjà couvert par `.gitignore`)
- En production : dans les variables d'environnement Vercel (chiffrées)
- Jamais : dans le code, dans un commit, dans un message, dans un log

### Clés Stripe

- Clé publique (`pk_...`) : OK côté frontend
- Clé secrète (`sk_...`) : serveur uniquement, comme la `service_role`
- Secret de webhook (`whsec_...`) : serveur uniquement, sert à vérifier que les notifications de paiement viennent bien de Stripe

---

## 4. Row Level Security (RLS), le point le plus critique

C'est la cause numéro un des fuites de données sur Supabase. À traiter avec un soin absolu.

**Le principe :** RLS est une règle écrite en base qui garantit qu'un utilisateur ne peut lire et modifier QUE ses propres données. Sans RLS, n'importe qui possédant la clé `anon` (qui est publique) peut interroger la base et lire les commandes, adresses et emails de tous les autres clients.

**Les règles à appliquer :**

1. Activer RLS sur CHAQUE table dès sa création, jamais "plus tard".
2. Par défaut, tout est interdit. On autorise ensuite explicitement, ligne par ligne.
3. Une politique type : `un utilisateur peut lire une ligne uniquement si user_id = auth.uid()`.
4. Ne jamais désactiver RLS pour "débloquer" un problème en développement. Corriger la politique à la place.
5. Après chaque nouvelle table, vérifier dans le dashboard Supabase que RLS est bien active (indicateur visible).

Si une seule table de données personnelles n'a pas de RLS active, considère le site comme non sécurisé.

---

## 5. Logique métier et validation côté serveur

Le navigateur n'est jamais digne de confiance : l'utilisateur peut modifier tout ce qui s'y trouve (prix, quantités, statuts).

- Le **prix** d'un produit se recalcule côté serveur à partir de la base, jamais à partir de ce que le navigateur envoie.
- La **création d'une commande** passe par une Server Action ou une API route.
- Le **statut d'un paiement** n'est validé que via un webhook Stripe signé, jamais via un paramètre d'URL de retour.
- Toute donnée reçue de l'utilisateur est **validée** avant usage (format email, longueur, type), idéalement avec une librairie de validation de schéma.

---

## 6. Protection des données personnelles (RGPD)

Le site sera utilisé par de vraies personnes en Belgique / UE. Le RGPD s'applique.

- **Minimisation :** ne stocker que ce qui est strictement nécessaire (nom, email, adresse de livraison). Rien de plus.
- **Données bancaires :** zéro stockage, Stripe s'en charge intégralement.
- **Chiffrement en transit :** HTTPS partout, fourni automatiquement par Vercel.
- **Chiffrement au repos :** assuré par Supabase (Postgres managé).
- **Droit à l'effacement :** prévoir une manière de supprimer le compte et les données d'un utilisateur qui le demande.
- **Consentement :** page de politique de confidentialité claire (la route `/privacy` est déjà prévue dans la navigation) et consentement explicite pour la newsletter.
- **Mots de passe :** jamais stockés en clair. Géré par Supabase Auth (hachage automatique). Ne jamais réimplémenter l'auth soi-même.

---

## 7. Le facteur IA, à ne pas sous-estimer

Ce site est construit avec l'aide de l'IA, par une personne qui n'est pas développeur back-end de métier. C'est un choix assumé et viable, à condition de connaître le risque réel.

Le risque n'est pas l'infrastructure (déléguée à Stripe, Supabase, Vercel). Le risque, c'est la **configuration** : une RLS oubliée, une clé mal placée, une validation manquante. L'IA génère parfois du code qui fonctionne mais laisse un trou de sécurité invisible à l'oeil non averti.

**Règle de travail :** aucune mise en production touchant des données personnelles ou des paiements sans une revue de sécurité dédiée au préalable. Utiliser la commande `/security-review` de Claude Code, et vérifier manuellement la checklist ci-dessous.

---

## 8. Checklist avant chaque mise en production

À cocher intégralement avant tout déploiement qui touche aux données réelles ou au paiement.

**Secrets**
- [ ] Aucune clé secrète (`service_role`, `sk_...`, `whsec_...`) présente dans le code ou un commit
- [ ] Tous les secrets sont dans les variables d'environnement Vercel
- [ ] `.env.local` est bien ignoré par git

**Base de données**
- [ ] RLS activée sur toutes les tables contenant des données utilisateur
- [ ] Politiques RLS testées : un utilisateur A ne peut pas lire les données d'un utilisateur B
- [ ] Aucune table sensible accessible avec la seule clé `anon`

**Paiement**
- [ ] Aucune donnée de carte ne transite par notre serveur
- [ ] Le statut de paiement est vérifié via webhook Stripe signé
- [ ] Le prix est recalculé côté serveur, pas fait confiance au navigateur

**Application**
- [ ] Toute la logique sensible est côté serveur (Server Actions / API routes)
- [ ] Les entrées utilisateur sont validées
- [ ] HTTPS actif (automatique sur Vercel)

**RGPD**
- [ ] Page de politique de confidentialité en ligne (`/privacy`)
- [ ] Mécanisme de suppression de compte / données prévu
- [ ] Consentement newsletter explicite

**Revue**
- [ ] `/security-review` passée sans alerte bloquante
- [ ] Relecture manuelle de cette checklist

---

## 9. Ce qu'il ne faut jamais faire

- Stocker un numéro de carte, un CVV ou une date d'expiration, où que ce soit.
- Mettre une clé `service_role` ou `sk_...` dans du code frontend ou un commit.
- Désactiver RLS pour contourner un bug.
- Faire confiance à un prix, une quantité ou un statut envoyé par le navigateur.
- Réimplémenter l'authentification ou le hachage de mots de passe soi-même.
- Déployer une fonctionnalité touchant des données réelles sans revue de sécurité.

---

_Document créé le 2026-07-31. À maintenir à jour au fur et à mesure que la boutique évolue._
