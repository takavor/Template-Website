import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  name: string;
  onClick?: () => void; // optional onClick
  isSidebar?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  name,
  onClick,
  isSidebar = false,
}) => {
  const pathname = usePathname();
  return (
    <Link
      className={`lg:m-10 md:m-6 ${
        !isSidebar && "m-2 underline-animation"
      } transition ${isSidebar && "my-2 hover:text-primary-400"}
      ${pathname === href ? "font-bold" : ""}
      `}
      href={href}
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

export default NavLink;
