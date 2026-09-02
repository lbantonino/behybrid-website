import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
  Icône affichée dans l'onglet du navigateur et dans les favoris : le
  monogramme BH blanc, sans fond, choix d'Antonino le 02/09.

  Elle remplace le `favicon.ico` livré par Next à la création du projet, un
  rond noir barré d'un triangle blanc, resté en place depuis le premier commit.
  Personne ne le remarque en travaillant, parce qu'on ne regarde jamais son
  propre onglet ; tout le monde le remarque dans une barre de favoris.

  Le fond transparent est un choix assumé, et il a une contrepartie : un
  monogramme blanc devient peu lisible dans un navigateur au thème clair, où
  l'onglet actif est presque blanc. Le fond noir précédent l'évitait, au prix
  d'un carré sombre qu'Antonino ne voulait pas. Sa décision, notée ici pour
  qu'on ne la « corrige » pas plus tard en croyant réparer un oubli.

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
          // Aucune couleur de fond : le PNG produit garde sa transparence.
        }}
      >
        {/*
          Le fichier source est plus haut que large (1158 × 1293). On garde ses
          proportions et on cale sur la hauteur. Sans fond derrière lui, le
          monogramme peut occuper presque tout le carré : il n'y a plus de
          pastille dont il faudrait ménager les bords.
        */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt=""
          width={54}
          height={60}
          style={{ width: 54, height: 60 }}
        />
      </div>
    ),
    size,
  );
}
