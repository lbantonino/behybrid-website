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
        data-navbar-logo
        className="h-9 w-auto transition-transform duration-200 ease-out hover:scale-110"
      />
    </Link>
  );
}
