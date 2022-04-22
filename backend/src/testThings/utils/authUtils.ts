import axios from "axios";
import { config } from "../../config";
import { SeededUser } from "../../types/User";
import { baseUrl } from "./base";

export const testRefreshTokenCookie = (cookie: string) => {
  expect(cookie).toContain(config.headers.refreshTokenCookieName);
  expect(cookie).toContain("HttpOnly;");
  expect(cookie).toContain("Secure;");
  expect(cookie).toContain("SameSite=Strict;");
  expect(cookie).toContain(`Path=${config.headers.refreshTokenCookiePath};`);
};

export const login = async (user: SeededUser) => {
  const requestBody = {
    email: user.email,
    password: user.password,
  };

  const res = await axios.post(`${baseUrl}/v1/auth/login`, requestBody);

  expect(res.status).toBe(200);
  expect(res.headers[config.headers.accessTokenHeaderName]).toBeDefined();
  expect(res.headers["set-cookie"]![0]).toBeDefined();

  return {
    accessToken: res.headers[config.headers.accessTokenHeaderName] as string,
    refreshToken: res.headers["set-cookie"]![0].split(";")[0].split("=")[1] as string,
  };
};
