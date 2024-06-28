"use client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const [user, setUser] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create`,
        user
      );
      if (response.data.success) {
        setUser({
          name: "",
          email: "",
          password: "",
        });
        setLoading(false);
        toast.success("Registration Successful");
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-outfit">
      <div className="bg-gray-200 p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Sign Up</h1>
        <div>
          <div className="mb-4">
            <label className="label-style" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="input-style"
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
            <button className="button-style" onClick={handleSignUp}>
              {loading ? "Loading..." : "Sign-Up "}
            </button>
            <p className="text-center">
              Already have account{" "}
              <span
                className="text-gray-500 hover:underline cursor-pointer"
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
  );
}
