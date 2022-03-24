import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../globals.css";
import { UserProvider } from "../UserProvider/provider";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
        }}
      />
      <UserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </>
  );
}

export default App;
