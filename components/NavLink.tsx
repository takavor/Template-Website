import Link from "next/link";

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
  return (
    <Link
      className={`lg:m-10 md:m-6 ${
        !isSidebar && "m-2 underline-animation"
      } transition ${isSidebar && "my-2 hover:text-red-400"}`}
      href={href}
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

export default NavLink;
