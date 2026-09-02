import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
  Vignette affichée quand un lien du site est partagé : WhatsApp, Instagram,
  Messenger, Slack, LinkedIn. Sans elle, un lien du club apparaît comme une
  ligne de texte grise au milieu d'une conversation, et passe inaperçu.

  Générée par le code plutôt que dessinée à la main, pour trois raisons :
  elle reste juste si le nom ou la baseline changent, elle réutilise la vraie
  police et la vraie photo du site, et elle est fabriquée une fois au build
  puis mise en cache, donc sans coût à l'exécution.

  Format 1200 × 630 : c'est le rapport 1,91:1 attendu par tous ces services.
  Une image plus petite est floutée à l'agrandissement, une autre proportion
  est rognée sans qu'on choisisse où.
*/

export const alt =
  "BEHYBRID Run Club Brussels — Perform and Connect runs every week";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (...p: string[]) => join(process.cwd(), "public", ...p);

export default async function Image() {
  const [archivoBlack, archivoMedium, photo, logo] = await Promise.all([
    readFile(asset("fonts", "Archivo-Black.ttf")),
    readFile(asset("fonts", "Archivo-Medium.ttf")),
    readFile(asset("photos", "hero-group-desktop.jpg")),
    readFile(asset("logo", "behybrid-logo-header-menu.png")),
  ]);

  const photoUrl = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const logoUrl = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a0a0a",
          fontFamily: "Archivo",
        }}
      >
        {/* Photo du club, en fond */}
        <img
          src={photoUrl}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/*
          Voile sombre. Il n'est pas décoratif : sans lui, le texte blanc passe
          sur le ciel clair et la banderole blanche de la photo, où il devient
          illisible. Plus dense à gauche, là où le texte se pose.
        */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            /*
              Deux pièges du moteur qui dessine cette image, tous deux invisibles
              à la lecture du code :

              · `inset: 0` ne donne pas de taille à l'élément comme le ferait un
                navigateur. Sans `width` et `height` explicites, le voile mesure
                zéro pixel et ne couvre rien ;
              · le raccourci `background` est ignoré, seul `backgroundImage` est
                lu pour un dégradé.

              Résultat des deux : le texte blanc se retrouvait sur le ciel clair
              et sur la banderole blanche de la photo, illisible.
            */
            width: 1200,
            height: 630,
            backgroundImage:
              "linear-gradient(100deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.90) 52%, rgba(8,8,8,0.62) 100%)",
          }}
        />

        {/* Contenu */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "62px 68px",
          }}
        >
          {/* En-tête : trait vert et surtitre, comme sur le site */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 3, backgroundColor: "#c9f133" }} />
            <div
              style={{
                fontSize: 21,
                fontWeight: 900,
                letterSpacing: 5,
                color: "#c9f133",
                textTransform: "uppercase",
              }}
            >
              Every Week · Brussels
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 132,
                fontWeight: 900,
                letterSpacing: -4,
                lineHeight: 1,
                color: "#f4f4f1",
                textTransform: "uppercase",
              }}
            >
              BEHYBRID
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 41,
                fontWeight: 900,
                letterSpacing: 1,
                color: "#f4f4f1",
                textTransform: "uppercase",
              }}
            >
              Run Club Brussels
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 27,
                fontWeight: 500,
                color: "#c9c9c3",
              }}
            >
              Perform &amp; Connect. Different paces, one crew.
            </div>
          </div>

          {/* Pied : monogramme à droite, équilibre le bloc de texte à gauche */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 2,
                color: "#9c9c96",
                textTransform: "uppercase",
              }}
            >
              All paces welcome · No ego
            </div>
            <img
              src={logoUrl}
              alt=""
              width={62}
              height={69}
              style={{ width: 62, height: 69 }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivoBlack, weight: 900, style: "normal" },
        { name: "Archivo", data: archivoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}

/*
  ────────────────────────────────────────────────────────────────────────
  COMMENT REFAIRE L'IMAGE DE PARTAGE

  Ce fichier n'est pas une route : il vit hors de `src/app/` à dessein, et
  Next ne l'exécute jamais. Il est conservé parce qu'il est la seule
  description exacte de l'image livrée.

  Pourquoi l'image est un fichier statique et non cette route :
  `ImageResponse` ne sait produire que du PNG, soit 1088 Ko ici. Le même
  rendu en JPEG pèse 192 Ko, cinq fois et demie moins, pour une différence
  invisible à l'œil. Or cette image est faite pour WhatsApp, où une vignette
  lourde met du temps à apparaître, voire ne s'affiche pas du tout.

  Le prix de ce choix : l'image est figée. Si le nom du club ou la baseline
  changent, il faut la refaire à la main.

  Procédure, quand ce jour arrive :

    1. cp scripts/opengraph-image.generator.tsx src/app/opengraph-image.tsx
    2. rm src/app/opengraph-image.jpg
    3. npm run build && npx next start -p 3100
    4. curl -s -o /tmp/og.png http://localhost:3100/opengraph-image
    5. sips -s format jpeg -s formatOptions 85 /tmp/og.png \
         --out src/app/opengraph-image.jpg
    6. rm src/app/opengraph-image.tsx, puis vérifier le rendu

  Vérifier ensuite que le texte reste lisible : le voile sombre est calculé
  pour cette photo précise, pas pour une autre.
  ────────────────────────────────────────────────────────────────────────
*/
