import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide — BEHYBRID (interne)",
  robots: { index: false, follow: false },
};

type FontSpec = { suffix: string; group: string };

const FONTS: FontSpec[] = [
  { suffix: "Light", group: "Standard" },
  { suffix: "Regular", group: "Standard" },
  { suffix: "Md", group: "Standard" },
  { suffix: "Bold", group: "Standard" },
  { suffix: "XBd", group: "Standard" },
  { suffix: "Super", group: "Standard" },
  { suffix: "LightIt", group: "Standard" },
  { suffix: "It", group: "Standard" },
  { suffix: "MdIt", group: "Standard" },
  { suffix: "BoldIt", group: "Standard" },
  { suffix: "XBdIt", group: "Standard" },
  { suffix: "SuperItalic", group: "Standard" },
  { suffix: "Cn", group: "Condensé" },
  { suffix: "MdCn", group: "Condensé" },
  { suffix: "BoldCn", group: "Condensé" },
  { suffix: "XBdCn", group: "Condensé" },
  { suffix: "LightCn", group: "Condensé" },
  { suffix: "CnIt", group: "Condensé" },
  { suffix: "MdCnIt", group: "Condensé" },
  { suffix: "BoldCnIt", group: "Condensé" },
  { suffix: "XBdCnIt", group: "Condensé" },
  { suffix: "LightCnItalic", group: "Condensé" },
  { suffix: "Ext", group: "Étendu" },
  { suffix: "MdEx", group: "Étendu" },
  { suffix: "BoldEx", group: "Étendu" },
  { suffix: "LightEx", group: "Étendu" },
  { suffix: "ExtItalic", group: "Étendu" },
  { suffix: "MedExtIt", group: "Étendu" },
  { suffix: "BoldExIt", group: "Étendu" },
  { suffix: "LigExtIt", group: "Étendu" },
];

const GROUPS = ["Standard", "Condensé", "Étendu"];

const SAMPLE_TEXT = "BEHYBRID Run Club Brussels — 0123456789";

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
      <style>
        {FONTS.map(
          (font) => `
          @font-face {
            font-family: "AGP-${font.suffix}";
            src: url("/fonts/AkzidenzGroteskPro-${font.suffix}.woff2") format("woff2");
          }
        `
        ).join("\n")}
      </style>

      <h1 className="font-display text-3xl font-bold uppercase">
        Style Guide — Polices (usage interne)
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Page de référence non liée dans le site, pour choisir facilement quelle
        police Akzidenz Grotesk Pro utiliser où. Dis simplement le nom affiché
        sous l&apos;échantillon que tu veux.
      </p>

      {GROUPS.map((group) => (
        <section key={group} className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-wide text-accent">
            {group}
          </h2>
          <div className="mt-4 flex flex-col divide-y divide-line border-y border-line">
            {FONTS.filter((font) => font.group === group).map((font) => (
              <div key={font.suffix} className="flex flex-col gap-1 py-5">
                <span
                  style={{ fontFamily: `AGP-${font.suffix}` }}
                  className="text-2xl leading-snug text-ink"
                >
                  {SAMPLE_TEXT}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                  AkzidenzGroteskPro-{font.suffix}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
