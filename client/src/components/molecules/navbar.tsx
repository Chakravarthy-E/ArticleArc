"use client";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import LogoutConfirmModal from "../atoms/logout-confirm-modal";
import { Search } from "lucide-react";
import ThemeToggle from "../atoms/theme-toggle";

const Navbar = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const token = Cookies.get("token");
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setOpenLogoutModal(false);
    toast.success("Logged out successfully");
    router.push("/");
  };

  const closeLogOutModal = () => {
    setOpenLogoutModal(false);
  };
  const renderSignInButton = () => {
    if (router.pathname === "/auth/sign-in") {
      return null;
    }

    return (
      <button
        className="button-style"
        onClick={() => router.push("/auth/sign-in")}
      >
        Sign in
      </button>
    );
  };

  const renderProfileButton = () => {
    if (router.pathname === "/profile") {
      return (
        <button
          className="button-style"
          onClick={() => setOpenLogoutModal(true)}
        >
          Log out
        </button>
      );
    }

    return (
      <button className="button-style" onClick={() => router.push("/profile")}>
        Profile
      </button>
    );
  };

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-2 dark:border-gray-700 border-gray-400  shadow font-outfit">
        <div>
          <h1
            className="text-3xl font-bold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Article<span className="text-gray-600">Arc</span>
          </h1>
        </div>

        <div className="space-x-5 flex items-center">
          <ThemeToggle />
          {token ? <>{renderProfileButton()}</> : renderSignInButton()}
        </div>
      </nav>
      {openLogoutModal && (
        <LogoutConfirmModal confirm={handleLogout} cancel={closeLogOutModal} />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
