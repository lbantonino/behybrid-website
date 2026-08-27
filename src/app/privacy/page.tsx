import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — BEHYBRID Run Club Brussels",
  description: "Politique de confidentialité du site BEHYBRID Run Club Brussels.",
};

export default function Page() {
  return <LegalPage eyebrow="Privacy" title="Privacy Policy" />;
}
