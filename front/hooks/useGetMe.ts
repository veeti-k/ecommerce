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

      if (state?.id) return logger.logHook("useGetMe", "stopped, user already set");

      const res = await request({
        method: "GET",
        path: apiRoutes.getUser("me"),
      });

      if (res) dispatch({ type: Actions.SetUser, payload: res.data });
    })();
  }, []);
};
