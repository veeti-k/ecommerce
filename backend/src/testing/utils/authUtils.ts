import { AxiosInstance } from "axios";
import { config } from "../../config";
import { SeededUser } from "../../types/User";

export const testRefreshTokenCookie = (cookie: string) => {
  expect(cookie).toContain(config.headers.refreshTokenCookieName);
  expect(cookie).toContain("HttpOnly;");
  expect(cookie).toContain("Secure;");
  expect(cookie).toContain("SameSite=Strict;");
  expect(cookie).toContain(`Path=${config.headers.refreshTokenCookiePath};`);
};

export const login = async (client: AxiosInstance, user: SeededUser) => {
  const requestBody = {
    email: user.email,
    password: user.password,
  };

  const res = await client.post(`/v1/auth/login`, requestBody);

  expect(res.status).toBe(200);
  expect(res.headers[config.headers.accessTokenHeaderName]).toBeDefined();
  expect(res.headers["set-cookie"]![0]).toBeDefined();

  const accessToken = res.headers[config.headers.accessTokenHeaderName] as string;
  const refreshToken = res.headers["set-cookie"]![0].split(";")[0].split("=")[1] as string;

  client.defaults.headers.common[config.headers.accessTokenHeaderName] = accessToken;

  return {
    accessToken,
    refreshToken,
  };
};

export const logout = async (client: AxiosInstance) => {
  //const res = await client.post(`/v1/auth/logout`);

  client.defaults.headers.common[config.headers.accessTokenHeaderName] = "";
};
