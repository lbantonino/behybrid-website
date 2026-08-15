import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise l'accès au serveur de dev depuis d'autres appareils du réseau
  // local (ex. tester le site sur un vrai iPhone via l'IP du Mac).
  // Wildcard sur tout le réseau domestique 192.168.x.x : couvre n'importe
  // quel sous-réseau, donc pas besoin de remettre l'IP à jour à chaque
  // changement de box/routeur.
  allowedDevOrigins: ["192.168.*.*"],
  // Masque le petit indicateur de dev Next.js (bas de l'écran) pendant le dev.
  devIndicators: false,
};

export default nextConfig;
