/**
 * Grille commune à tout le site : mêmes marges gauche/droite que le header
 * (logo BH et bouton Sign Up), pour que tout s'aligne verticalement.
 */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>;
}
