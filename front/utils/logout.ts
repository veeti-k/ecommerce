import { NextRouter } from "next/router";
import { Actions, MyDispatch } from "../UserProvider/types";
import { request, tokenRequest } from "./requests";
import { pushUser } from "./router";
import { apiRoutes } from "./routes";

export const logout = (router: NextRouter, dispatch: MyDispatch, redirectTo?: string) => {
  tokenRequest({
    method: "POST",
    path: apiRoutes.logout,
  });

  dispatch({ type: Actions.ClearUser });
  localStorage.clear();

  redirectTo && pushUser(router, redirectTo, "logout func");
};

export const getMe = async (dispatch: MyDispatch) => {
  const res = await request({
    method: "GET",
    path: apiRoutes.userRoot("me"),
  });

  if (!res || !res?.data?.id) return;

  dispatch({ type: Actions.SetUser, payload: res.data });
};
