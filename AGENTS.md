<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## Maintenance du README (règle Antonino)

> Écrite **hors** du bloc `nextjs-agent-rules` ci-dessus, à dessein. Ce bloc est
> réécrit par `next dev` à chaque démarrage : la version 16.3.3, installée le
> 31/08, avait effacé cette règle parce qu'elle y avait été placée par erreur.

Le `README.md` de ce projet est un journal de bord vivant qui doit toujours refléter l'avancement réel.

- À la fin de chaque session de travail, mettre à jour le README avant de conclure : section "Avancement du projet", "Journal des sessions" (nouvelle entrée datée), statuts de "Fonctionnalités" si nécessaire, et la ligne "Dernière mise à jour".
- Quand Antonino dit "commit", le prévenir explicitement AVANT de committer que le README doit refléter la session, et proposer de le mettre à jour d'abord.
