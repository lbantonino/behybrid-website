import Image from "next/image";
import Link from "next/link";

export function Logo({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href="/"
      aria-label="BEHYBRID — back to home"
      className={className}
      onClick={onClick}
    >
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
