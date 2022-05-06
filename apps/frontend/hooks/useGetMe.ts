import { useContext, useEffect } from "react";
import { UserContext } from "../UserProvider/provider";
import { Actions } from "../UserProvider/types";
import { logger } from "../utils/logger";
import { request } from "../utils/requests";
import { apiRoutes } from "../utils/routes";

export const useGetMe = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      logger.logHook("useGetMe");

      if (state?.userId) return logger.logHook("useGetMe", "stopped, user already set");

      dispatch({ type: Actions.SetStatus, payload: "loading" });

      const res = await request({
        method: "GET",
        path: apiRoutes.userRoot("me"),
        shouldRedirect401: false,
      });

      dispatch({ type: Actions.SetStatus, payload: "loaded" });
      if (res) return dispatch({ type: Actions.SetUser, payload: res.data });
    })();
  }, []);
};