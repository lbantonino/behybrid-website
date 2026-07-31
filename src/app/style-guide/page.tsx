import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Design System — BEHYBRID (interne)",
  robots: { index: false, follow: false },
};

/* ---------- Données du design system ---------- */

type Swatch = { token: string; hex: string; note?: string };

const SURFACES: Swatch[] = [
  { token: "bg", hex: "#0a0a0a", note: "Fond principal" },
  { token: "bg-alt", hex: "#111111", note: "Fond des encarts" },
  { token: "accent", hex: "#c9f133", note: "Vert de marque" },
];

const NEUTRALS: Swatch[] = [
  { token: "ink", hex: "#f4f4f1", note: "Texte principal" },
  { token: "muted", hex: "#9c9c96", note: "Texte secondaire" },
  { token: "faint", hex: "#7a7a75", note: "Labels, légendes" },
];

type TypeStep = {
  cls: string;
  token: string;
  px: string;
  family: "font-display" | "font-sans";
};

const TYPE_SCALE: TypeStep[] = [
  { cls: "text-display", token: "display", px: "64px", family: "font-display" },
  { cls: "text-h1", token: "h1", px: "44px", family: "font-display" },
  { cls: "text-h2", token: "h2", px: "30px", family: "font-display" },
  { cls: "text-h3", token: "h3", px: "22px", family: "font-display" },
  { cls: "text-body", token: "body", px: "15px", family: "font-sans" },
  { cls: "text-body-sm", token: "body-sm", px: "13px", family: "font-sans" },
  { cls: "text-label", token: "label", px: "11px", family: "font-display" },
];

const RADII = [
  { cls: "rounded-xl", token: "rounded-xl", note: "12px — cartes & éléments" },
  { cls: "rounded-full", token: "rounded-full", note: "plein — pilules" },
];

/* ---------- Spécimen de polices (conservé) ---------- */

type FontSpec = { suffix: string; group: string };

const FONTS: FontSpec[] = [
  { suffix: "Light", group: "Standard" },
  { suffix: "Regular", group: "Standard" },
  { suffix: "Md", group: "Standard" },
  { suffix: "Bold", group: "Standard" },
  { suffix: "XBd", group: "Standard" },
  { suffix: "Super", group: "Standard" },
  { suffix: "Cn", group: "Condensé" },
  { suffix: "MdCn", group: "Condensé" },
  { suffix: "BoldCn", group: "Condensé" },
  { suffix: "XBdCn", group: "Condensé" },
  { suffix: "LightCn", group: "Condensé" },
  { suffix: "Ext", group: "Étendu" },
  { suffix: "MdEx", group: "Étendu" },
  { suffix: "BoldEx", group: "Étendu" },
  { suffix: "LightEx", group: "Étendu" },
];

const FONT_GROUPS = ["Standard", "Condensé", "Étendu"];
const SAMPLE_TEXT = "BEHYBRID Run Club Brussels — 0123456789";

/* ---------- Petits blocs réutilisables ---------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 font-display text-label font-bold uppercase tracking-[2px] text-accent">
      {children}
    </h2>
  );
}

function ColorSwatch({ token, hex, note }: Swatch) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-20 w-full rounded-xl border border-line"
        style={{ background: `var(--color-${token})` }}
      />
      <div>
        <p className="font-display text-body-sm font-bold uppercase">{token}</p>
        <p className="text-label uppercase tracking-wide text-faint">{hex}</p>
        {note ? <p className="text-label text-muted">{note}</p> : null}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
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

      <header className="mb-16">
        <h1 className="font-display text-h1 font-black uppercase">
          BEHYBRID — Design System
        </h1>
        <p className="mt-3 max-w-2xl text-body-sm text-muted">
          Référence interne du système visuel du site : couleurs, typographie,
          rayons et composants. Page non indexée, non liée dans le site.
        </p>
      </header>

      {/* Couleurs */}
      <section className="mb-16">
        <SectionTitle>Couleurs — Fonds &amp; marque</SectionTitle>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {SURFACES.map((s) => (
            <ColorSwatch key={s.token} {...s} />
          ))}
        </div>

        <div className="mt-10">
          <SectionTitle>Couleurs — Neutres (texte)</SectionTitle>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {NEUTRALS.map((s) => (
              <ColorSwatch key={s.token} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Typographie */}
      <section className="mb-16">
        <SectionTitle>Typographie — Échelle</SectionTitle>
        <p className="mb-6 text-body-sm text-muted">
          Deux familles : <span className="font-display font-bold">font-display</span>{" "}
          (Akzidenz condensé, titres et labels) et{" "}
          <span className="font-sans">font-sans</span> (Akzidenz standard, corps de texte).
        </p>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {TYPE_SCALE.map((t) => (
            <div
              key={t.token}
              className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-6"
            >
              <span className={`${t.cls} ${t.family} font-bold uppercase leading-none text-ink`}>
                Hybrid
              </span>
              <span className="text-label uppercase tracking-wide text-faint md:ml-auto">
                text-{t.token} · {t.px} · {t.family}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Rayons */}
      <section className="mb-16">
        <SectionTitle>Rayons</SectionTitle>
        <div className="grid grid-cols-2 gap-5">
          {RADII.map((r) => (
            <div key={r.token} className="flex flex-col gap-2">
              <div className={`h-20 w-full border border-accent/60 bg-bg ${r.cls}`} />
              <p className="font-display text-body-sm font-bold uppercase">{r.token}</p>
              <p className="text-label text-muted">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Composants */}
      <section className="mb-16">
        <SectionTitle>Composants — Boutons</SectionTitle>
        <div className="flex flex-col gap-6">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-4">
              <span className="w-24 text-label uppercase tracking-wide text-faint">
                {variant}
              </span>
              <Button variant={variant} size="sm">
                Small
              </Button>
              <Button variant={variant} size="md">
                Medium
              </Button>
              <Button variant={variant} size="lg">
                Large
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <SectionTitle>Composants — Badges</SectionTitle>
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="accent" size="md">
              Accent
            </Badge>
            <Badge variant="outline" size="md">
              Outline
            </Badge>
            <Badge variant="accent" size="sm" uppercase>
              Perform
            </Badge>
            <Badge variant="outline" size="sm" uppercase>
              Connect
            </Badge>
          </div>
        </div>
      </section>

      {/* Spécimen de polices */}
      <section>
        <SectionTitle>Polices — Spécimen Akzidenz Grotesk Pro</SectionTitle>
        {FONT_GROUPS.map((group) => (
          <div key={group} className="mb-10">
            <h3 className="mb-3 text-label font-bold uppercase tracking-wide text-muted">
              {group}
            </h3>
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {FONTS.filter((font) => font.group === group).map((font) => (
                <div key={font.suffix} className="flex flex-col gap-1 py-4">
                  <span
                    style={{ fontFamily: `AGP-${font.suffix}` }}
                    className="text-h3 leading-snug text-ink"
                  >
                    {SAMPLE_TEXT}
                  </span>
                  <span className="text-label font-medium uppercase tracking-wide text-muted">
                    AkzidenzGroteskPro-{font.suffix}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
