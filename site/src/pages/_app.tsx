import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import superjson from "superjson";
import { Page } from "types/Page";

import { Flags } from "@ecommerce/shared";

import { ThemeStuff } from "~components/ThemeStuff";
import { ToastStuff } from "~components/ToastStuff";
import { hasPermission } from "~utils/hasPermission";

import "../styles/fonts.css";
import "../styles/globals.css";
import { AppRouter } from "./api/trpc/[trpc]";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeStuff>
      <ToastStuff />

      <SessionProvider session={pageProps.session}>
        {(Component as Page).requireAuth ? (
          <Auth requiredFlags={(Component as Page).requiredFlags!}>
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
  requiredFlags: Flags[];
}

const Auth = ({ children, requiredFlags }: AuthProps) => {
  const router = useRouter();
  const { status, data } = useSession({ required: true });
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    if (data?.user.signout) signOut();
  }, [data?.user.signout]);

  useEffect(() => {
    if (data?.user?.flags) {
      const hasPerm = hasPermission(data.user.flags, requiredFlags);
      setAuthSuccess(hasPerm);

      !hasPerm && router.push("/");
    }
  }, [data]);

  if (status === "loading") return <></>;

  if (authSuccess) return <>{children}</>;

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
      queryClientConfig: {
        defaultOptions: {
          queries: {
            onError: (err: any) => toast.error(err?.message),
          },
        },
      },
    };
  },

  ssr: true,
})(App);
