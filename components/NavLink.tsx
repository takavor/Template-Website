import Link from "next/link";

interface NavLinkProps {
  href: string;
  name: string;
  onClick?: () => void; // optional onClick
}

const NavLink: React.FC<NavLinkProps> = ({ href, name, onClick }) => {
  return (
    <Link
      className="underline-animation lg:m-10 md:m-6 m-2 cursor-pointer transition"
      href={href}
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

export default NavLink;
