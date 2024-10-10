"use client";

import React from "react";
import { useRouter } from "next/navigation";

import "@/app/globals.css";

const page = () => {
  const router = useRouter();

  return (
    <section className="min-h-screen">
      <div className="sm:w-2/3 xl:w-1/2  mt-8 flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl">Company Name</h1>
        </div>
        <div className="w-full bg-white rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
              Create an account
            </h1>

            <form action="" className="space-y-4">
              <div>
                <label className="" htmlFor="name">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="John Doe"
                  required={true}
                />
              </div>
              <div>
                <label className="" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="abc@xyz.com"
                  required={true}
                />
              </div>
              <div>
                <label className="" htmlFor="password">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="•••••••••••"
                  required={true}
                />
              </div>

              <button
                type="submit"
                className="transition w-full text-white bg-red-500 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  onClick={() => router.push("/login")}
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
