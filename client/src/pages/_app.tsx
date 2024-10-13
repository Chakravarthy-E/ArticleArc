import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/molecules/navbar";
import { ThemeProvider } from "../components/providers/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="w-full mx-auto">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <Component {...pageProps} />
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
    </main>
  );
}
