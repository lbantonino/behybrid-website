import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="BEHYBRID — retour à l'accueil" className={className}>
      <Image
        src="/logo/behybrid-logo-header-menu.png"
        alt="BEHYBRID"
        width={1158}
        height={1293}
        priority
        className="h-9 w-auto"
      />
    </Link>
  );
}

export function FooterLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo/behybrid-logo-footer-menu.png"
      alt="BEHYBRID"
      width={2841}
      height={285}
      className={`h-8 w-auto ${className}`}
    />
  );
}
