import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Legal Notice — BEHYBRID Run Club Brussels",
  description: "Mentions légales du site BEHYBRID Run Club Brussels.",
};

export default function Page() {
  return <LegalPage eyebrow="Legal" title="Legal Notice" />;
}
