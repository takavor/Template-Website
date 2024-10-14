"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { BarLoader } from "react-spinners";

import "@/app/globals.css";

const LoginPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  // errors for fields
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // error shown underneath
  const [error, setError] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const loginUserCredentials = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (response?.ok) {
      setError(false);
      setLoading(false);
      router.replace("/dashboard");
    } else {
      console.error("Failed to log in:", response?.error);
      setError(true);
      setLoading(false);
    }
  };

  // get session
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    <div className="m-12">Loading...</div>;
  }

  // function to validate form before registration
  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "" };
    // reset errors
    setErrors(newErrors);
    setError(false);

    let isValid = true;

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <section className="">
      <div className="sm:w-2/3 max-w-xl mt-4 flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl">Company Name</h1>
        </div>
        <div className="w-full bg-card rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-xl leading-tight tracking-tight ">
              Log in to your account
            </h1>

            <form
              action=""
              className=""
              onSubmit={loginUserCredentials}
              noValidate
            >
              <div className="my-4 md:my-6">
                <label className="" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`border ${
                    errors.email ? "border-error" : "border-border"
                  } bg-background rounded-lg block w-full p-2.5`}
                  placeholder=""
                  required={true}
                  value={data.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
                {errors.email && (
                  <div className="text-error font-semibold">
                    <p className="mt-2 text-sm">{errors.email}</p>
                  </div>
                )}
              </div>
              <div className="my-4 md:my-6">
                <label className="" htmlFor="password">
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`border ${
                    errors.password ? "border-error" : "border-border"
                  } bg-background rounded-lg block w-full p-2.5`}
                  placeholder=""
                  required={true}
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
                {errors.password && (
                  <div className="text-error font-semibold">
                    <p className="mt-2 text-sm">{errors.password}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end my-4 md:my-6">
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  "
                      onChange={(e) => {
                        setData({ ...data, rememberMe: e.target.checked });
                      }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 "
                    >
                      Remember me
                    </label>
                  </div>
                </div> */}
                <span className="text-sm">
                  Forgot your password? Click{" "}
                  <a
                    href="#"
                    className="text-center font-medium text-primary/90 hover:underline"
                  >
                    here
                  </a>
                  .
                </span>
              </div>

              <button
                type="submit"
                className="mb-4 transition w-full text-white bg-primary hover:bg-primary/60 focus:ring-2 focus:outline-none focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Log in
              </button>

              {error && (
                <p className="text-center text-error font-semibold mb-2">
                  Invalid email or password.
                </p>
              )}
              <div
                className={`mt-2 flex items-center justify-center ${
                  loading ? "" : "invisible"
                }`}
              >
                <BarLoader width={50} color={`rgb(var(--primary))`} />
              </div>

              {/* GOOGLE PROVIDER SECTION */}
              {/* <hr className="border-t border-gray-300 my-4" />

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
              </div> */}
            </form>
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-light text-gray-500 ">
        Don’t have an account yet?{" "}
        <a
          href="#"
          className="font-medium text-primary/80 hover:underline "
          onClick={() => router.push("/signup")}
        >
          Sign up
        </a>
      </p>
    </section>
  );
};

export default LoginPage;
