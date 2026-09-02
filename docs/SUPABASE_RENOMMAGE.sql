-- Harmonisation des noms de lieux et de titres — décidée par Antonino le 02/09/2026
--
-- À exécuter dans Supabase : menu « SQL Editor », coller, puis « Run ».
-- Ces requêtes ne peuvent pas être lancées depuis le site : la clé publique
-- utilisée par le serveur a le droit de lire la table, pas de l'écrire. C'est
-- le bon réglage, et il faut le garder.
--
-- Convention appliquée :
--   · les lieux sont des noms propres et gardent leurs majuscules d'origine
--   · les titres d'entraînement ne prennent une majuscule qu'à la première lettre

-- 1. Le lieu principal. « Parc du Cinquantenaire » est un nom propre.
--    9 lignes attendues.
update events
   set location = 'Parc du Cinquantenaire'
 where location = 'Parc du cinquantenaire';

-- 2. Les deux titres qui ne suivaient pas la convention.
--    « Parc Royal » et « Parc de Woluwe » sont déjà corrects, on n'y touche pas.
update events set title = '5km test'               where title = '5km TEST';
update events set title = '5km interval challenge' where title = '5km Interval Challenge';

-- 3. Vérification. Le résultat ne doit contenir aucune ligne.
select event_date, title, location
  from events
 where location like 'Parc du cinquantenaire'
    or title <> concat(upper(left(title, 1)), lower(right(title, length(title) - 1)));
