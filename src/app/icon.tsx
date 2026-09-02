import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
  Icône affichée dans l'onglet du navigateur et dans les favoris.

  Elle remplace le `favicon.ico` livré par Next à la création du projet, un
  rond noir barré d'un triangle blanc, resté en place depuis le premier commit.
  Personne ne le remarque en travaillant, parce qu'on ne regarde jamais son
  propre onglet ; tout le monde le remarque dans une barre de favoris.

  Fond opaque et non transparent : un monogramme blanc sur fond transparent
  disparaît purement et simplement dans un navigateur en thème clair.

  64 × 64 plutôt que 32 : les écrans à haute densité affichent l'icône sur le
  double de pixels, et une icône de 32 y paraît molle.
*/
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(
    join(process.cwd(), "public", "logo", "behybrid-logo-header-menu.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        {/*
          Le fichier source est plus haut que large (1158 × 1293). On garde ses
          proportions et on cale sur la hauteur, sinon le monogramme s'écrase.
        */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt=""
          width={38}
          height={42}
          style={{ width: 38, height: 42 }}
        />
      </div>
    ),
    size,
  );
}
