import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { logger } from "../utils/logger";
import { tokenRequest } from "../utils/requests";
import { pushUser } from "../utils/router";
import { getToken } from "../utils/token";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const router = useRouter();

  useEffect(() => {
    logger.logHook("useIsLoggedIn");

    (async () => {
      logger.logHook(
        "useIsLoggedIn",
        "Didn't get token from localstorage, trying to get tokens from token endpoint"
      );
      const res = await tokenRequest({
        method: "GET",
        path: "/auth/tokens",
      });

      if (!res || !res.data?.accessToken) {
        logger.logHook("useIsLoggedIn", "Didn't get token from token endpoint");
        pushUser(router, "/login", "useIsLoggedIn");
        return;
      }

      logger.logHook("useIsLoggedIn", "Got tokens from token endpoint");

      setIsLoggedIn(true);
    })();
  }, []);

  return isLoggedIn;
};
