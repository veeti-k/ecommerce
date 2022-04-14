import { tokenRequest } from "../requests";
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
