import { NextRouter } from "next/router";
import { Actions, MyDispatch } from "../UserProvider/types";
import { tokenRequest } from "./requests";
import { pushUser } from "./router";
import { apiRoutes } from "./routes";

export const logout = (router: NextRouter, dispatch: MyDispatch, redirectTo?: string) => {
  tokenRequest({
    method: "POST",
    path: apiRoutes.logout,
  });

  dispatch({ type: Actions.ClearUser });

  redirectTo && pushUser(router, redirectTo, "logout func");
};
