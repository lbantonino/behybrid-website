import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

/*
  Page servie pour toute adresse qui ne correspond à aucune route, ainsi que
  pour les appels explicites à notFound(). Sans ce fichier, Next.js sert sa
  propre page : fond blanc, police système, aucun moyen de revenir à l'accueil.
  C'est la seule situation où le site cesse totalement de ressembler au site.

  Pas d'export `metadata` ici : Next.js ne le lit que pour `global-not-found`.
  Le `noindex` est posé automatiquement sur toute réponse en 404, il n'y a donc
  rien à déclarer.

  Composant serveur volontairement : aucune interaction, donc aucune raison
  d'envoyer du JavaScript pour une page que l'on ne veut voir qu'en cas d'échec.
*/
export default function NotFound() {
  return (
    <section className="relative flex flex-1 items-center overflow-x-clip py-16 md:min-h-[calc(100vh-5rem)] md:py-0">
      {/* Halo vert diffus, comme sur les sections de l'accueil. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px] md:h-[620px] md:w-[620px]"
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-2.5 md:gap-3.5">
            <span className="h-px w-6 bg-accent md:w-8" />
            <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
              Wrong Turn
            </span>
          </div>

          {/*
            Le 404 est décoratif : le message qui compte est le titre juste en
            dessous. On le cache donc aux lecteurs d'écran plutôt que de leur
            faire épeler trois chiffres.

            Une seule teinte pour les trois chiffres : mettre le zéro en vert
            atténué donnait un olive terne, et le vert du club perd sa valeur de
            signal dès qu'on l'utilise en décor. Ici il ne sert qu'au trait de
            l'en-tête et au bouton, c'est-à-dire aux deux endroits utiles.
          */}
          <p
            aria-hidden
            className="mt-6 font-display text-[92px] font-black leading-[0.82] tracking-[-0.04em] text-white/10 md:mt-5 md:text-[180px]"
          >
            404
          </p>

          <h1 className="mt-6 font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:mt-4 md:text-[70px] md:leading-[0.9]">
            This Page
            <br className="md:hidden" /> Took A Detour
          </h1>

          <p className="mt-4 max-w-[440px] text-body-sm text-muted md:mt-5 md:text-body">
            Even the best runners take a wrong turn. The page you were looking
            for does not exist, or it has moved.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center md:mt-10">
            <Button href="/" size="lg">
              Back Home →
            </Button>
            <Button href="/calendar" variant="ghost" size="lg">
              See Calendar
            </Button>
          </div>

          <p className="mt-7 text-body-sm text-faint md:mt-9">
            Looking for something precise?{" "}
            <Link
              href="/contact"
              className="text-ink underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent"
            >
              Write to us
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
