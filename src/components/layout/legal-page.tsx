import { Container } from "@/components/ui/container";

/**
 * Gabarit commun aux pages légales. Le contenu viendra plus tard, mais la page
 * existe déjà : mieux vaut une page honnêtement vide qu'un lien mort.
 */
export function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip py-14 md:py-20">
      <Container className="relative">
        <div className="flex items-center gap-2.5 md:gap-3.5">
          <span className="h-px w-6 bg-accent md:w-8" />
          <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
            {eyebrow}
          </span>
        </div>

        <h1 className="mt-6 font-display text-[36px] font-black uppercase leading-[0.95] tracking-[-0.02em] md:mt-5 md:text-[64px] md:leading-[0.9]">
          {title}
        </h1>

        <div className="mt-8 max-w-[720px] text-[15px] leading-[1.7] text-muted md:mt-10 md:text-[16px]">
          {children ?? (
            <p>
              Cette page sera complétée prochainement. Pour toute question en
              attendant, écris-nous via la page contact.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
