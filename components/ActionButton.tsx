import React from "react";

interface ActionButtonProps {
  name: string;
  variant: string;
  onClick?: () => void;
  isSidebar?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  name,
  variant,
  onClick,
  isSidebar = false,
}) => {
  const baseClasses =
    "m-2 transition p-2 rounded-md text-base focus:outline-none focus:ring-1 focus:ring-red-600";
  const variantClasses =
    variant === "primary"
      ? "text-white bg-red-500 hover:bg-red-300"
      : "text-red-500 border border-red-500 hover:bg-red-100 hover:border-transparent hover:text-white";
  const sidebarVariantClasses = isSidebar ? "" : "";

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
