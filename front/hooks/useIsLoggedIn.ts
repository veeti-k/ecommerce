import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { logger } from "../utils/logger";
import { tokenRequest } from "../utils/requests";
import { pushUser } from "../utils/router";
import { apiRoutes, routes } from "../utils/routes";
import { getToken } from "../utils/token";

export const useIsLoggedIn = (ShouldRedirect401?: boolean) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const router = useRouter();

  useEffect(() => {
    logger.logHook("useIsLoggedIn");

    (async () => {
      const res = await tokenRequest({
        method: "GET",
        path: apiRoutes.tokens,
      });

      if (!res || !res.data?.accessToken) {
        logger.logHook("useIsLoggedIn", "Didn't get token from token endpoint");

        if (!ShouldRedirect401) return;

        pushUser(router, routes.login, "useIsLoggedIn");
        return;
      }

      logger.logHook("useIsLoggedIn", "Got tokens from token endpoint");

      setIsLoggedIn(true);
    })();
  }, []);

  return isLoggedIn;
};
