import React from "react";

interface IconButtonProps {
  onClick: () => void;
  isOpen: boolean;
  appendedClasses?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  isOpen,
  appendedClasses,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${appendedClasses} hover:text-primary-400 rounded-md sm:hidden`}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
    </button>
  );
};

export default IconButton;
