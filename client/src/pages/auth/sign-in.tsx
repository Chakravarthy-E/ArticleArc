"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Head from "next/head";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`,
        user
      );
      if (response.status) {
        setUser({
          email: "",
          password: "",
        });
        Cookies.set("user", JSON.stringify(response.data.user));
        Cookies.set("token", response.data.token);
        toast.success("Logged in successfully");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [router, token]);

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in to your account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blog.svg" />
      </Head>

      <div className="flex items-center justify-center min-h-screen p-4 font-outfit bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>
          <div>
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
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => router.push("/auth/sign-up")}
                >
                  Sign up
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
