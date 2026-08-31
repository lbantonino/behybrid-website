"use client";

/*
  Dernier filet : une erreur survenue dans le layout racine lui-même, que
  `error.tsx` ne peut pas attraper puisqu'il vit à l'intérieur de ce layout.

  Ce fichier remplace tout le document. Conséquences, et ce sont des contraintes
  de Next.js, pas des choix :

  - il doit fournir ses propres <html> et <body> ;
  - aucune feuille de style du site ne l'atteint, donc pas de classes Tailwind :
    tout est écrit en ligne, avec les couleurs de la charte en dur ;
  - la police Archivo n'est pas chargée non plus, d'où la pile système ;
  - `metadata` n'est pas lisible dans un composant client, d'où le <title> de
    React.

  Autrement dit : cette page ne doit dépendre de rien. Si elle s'affiche, c'est
  que tout le reste a déjà échoué.
*/

const BG = "#0a0a0a";
const INK = "#f4f4f1";
const MUTED = "#9c9c96";
const ACCENT = "#c9f133";
const FONT =
  "'Archivo', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: BG,
          color: INK,
          fontFamily: FONT,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <title>Something went wrong — BEHYBRID</title>

        <main style={{ maxWidth: "440px", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "22px",
            }}
          >
            <span
              style={{ height: "1px", width: "24px", background: ACCENT }}
              aria-hidden
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              Something Broke
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "40px",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            We Pulled A Muscle
          </h1>

          <p
            style={{
              margin: "18px 0 0",
              fontSize: "15px",
              lineHeight: 1.6,
              color: MUTED,
            }}
          >
            Something went wrong on our side. Trying again often fixes it.
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => unstable_retry()}
              style={{
                appearance: "none",
                border: 0,
                cursor: "pointer",
                borderRadius: "999px",
                padding: "14px 30px",
                background: ACCENT,
                color: BG,
                font: "inherit",
                fontSize: "15px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              Try Again
            </button>

            {/*
              Un lien nu, pas next/link : le routeur fait partie de ce qui vient
              d'échouer, et une navigation côté client repasserait par le layout
              cassé. On force un rechargement complet du site, seule manière
              d'en sortir. La règle ESLint a raison partout ailleurs.
            */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                borderRadius: "999px",
                padding: "14px 30px",
                border: "1px solid rgba(255,255,255,0.3)",
                color: INK,
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              Back Home
            </a>
          </div>

          {error.digest ? (
            <p
              style={{
                margin: "26px 0 0",
                fontSize: "10px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#7a7a75",
              }}
            >
              Reference {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
