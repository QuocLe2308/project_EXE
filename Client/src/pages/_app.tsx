import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import Favicon from "@/assets/images/favicon.ico";
import "@/styles/globals.css";
import "@/styles/login.css";
import "@/styles/register.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RETstay</title>
        <link href={Favicon.src} rel="icon" />
      </Head>
      <NextUIProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </NextUIProvider>
    </>
  );
}
