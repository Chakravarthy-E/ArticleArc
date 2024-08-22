import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/molecules/navbar";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../lib/store";
import { Provider } from "react-redux";

let persister = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
