import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ChakraProvider, Stack } from "@chakra-ui/react";

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Interview exercice</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
