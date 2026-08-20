"use client";

import type { ComponentProps } from "react";
import { Button } from "./button";
import { smoothScrollTo } from "@/lib/smooth-scroll";

/**
 * Bouton qui mène à une section de la page plutôt qu'à une autre page.
 * L'ancre reste dans le `href` : sans JavaScript, le navigateur y saute
 * quand même, il le fait juste sans l'animation.
 */
/** La variante lien de Button, la seule qui nous intéresse ici. */
type ButtonAsLink = Extract<ComponentProps<typeof Button>, { href: string }>;

export function ScrollButton({
  targetId,
  ...props
}: { targetId: string } & Omit<ButtonAsLink, "href" | "onClick">) {
  return (
    <Button
      href={`#${targetId}`}
      onClick={(event) => {
        event.preventDefault();
        smoothScrollTo(targetId);
      }}
      {...props}
    />
  );
}
