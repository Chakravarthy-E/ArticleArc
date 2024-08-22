import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/molecules/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
