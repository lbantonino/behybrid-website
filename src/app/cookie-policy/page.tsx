import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy — BEHYBRID Run Club Brussels",
  description: "Politique de cookies du site BEHYBRID Run Club Brussels.",
};

export default function Page() {
  return <LegalPage eyebrow="Cookies" title="Cookie Policy" />;
}
