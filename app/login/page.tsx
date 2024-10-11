"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { BarLoader } from "react-spinners";

import "@/app/globals.css";

const LoginPage = () => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUserCredentials = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);
    setLoading(true);

    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (response?.ok) {
      setLoading(false);
      setError(false);
      router.push("/dashboard");
    } else {
      console.error("Failed to log in:", response?.error);
      setLoading(false);
      setError(true);
    }
  };

  // get session
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    // router.push("/dashboard");
  }

  return (
    <section className="">
      <div className="sm:w-2/3 max-w-xl mt-4 flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl">Company Name</h1>
        </div>
        <div className="w-full bg-white rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
              Log in to your account
            </h1>

            <form action="" className="" onSubmit={loginUserCredentials}>
              <div className="my-4 md:my-6">
                <label className="" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder=""
                  required={true}
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
              </div>
              <div className="my-4 md:my-6">
                <label className="" htmlFor="password">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder=""
                  required={true}
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
              </div>
              <div className="flex items-center justify-between my-4 md:my-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="mb-4 transition w-full text-white bg-red-500 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Log in
              </button>

              <p
                className={`text-primary-500 text-center ${
                  error ? "" : "invisible"
                }`}
              >
                Invalid email or password. Please try again.
              </p>

              <div
                className={`mt-2 flex items-center justify-center ${
                  loading ? "" : "invisible"
                }`}
              >
                <BarLoader width={50} color="#F53C3C" />
              </div>

              <hr className="border-t border-gray-300 my-4" />

              <div className="text-center">
                <p className="text-sm mb-4">Or log in using</p>
                <div className="flex flex-row justify-center">
                  <div className="cursor-pointer flex h-12 w-12 border border-gray-300 rounded-lg">
                    <Image
                      src="/images/google_logo.svg"
                      alt="google logo"
                      width="64"
                      height="64"
                      className="w-2/3 justify-center items-center mx-auto"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <a
          href="#"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          onClick={() => router.push("/signup")}
        >
          Sign up
        </a>
      </p>
    </section>
  );
};

export default LoginPage;
