import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Subscription confirmed — BEHYBRID Run Club Brussels',
  description: 'Your subscription to the BEHYBRID newsletter is confirmed.',
  // Page d'arrivée d'un lien privé : elle n'a rien à faire dans les résultats
  // de recherche.
  robots: { index: false, follow: false },
};

/**
 * Page d'arrivée après le clic sur le lien de confirmation de l'email Brevo.
 * C'est Brevo qui redirige ici, une fois le contact réellement inscrit.
 */
export default function Page() {
  return (
    <section className="relative flex flex-1 items-center overflow-x-clip py-20 md:py-28">
      <Container className="relative">
        <div className="flex items-center gap-2.5 md:gap-3.5">
          <span className="h-px w-6 bg-accent md:w-8" />
          <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
            Newsletter
          </span>
        </div>

        <h1 className="mt-6 max-w-[720px] font-display text-[36px] font-black uppercase leading-[0.95] tracking-[-0.02em] md:mt-5 md:text-[64px] md:leading-[0.9]">
          You are in
        </h1>

        <p className="mt-8 max-w-[560px] text-[15px] leading-[1.7] text-muted md:mt-10 md:text-[16px]">
          Your subscription is confirmed. You will hear from us before the next
          runs, and never more than that.
        </p>

        <div className="mt-9 flex flex-col gap-3 phone-lg:flex-row md:mt-10 md:gap-4">
          <Button href="/calendar" variant="primary" size="md">
            See the next runs
          </Button>
          <Button href="/" variant="ghost" size="md">
            Back home
          </Button>
        </div>
      </Container>
    </section>
  );
}
