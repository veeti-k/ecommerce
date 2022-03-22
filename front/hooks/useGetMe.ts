import { useContext, useEffect } from "react";
import { UserActionTypes } from "../globalState/reducers/userReducer";
import { GlobalStateContext } from "../globalState/store";
import { logger } from "../utils/logger";
import { request } from "../utils/requests";

export const useGetMe = () => {
  const { state, dispatch } = useContext(GlobalStateContext);

  useEffect(() => {
    (async () => {
      logger.logHook("useGetMe");

      if (state?.user?.id) return logger.logHook("useGetMe", "stopped, user already set");

      const res = await request({
        method: "GET",
        path: "/users/me",
      });

      if (res) dispatch({ type: UserActionTypes.SetUser, payload: res.data });
    })();
  }, []);
};
