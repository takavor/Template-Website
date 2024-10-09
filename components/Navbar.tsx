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
    <nav className="h-16 px-4 shadow-sm flex justify-between items-center bg-white border-b lg:px-16">
      {/* LEFT SECTION */}
      <div className="flex items-center">
        <Link
          href="/"
          className="m-2 font-bold cursor-pointer group-hover:text-gray-600 transition"
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
      {!isSidebarOpen && (
        <IconButton appendedClasses="" isOpen={false} onClick={toggleSidebar} />
      )}

      {/* SIDEBAR BLUR */}

      <div
        className={`fixed inset-0 top-16 z-40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      ></div>

      {/* SIDEBAR */}
      <div
        className={`p-4 fixed top-16 left-0 w-64 h-full bg-white shadow-md transform transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Menu</h2>
          <IconButton isOpen={true} onClick={closeSidebar} />
        </div>

        <div className="flex flex-col">
          {/* links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              name={link.name}
              href={link.href}
              isSidebar={true}
            />
          ))}
          {/* buttons */}
          <div className="flex justify-center">
            {actionButtons.map((button) => (
              <ActionButton
                key={button.name}
                name={button.name}
                variant={button.variant}
                onClick={button.onClick}
                isSidebar={true}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
