import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserProvider/provider";
import { Actions } from "../UserProvider/types";
import { logger } from "../utils/logger";
import { request } from "../utils/requests";
import { pushUser } from "../utils/router";
import { apiRoutes, routes } from "../utils/routes";

export const useAuthPageRedirector = () => {
  const router = useRouter();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      logger.log("useAuthPageRedirector");

      const res = await request({
        method: "GET",
        path: apiRoutes.userRoot("me"),
        shouldRedirect401: false,
        shouldRetry401: false,
      });

      if (!res || !res?.data?.id) return;

      pushUser(router, routes.home, "useAuthPageRedirector");
      dispatch({ type: Actions.SetUser, payload: res.data });
    })();
  }, []);
};
