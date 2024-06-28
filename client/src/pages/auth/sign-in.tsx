"use client";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { updateLoggedInState, updateProfile } from "../../lib/slices/auth";

interface LoginData {
  email: string;
  password: string;
}
export default function SignIn() {
  const [user, setUser] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`,
        user
      );

      if (response.data.success) {
        setUser({
          email: "",
          password: "",
        });
        setLoading(false);
        dispatch(updateProfile(response.data?.user));
        console.log(response.data.user);
        dispatch(updateLoggedInState(true));
        Cookies.set("user", JSON.stringify(response.data.user));
        Cookies.set("token", response.data.token);
        toast.success("Logged in Successful");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [router, token]);

  return (
    <div className="flex items-center justify-center min-h-screen font-outfit">
      <div className="bg-gray-200 p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign In</h1>
        <div>
          <div className="mb-4">
            <label className="label-style" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="input-style"
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
            <label className="label-style" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              className="input-style"
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
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black"
                size={20}
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black "
                size={20}
                onClick={() => setShowPassword(!true)}
              />
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button className="button-style" onClick={handleLogin}>
              {loading ? "Loading..." : "Sign-In"}
            </button>
            <p className="text-center">
              Do not have account{" "}
              <span
                className="text-gray-500 hover:underline cursor-pointer"
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
  );
}
