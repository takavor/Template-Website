"use client";

import "../app/globals.css";
import React, { useState } from "react";

// COMPONENTS
import Link from "next/link";
import NavLink from "./NavLink";
import IconButton from "./IconButton";

// DATA
import { navLinks } from "@/data/navLinks";
import { actionButtons } from "@/data/actionButtons";
import ActionButton from "./ActionButton";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="h-16 shadow-sm p-2 flex justify-between items-center bg-white border-b">
      {/* LEFT SECTION */}
      <div className="flex items-center">
        <Link
          href="/"
          className="m-6 md:ml-10 lg:ml-16 cursor-pointer group-hover:text-gray-600 transition"
        >
          W
        </Link>
        <div className="m-2">Company Name</div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="hidden sm:flex items-center">
        {navLinks.map((link) => (
          <NavLink key={link.name} name={link.name} href={link.href} />
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div className="hidden sm:flex items-center">
        {/* <button className="hover:text-red-400 m-2 transition p-2 rounded-md">
          Log In
        </button>
        <button className="m-2 md:mr-10 lg:mr-16 text-white bg-red-500 hover:bg-red-300  transition p-2 rounded-md">
          Sign up
        </button> */}
        {actionButtons.map((button) => (
          <ActionButton
            key={button.name}
            name={button.name}
            variant={button.variant}
            onClick={button.onClick}
          />
        ))}
      </div>

      {/* HAMBURGER */}
      <IconButton isOpen={isSidebarOpen} onClick={toggleSidebar} />

      {/* SIDEBAR */}
    </nav>
  );
};

export default Navbar;
