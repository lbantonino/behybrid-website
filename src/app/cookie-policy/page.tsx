import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy — BEHYBRID Run Club Brussels",
  description:
    "Which cookies the BEHYBRID Run Club Brussels website uses, and why.",
};

export default function Page() {
  return <LegalPage eyebrow="Cookies" title="Cookie Policy" />;
}
