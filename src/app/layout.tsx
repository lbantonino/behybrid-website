import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Preloader } from "@/components/layout/preloader";
import { ScrollReset } from "@/components/layout/scroll-reset";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Sert de base à toutes les adresses relatives des métadonnées (images de
  // partage notamment). Sans elle, Next.js ne peut pas les rendre absolues.
  metadataBase: new URL(SITE_URL),
  title: "BEHYBRID — Run Club Brussels",
  description: "One club. One community. Join BEHYBRID Run Club in Brussels.",
  // iOS Safari transforme sinon dates/heures/adresses en liens (ex. "12/08",
  // "19:00"), ce qui modifie le DOM et casse l'hydratation React.
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        {/*
          Sans JavaScript, l'écran de chargement n'est jamais retiré (c'est le
          composant qui s'en charge) et tous les blocs animés restent à
          `opacity: 0` : le visiteur ne verrait qu'une page noire, et un robot
          d'indexation au JavaScript limité verrait la même chose. Ces trois
          règles ne s'appliquent que dans ce cas précis, jamais autrement : le
          navigateur ignore purement et simplement le contenu d'un <noscript>
          quand le JavaScript est actif.
        */}
        <noscript>
          <style>{`
            .preloader { display: none !important; }
            .reveal { opacity: 1 !important; translate: none !important; }
            /* Le hero attend jusqu'à 2,5 s pour laisser passer l'écran de
               chargement. Sans JavaScript celui-ci n'apparaît jamais : le délai
               n'est plus qu'une attente devant une photo muette. */
            [style*="--enter-delay"] { --enter-delay: 0ms !important; }
          `}</style>
        </noscript>
        <ScrollReset />
        <Preloader />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
