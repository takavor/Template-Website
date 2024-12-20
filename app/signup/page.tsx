"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import "@/app/globals.css";

import { BarLoader } from "react-spinners";

const SignupPage = () => {
  const router = useRouter();

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

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // function to validate form before registration
  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "" };
    // reset errors
    setErrors(newErrors);

    let isValid = true;

    if (!data.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

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
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerUserCredentials = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        setLoading(false);
        router.replace("/dashboard");
      } else {
        console.error("COULD NOT LOG IN AFTER CREATING ACCOUNT");
      }
    } else {
      setErrors({ ...errors, email: "Email address is already taken." });
    }
    setLoading(false);
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
              Create an account
            </h1>

            <form
              action=""
              className=""
              onSubmit={registerUserCredentials}
              noValidate
            >
              <div className="my-4 md:my-6">
                <label className="" htmlFor="email">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`border ${
                    errors.name ? "border-error" : "border-border"
                  } bg-background rounded-lg block w-full p-2.5`}
                  placeholder="John Doe"
                  required={true}
                  value={data.name}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                />
                {errors.name && (
                  <div className="text-error font-semibold">
                    <p className="mt-2 text-sm">{errors.name}</p>
                  </div>
                )}
              </div>

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
                  placeholder="abc@xyz.com"
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
                  placeholder="●●●●●●●●"
                  required={true}
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                  minLength={8}
                />
                {errors.password && (
                  <div className="text-error font-semibold">
                    <p className="mt-2 text-sm">{errors.password}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="mb-4 transition w-full text-white bg-primary hover:bg-primary/60 focus:ring-2 focus:outline-none focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign up
              </button>

              <div
                className={`mt-2 flex items-center justify-center ${
                  loading ? "" : "invisible"
                }`}
              >
                <BarLoader width={50} color="#F53C3C" />
              </div>

              {/* GOOGLE PROVIDER SECTION */}
              {/* <hr className="border-t border-gray-300 my-8" />

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
              </div> */}
            </form>
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a
          href="#"
          className="font-medium text-primary/80 hover:underline dark:text-primary-500"
          onClick={() => router.push("/login")}
        >
          Log in
        </a>
      </p>
    </section>
  );
};

export default SignupPage;
