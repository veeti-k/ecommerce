import { NextRouter } from "next/router";
import toast from "react-hot-toast";
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

  toast.success("Logged out!");

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
