# Supabase Events

Cette note garde la marche à suivre pour passer les entraînements BEHYBRID du fichier Excel vers Supabase.

## Objectif

Remplacer progressivement les événements écrits en dur dans `src/lib/calendar-events.ts` par une table Supabase `events`.

Le site doit pouvoir :

- afficher les entraînements à venir ;
- afficher les points verts dans le calendrier ;
- afficher **Strava soon** quand `strava_url` est vide ;
- afficher **Join** quand `strava_url` contient l'URL de l'event Strava officiel.

## Fichiers préparés

- `data/import/behybrid-events.xlsx` : fichier source fourni par Antonino.
- `data/import/behybrid-events.csv` : version propre prête pour l'import Supabase.
- `supabase/events.sql` : schéma SQL de la table `events`.

## Structure de la table

Colonnes principales :

- `slug` : identifiant lisible et unique de l'event.
- `event_date` : date de la séance.
- `start_time` : heure de début.
- `duration_minutes` : durée prévue, 90 minutes par défaut.
- `title` : nom de la séance.
- `location` : lieu.
- `event_type` : `PERFORM` ou `CONNECT`.
- `strava_url` : lien Strava officiel, vide tant que Gianluca n'a pas créé l'event.

## Import manuel dans Supabase

1. Créer ou ouvrir le projet Supabase.
2. Aller dans **SQL Editor**.
3. Coller le contenu de `supabase/events.sql`.
4. Cliquer sur **Run**.
5. Aller dans **Table Editor**.
6. Ouvrir la table `events`.
7. Utiliser **Import data from CSV**.
8. Importer `data/import/behybrid-events.csv`.
9. Vérifier que les 10 lignes sont présentes.
10. Quand les events Strava existent, remplir `strava_url` pour activer les boutons **Join** sur le site.

## Connecter le site à Supabase

Une fois la table créée et le CSV importé :

1. Dans Supabase, aller dans **Project Settings**.
2. Ouvrir **API**.
3. Copier **Project URL**.
4. Copier la clé **anon public**.
5. Créer un fichier `.env.local` à la racine du site.
6. Renseigner :

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Ne jamais mettre la clé `service_role` dans le site. La clé `anon public` suffit ici parce que la table `events` a une policy de lecture publique.

Après ajout de `.env.local`, redémarrer le serveur Next.js. La page `/calendar` lira alors Supabase automatiquement. Si les variables sont absentes ou si Supabase ne répond pas, le site utilise les données locales de secours dans `src/lib/calendar-events.ts`.

## Règle produit

Gianluca devrait idéalement créer les events Strava du mois à l'avance. Antonino récupère les URLs, les ajoute dans Supabase, et le site active les boutons **Join** sans modifier le code.

Tant que Supabase n'est pas configuré dans `.env.local`, les données affichées restent celles de `src/lib/calendar-events.ts`.
