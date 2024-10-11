"use client";

import "../app/globals.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

// COMPONENTS
import Link from "next/link";
import NavLink from "./NavLink";
import IconButton from "./IconButton";

// DATA
import { navLinks } from "@/data/navLinks";
import ActionButton from "./ActionButton";

const Navbar = () => {
  const session = useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const router = useRouter();

  return (
    <nav className="h-16 xl:text-lg xl:h-24 px-4 shadow-sm flex justify-between items-center bg-white border-b lg:px-16">
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
        {session.status === "authenticated" ? (
          <p className="mr-2 font-bold">{session.data.user.name}</p>
        ) : (
          <></>
        )}
        {session.status === "authenticated" && (
          <ActionButton
            key="Log Out"
            name="Log Out"
            variant="secondary"
            onClick={() => {
              signOut({ callbackUrl: "/" });
              // router.push("/");
            }}
          />
        )}
        {session.status === "unauthenticated" && (
          <>
            <ActionButton
              key="Log In"
              name="Log In"
              variant="secondary"
              onClick={() => router.push(`${"/login"}`)}
            />
            <ActionButton
              key="Sign Up"
              name="Sign Up"
              variant="primary"
              onClick={() => router.push(`${"/signup"}`)}
            />
          </>
        )}
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
              onClick={closeSidebar}
            />
          ))}

          {/* buttons */}
          <div className="flex justify-center">
            {session.status === "authenticated" && (
              <div className="mt-2 flex flex-col items-center justify-center">
                <p className="text-sm">
                  Logged in as{" "}
                  <span className="font-bold">{session.data.user.name}</span>
                </p>
                <ActionButton
                  key="Log Out"
                  name="Log Out"
                  variant="secondary"
                  onClick={() => {
                    closeSidebar();
                    signOut({ callbackUrl: "/" });
                  }}
                />
              </div>
            )}
            {session.status === "unauthenticated" && (
              <>
                <ActionButton
                  key="Log In"
                  name="Log In"
                  variant="secondary"
                  onClick={() => {
                    closeSidebar();
                    router.push(`${"/login"}`);
                  }}
                />
                <ActionButton
                  key="Sign Up"
                  name="Sign Up"
                  variant="primary"
                  onClick={() => {
                    closeSidebar();
                    router.push(`${"/signup"}`);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
