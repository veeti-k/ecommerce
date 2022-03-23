import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserProvider/provider";
import { Actions } from "../UserProvider/types";
import { logger } from "../utils/logger";
import { request } from "../utils/requests";
import { pushUser } from "../utils/router";

export const useAuthPageRedirector = () => {
  const router = useRouter();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      logger.log("useAuthPageRedirector");

      const res = await request({
        method: "GET",
        path: "/users/me",
        shouldRedirect401: false,
      });

      if (!res || !res?.data?.id) return;

      pushUser(router, "/", "useAuthPageRedirector");
      dispatch({ type: Actions.SetUser, payload: res.data });
    })();
  }, []);
};
