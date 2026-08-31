import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Legal Notice — BEHYBRID Run Club Brussels",
  description:
    "Who publishes and hosts the BEHYBRID Run Club Brussels website.",
};

export default function Page() {
  return <LegalPage eyebrow="Legal" title="Legal Notice" />;
}
