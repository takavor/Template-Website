import React from "react";
import { useRouter } from "next/navigation";

interface ActionButtonProps {
  name: string;
  variant: string;
  href: string;
  isSidebar?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  name,
  variant,
  href,
  isSidebar = false,
}) => {
  const baseClasses =
    "m-2 transition rounded-md text-base focus:outline-none focus:ring-1 focus:ring-red-600";
  const variantClasses =
    variant === "primary"
      ? "text-white bg-red-500 hover:bg-red-300"
      : "text-red-500 border border-red-500 hover:bg-red-100 hover:border-transparent hover:text-white";
  const sidebarVariantClasses = isSidebar ? "py-1 px-2 mt-6" : "p-2";

  const router = useRouter();
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sidebarVariantClasses} `}
      onClick={() => router.push(href)}
    >
      {name}
    </button>
  );
};

export default ActionButton;
