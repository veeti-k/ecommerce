import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import "../globals.css";
import { GlobalStateProvider } from "../globalState/store";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </GlobalStateProvider>
  );
}

export default App;
