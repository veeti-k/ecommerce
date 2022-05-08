import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../globals.css";
import { UserProvider } from "../UserProvider/provider";
import { Toaster } from "react-hot-toast";
import { BreakpointProvider } from "../BreakpointProvider/BreakpointProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      <BreakpointProvider>
        <UserProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </UserProvider>
      </BreakpointProvider>
    </>
  );
}

export default App;
