import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/molecules/navbar";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../lib/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

let persister = persistStore(store);

const queryClient = new QueryClient({});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Component {...pageProps} />
            <Toaster position="top-center" reverseOrder={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
