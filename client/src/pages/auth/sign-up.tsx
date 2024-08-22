"use client";

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create`,
        user
      );
      if (response.status) {
        setUser({
          name: "",
          email: "",
          password: "",
        });
        toast.success("Account created successfully");
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 1000);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Sign up failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Create a new account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blog.svg" />
      </Head>

      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 font-outfit">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
          <div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                value={user.name}
                onChange={(e) =>
                  setUser((data) => ({ ...data, name: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
                value={user.email}
                onChange={(e) =>
                  setUser((data) => ({ ...data, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                id="password"
                type={!showPassword ? "password" : "text"}
                placeholder="Enter your password"
                required
                value={user.password}
                onChange={(e) =>
                  setUser((data) => ({ ...data, password: e.target.value }))
                }
              />
              {!showPassword ? (
                <AiOutlineEyeInvisible
                  className="absolute inset-y-0 right-2 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  size={20}
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute inset-y-0 right-2 top-11 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  size={20}
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>
            <div className="flex flex-col items-center space-y-4">
              <button
                className="w-full bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => router.push("/auth/sign-in")}
                >
                  Sign In
                </span>{" "}
                here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
