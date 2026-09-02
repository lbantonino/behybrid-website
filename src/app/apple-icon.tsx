import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
  Icône utilisée quand quelqu'un ajoute le site à l'écran d'accueil de son
  iPhone. Sans elle, iOS fabrique une vignette de la page : un carré gris et
  illisible, qui donne l'impression d'un site bâclé au moment précis où
  quelqu'un décide de le garder sous la main.

  180 × 180 est la taille attendue par iOS. Fond opaque obligatoire : iOS ne
  gère pas la transparence ici et la remplacerait par du noir arbitraire.

  Générée par le code et non déposée en fichier, contrairement à l'image de
  partage : celle-ci ne contient qu'un logo sur un aplat, donc le PNG produit
  est minuscule et la question du poids ne se pose pas.
*/
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await readFile(
    join(process.cwd(), "public", "logo", "behybrid-logo-header-menu.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt=""
          width={92}
          height={103}
          style={{ width: 92, height: 103 }}
        />
      </div>
    ),
    size,
  );
}
