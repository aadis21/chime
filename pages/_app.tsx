import { useEffect } from "react";
import GlobalStyle from "@styles/GlobalStyle.styled";
import type { AppProps } from "next/app";
import type { NextPageWithLayout } from "@types";
import Script from "next/script";
import { Loader } from "@components/composition";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  // Auto-open Tidio when available
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        typeof window !== "undefined" &&
        (window as any).tidioChatApi &&
        typeof (window as any).tidioChatApi.open === "function"
      ) {
        (window as any).tidioChatApi.open();
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return getLayout(
    <>
      <Script
       src="//code.tidio.co/gljwqxrbv9ib67mqrkmfjffqdxlr2rj4.js" 
        strategy="afterInteractive"
      />
      <GlobalStyle />
      <Loader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
