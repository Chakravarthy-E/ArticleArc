"use client";
import { clearProfile } from "@/src/lib/slices/auth";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import LogoutConfirmModal from "../atoms/logout-confirm-modal";

const Navbar = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    dispatch(clearProfile());
    setOpenLogoutModal(false);
    toast.success("Logged out successfully");
    setTimeout(() => {
      router.push("/auth/sign-in");
    }, 1000);
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
      return null; // Hide the "Sign in" button when on the sign-in page
    }

    return (
      <button className="button-style" onClick={() => router.push("/profile")}>
        Profile
      </button>
    );
  };

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-2 border-b font-outfit">
        <div>
          <h1
            className="text-3xl font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Blogs
          </h1>
        </div>
        <div className="space-x-5">
          {token ? (
            <>
              {renderProfileButton()}
              <button
                className="button-style"
                onClick={() => setOpenLogoutModal(true)}
              >
                Log out
              </button>
            </>
          ) : (
            renderSignInButton()
          )}
        </div>
      </nav>
      {openLogoutModal && (
        <LogoutConfirmModal confirm={handleLogout} cancel={closeLogOutModal} />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
