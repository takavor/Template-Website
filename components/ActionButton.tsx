import React from "react";
import { useRouter } from "next/navigation";

interface ActionButtonProps {
  name: string;
  variant: string;
  isSidebar?: boolean;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  name,
  variant,
  isSidebar = false,
  onClick,
}) => {
  const baseClasses =
    "m-2 transition rounded-md text-base focus:outline-none focus:ring-1 focus:ring-primary-600";
  const variantClasses =
    variant === "primary"
      ? "text-white bg-primary-500 hover:bg-primary-300"
      : "text-primary-500 border border-primary-500 hover:bg-primary-100 hover:border-transparent hover:text-white";
  const sidebarVariantClasses = isSidebar
    ? "py-1 px-2 mt-6"
    : "p-2 xl:p-3 xl:text-lg";

  const router = useRouter();
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sidebarVariantClasses} `}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default ActionButton;
