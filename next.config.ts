import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise l'accès au serveur de dev depuis d'autres appareils du réseau
  // local (ex. tester le site sur un vrai iPhone via l'IP du Mac).
  allowedDevOrigins: ["192.168.0.12"],
};

export default nextConfig;
