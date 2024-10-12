"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import "@/app/globals.css";

import { BarLoader } from "react-spinners";

const SignupPage = () => {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const registerUserCredentials = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);
    setLoading(true);

    // register user
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "applcation/json",
      },
      body: JSON.stringify(data),
    });

    const id = await response.json();

    if (response.ok) {
      // use login route to create session

      const creds = { email: data.email, password: data.password };
      const signInResponse = await signIn("credentials", {
        ...creds,
        redirect: false,
      });

      if (signInResponse?.ok) {
        // logged in successfully
        setError(false);
        setLoading(false);
        router.push("/dashboard");
      } else {
        console.error("COULD NOT LOG IN AFTER CREATING ACCOUNT");
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <section className="">
      <div className="sm:w-2/3 max-w-xl mt-4 flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl">Company Name</h1>
        </div>
        <div className="w-full bg-white rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
              Create an account
            </h1>

            <form action="" className="" onSubmit={registerUserCredentials}>
              <div className="my-4">
                <label className="" htmlFor="email">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="John Doe"
                  required={true}
                  value={data.name}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                />
              </div>
              <div className="my-4">
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
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
              </div>
              <div className="my-4">
                <label className="" htmlFor="password">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="●●●●●●●●"
                  required={true}
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                className="mb-4 transition w-full text-white bg-primary-500 hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>

              <p
                className={`text-primary-500 text-center ${
                  error ? "" : "invisible"
                }`}
              >
                Email is already taken.
              </p>

              <div
                className={`mt-2 flex items-center justify-center ${
                  loading ? "" : "invisible"
                }`}
              >
                <BarLoader width={50} color="#F53C3C" />
              </div>

              <hr className="border-t border-gray-300 my-8" />

              <div className="text-center">
                <p className="text-sm mb-4">Or sign up using</p>
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
        Already have an account?{" "}
        <a
          href="#"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          onClick={() => router.push("/login")}
        >
          Log in
        </a>
      </p>
    </section>
  );
};

export default SignupPage;
