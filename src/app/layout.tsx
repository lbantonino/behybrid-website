import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Preloader } from "@/components/layout/preloader";

export const metadata: Metadata = {
  title: "BEHYBRID — Run Club Brussels",
  description: "One club. One community. Rejoins le run club BEHYBRID à Bruxelles.",
  // iOS Safari transforme sinon dates/heures/adresses en liens (ex. "12/08",
  // "19:00"), ce qui modifie le DOM et casse l'hydratation React.
  formatDetection: { telephone: false, date: false, address: false, email: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        <Preloader />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
