import { tokenRequest } from "../requests";
import { apiRoutes } from "../routes";

type RegisterRequestProps = {
  name: string;
  email: string;
  password: string;
};

export const RegisterRequest = async (props: RegisterRequestProps) =>
  await tokenRequest({
    method: "POST",
    path: apiRoutes.register,
    body: props,
  });

type LoginRequestProps = {
  email: string;
  password: string;
};

export const LoginRequest = async (props: LoginRequestProps) =>
  await tokenRequest({
    method: "POST",
    path: apiRoutes.login,
    body: props,
  });
