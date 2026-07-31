/**
 * Emplacement en attente des vraies photos du club. A remplacer par <Image />
 * une fois les fichiers reçus (voir livrables/Site-Web/behybrid-website/public/photos/).
 */
export function PhotoPlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-bg-raised text-center text-label uppercase tracking-wide text-muted ${className}`}
    >
      {label}
    </div>
  );
}
