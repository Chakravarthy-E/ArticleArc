import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { userAuth } from "./userAuth";
import { ReactNode, useEffect } from "react";

const useProtected = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = userAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/sign-in");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};

export default dynamic(() => Promise.resolve(useProtected), { ssr: false });
