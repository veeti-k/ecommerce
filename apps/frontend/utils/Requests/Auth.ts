import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import { MyDispatch, Actions } from "../../UserProvider/types";
import { tokenRequest } from "../requests";
import { pushUser } from "../router";
import { apiRoutes } from "../routes";

type RegisterRequestProps = {
  name: string;
  email: string;
  password: string;
};

export const RegisterRequest = (props: RegisterRequestProps) =>
  tokenRequest({
    method: "POST",
    path: apiRoutes.register,
    body: props,
  });

type LoginRequestProps = {
  email: string;
  password: string;
};

export const LoginRequest = (props: LoginRequestProps) =>
  tokenRequest({
    method: "POST",
    path: apiRoutes.login,
    body: props,
  });

export const Logout = (router: NextRouter, dispatch: MyDispatch, redirectTo?: string) => {
  tokenRequest({
    method: "POST",
    path: apiRoutes.logout,
  });

  dispatch({ type: Actions.ClearUser });
  localStorage.clear();

  toast.success("Logged out!");

  redirectTo && pushUser(router, redirectTo, "logout func");
};
