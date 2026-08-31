import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — BEHYBRID Run Club Brussels",
  description:
    "How BEHYBRID Run Club Brussels collects, uses and protects your personal data.",
};

export default function Page() {
  return <LegalPage eyebrow="Privacy" title="Privacy Policy" />;
}
