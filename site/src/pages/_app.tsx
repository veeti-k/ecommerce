import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { ReactNode, useEffect } from "react";
import superjson from "superjson";

import { Flags } from "@ecommerce/shared";

import { ThemeStuff } from "~components/ThemeStuff";
import { ToastStuff } from "~components/ToastStuff";

import "../styles/fonts.css";
import "../styles/globals.css";
import { AppRouter } from "./api/trpc/[trpc]";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeStuff>
      <ToastStuff />

      <SessionProvider session={pageProps.session}>
        {(Component as any).auth ? (
          <Auth requiredRoles={(Component as any).requiredRoles}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ThemeStuff>
  );
};

interface AuthProps {
  children: ReactNode;
  requiredRoles: Flags[];
}

const Auth = ({ children, requiredRoles }: AuthProps) => {
  const { status, data } = useSession({ required: true });

  useEffect(() => {
    if (data?.user.signout) signOut();
  }, [data?.user.signout]);

  if (status === "loading") return <></>;

  if (status === "authenticated") return <>{children}</>;

  return <></>;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const isFrontend = typeof document !== "undefined";

    const url = isFrontend
      ? "/api/trpc"
      : `${process.env.NEXTAUTH_URL}/api/trpc`;

    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url,
        }),
      ],
    };
  },

  ssr: true,
})(App);
