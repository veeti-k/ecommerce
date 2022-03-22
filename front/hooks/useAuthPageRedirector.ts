import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserActionTypes } from "../globalState/reducers/userReducer";
import { GlobalStateContext } from "../globalState/store";
import { logger } from "../utils/logger";
import { request } from "../utils/requests";
import { pushUser } from "../utils/router";

export const useAuthPageRedirector = () => {
  const router = useRouter();
  const { dispatch } = useContext(GlobalStateContext);

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
      dispatch({ type: UserActionTypes.SetUser, payload: res.data });
    })();
  }, []);
};
