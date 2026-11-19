import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/ui/tilt-card";

export const metadata: Metadata = {
  title: "Design System — BEHYBRID (internal)",
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

type TypeStep = { cls: string; token: string; px: string };

const TYPE_SCALE: TypeStep[] = [
  { cls: "text-display", token: "display", px: "64px" },
  { cls: "text-h1", token: "h1", px: "44px" },
  { cls: "text-h2", token: "h2", px: "30px" },
  { cls: "text-h3", token: "h3", px: "22px" },
  { cls: "text-body", token: "body", px: "15px" },
  { cls: "text-body-sm", token: "body-sm", px: "13px" },
  { cls: "text-label", token: "label", px: "11px" },
];

/** Tailles hors échelle, posées en valeurs arbitraires sur l'accueil. */
const DISPLAY_SIZES = [
  { usage: "Titre de section", desktop: "70px", mobile: "40 à 42px" },
  { usage: "Titre de carte", desktop: "46px", mobile: "17 à 23px" },
  { usage: "Chiffre clé", desktop: "44px", mobile: "30px" },
  { usage: "Numéro d'index de carte", desktop: "30px", mobile: "22px" },
];

const RADII = [
  { cls: "rounded-lg", token: "rounded-lg", note: "8px — petites icônes" },
  { cls: "rounded-xl", token: "rounded-xl", note: "12px — icônes, encarts" },
  { cls: "rounded-2xl", token: "rounded-2xl", note: "16px — cartes" },
  { cls: "rounded-3xl", token: "rounded-3xl", note: "24px — grands panneaux" },
  { cls: "rounded-full", token: "rounded-full", note: "plein — pastilles" },
];

const BREAKPOINTS = [
  {
    name: "base",
    range: "jusqu'à 427px",
    note: "iPhone standard, et socle commun à tous les téléphones",
  },
  {
    name: "phone-lg:",
    range: "428px à 859px",
    note: "iPhone Plus et Pro Max uniquement, pour les ajustements fins",
  },
  {
    name: "md:",
    range: "à partir de 860px",
    note: "Desktop. Bascule propre au design, pas le 768px de Tailwind",
  },
];

const MOTION = [
  {
    name: "Reveal",
    note: "Révélation au scroll : fondu et glissement de 48px, 3s à gauche et 4s à droite, courbe cubic-bezier(0.22, 1, 0.36, 1). Se rejoue à chaque retour à l'écran.",
  },
  {
    name: "ReplayOnView",
    note: "Relance une animation CSS sans déplacer son conteneur, pour les blocs dont un parent transformé casserait le backdrop-blur. Expose le délai d'entrée en variable --enter-delay.",
  },
  {
    name: "TiltCard",
    note: "Inclinaison 3D vers le curseur, jusqu'à 8°, reflet vert qui suit la souris, contenu décollé en profondeur (tilt-layer). Variante tilt-card--flat pour les cartes en backdrop-blur.",
  },
  {
    name: "animate-marquee",
    note: "Bandeau défilant, 30s en boucle linéaire. Utilisé dans le hero et en bas de How We Move.",
  },
];

/** Les neuf graisses d'Archivo, toutes chargées sous la même famille. */
const ARCHIVO_WEIGHTS = [
  { weight: 100, name: "Thin" },
  { weight: 200, name: "ExtraLight" },
  { weight: 300, name: "Light" },
  { weight: 400, name: "Regular" },
  { weight: 500, name: "Medium" },
  { weight: 600, name: "SemiBold" },
  { weight: 700, name: "Bold" },
  { weight: 800, name: "ExtraBold" },
  { weight: 900, name: "Black" },
];

const SAMPLE_TEXT = "BEHYBRID Run Club Brussels · 0123456789";

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

/** Pastille des cartes de "How We Move". Définie localement dans page.tsx. */
function Tag({
  tone = "accent",
  children,
}: {
  tone?: "accent" | "neutral";
  children: React.ReactNode;
}) {
  const tones = {
    accent: "border-accent/70 text-accent",
    neutral: "border-white/35 text-ink/85",
  };
  return (
    <span
      className={`rounded-full border px-4 py-2 font-display text-[11px] font-extrabold uppercase tracking-[1.5px] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------- Page ---------- */

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-10">
      <header className="mb-16">
        <h1 className="font-display text-h1 font-black uppercase">
          BEHYBRID — Design System
        </h1>
        <p className="mt-3 max-w-2xl text-body-sm text-muted">
          Référence interne du système visuel du site : couleurs, typographie,
          rayons, composants et mouvement. Page non indexée, non liée dans le
          site.
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
        <p className="mb-6 max-w-2xl text-body-sm text-muted">
          Une seule famille sur tout le site :{" "}
          <span className="font-bold">Archivo</span>, chargée en neuf graisses.{" "}
          <span className="font-display font-bold">font-display</span> et{" "}
          <span className="font-sans font-bold">font-sans</span> pointent donc
          vers la même police, la distinction ne subsiste que par convention
          d&apos;usage. <span className="font-mont font-bold">font-mont</span>{" "}
          est réservée à Montserrat Black, uniquement pour le{" "}
          <span className="font-mont text-accent">&amp;</span> de &quot;Perform
          &amp; Connect&quot;.
        </p>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {TYPE_SCALE.map((t) => (
            <div
              key={t.token}
              className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-6"
            >
              <span
                className={`${t.cls} font-display font-bold uppercase leading-none text-ink`}
              >
                Hybrid
              </span>
              <span className="text-label uppercase tracking-wide text-faint md:ml-auto">
                text-{t.token} · {t.px}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <SectionTitle>Typographie — Tailles d&apos;affichage</SectionTitle>
          <p className="mb-6 max-w-2xl text-body-sm text-muted">
            Les titres de l&apos;accueil dépassent l&apos;échelle et sont posés
            en valeurs arbitraires. À reprendre ici si on les fige un jour en
            tokens.
          </p>
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {DISPLAY_SIZES.map((d) => (
              <div
                key={d.usage}
                className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-6"
              >
                <span className="font-display text-body-sm font-bold uppercase">
                  {d.usage}
                </span>
                <span className="text-label uppercase tracking-wide text-faint md:ml-auto">
                  desktop {d.desktop} · mobile {d.mobile}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rayons */}
      <section className="mb-16">
        <SectionTitle>Rayons</SectionTitle>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
          {RADII.map((r) => (
            <div key={r.token} className="flex flex-col gap-2">
              <div
                className={`h-20 w-full border border-accent/60 bg-bg ${r.cls}`}
              />
              <p className="font-display text-body-sm font-bold uppercase">
                {r.token}
              </p>
              <p className="text-label text-muted">{r.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Points de rupture */}
      <section className="mb-16">
        <SectionTitle>Points de rupture</SectionTitle>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {BREAKPOINTS.map((b) => (
            <div key={b.name} className="flex flex-col gap-1 py-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-display text-body-sm font-bold uppercase text-accent">
                  {b.name}
                </span>
                <span className="text-label uppercase tracking-wide text-faint">
                  {b.range}
                </span>
              </div>
              <p className="text-label text-muted">{b.note}</p>
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
          <div className="flex flex-col gap-5">
            {(["accent", "outline", "white"] as const).map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-4">
                <span className="w-24 text-label uppercase tracking-wide text-faint">
                  {variant}
                </span>
                <Badge variant={variant} size="xs" uppercase>
                  xs
                </Badge>
                <Badge variant={variant} size="sm" uppercase>
                  sm
                </Badge>
                <Badge variant={variant} size="md" uppercase>
                  md
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SectionTitle>Composants — Pastilles</SectionTitle>
          <div className="flex flex-wrap items-center gap-3">
            <Tag tone="accent">Track Sessions</Tag>
            <Tag tone="accent">VO₂ Max</Tag>
            <Tag tone="neutral">Easy Pace</Tag>
            <Tag tone="neutral">All Welcome</Tag>
          </div>
        </div>
      </section>

      {/* Mouvement */}
      <section className="mb-16">
        <SectionTitle>Mouvement</SectionTitle>
        <p className="mb-6 max-w-2xl text-body-sm text-muted">
          Tout est neutralisé si le visiteur a activé la réduction des
          animations dans son système.
        </p>
        <div className="mb-8 flex flex-col divide-y divide-line border-y border-line">
          {MOTION.map((m) => (
            <div key={m.name} className="flex flex-col gap-1 py-4">
              <span className="font-display text-body-sm font-bold uppercase text-accent">
                {m.name}
              </span>
              <p className="text-label leading-relaxed text-muted">{m.note}</p>
            </div>
          ))}
        </div>

        <TiltCard className="relative flex flex-col rounded-2xl border border-line bg-bg-alt p-8">
          <p className="tilt-layer-deep font-display text-h3 font-black uppercase">
            Survole-moi
          </p>
          <p className="tilt-layer mt-2 text-body-sm text-muted">
            Démonstration de TiltCard : inclinaison vers le curseur, reflet vert
            et contenu en profondeur.
          </p>
        </TiltCard>
      </section>

      {/* Spécimen de polices */}
      <section>
        <SectionTitle>Polices — Spécimen Archivo</SectionTitle>
        <div className="mb-10 flex flex-col divide-y divide-line border-y border-line">
          {ARCHIVO_WEIGHTS.map((w) => (
            <div key={w.weight} className="flex flex-col gap-1 py-4">
              <span
                style={{ fontWeight: w.weight }}
                className="font-sans text-h3 leading-snug text-ink"
              >
                {SAMPLE_TEXT}
              </span>
              <span className="text-label font-medium uppercase tracking-wide text-muted">
                Archivo {w.name} · {w.weight}
              </span>
            </div>
          ))}
        </div>

        <SectionTitle>Polices — Accent Montserrat</SectionTitle>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          <div className="flex flex-col gap-1 py-4">
            <span className="font-mont text-h3 leading-snug text-ink">
              {SAMPLE_TEXT}
            </span>
            <span className="text-label font-medium uppercase tracking-wide text-muted">
              Montserrat Black · 900 · utilitaire font-mont
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
