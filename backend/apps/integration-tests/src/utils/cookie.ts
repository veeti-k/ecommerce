import { config } from "config";

export const testRefreshTokenCookie = (cookie: string) => {
  expect(cookie).toContain(config.headers.refreshTokenCookieName);
  expect(cookie).toContain("HttpOnly;");
  expect(cookie).toContain("Secure;");
  expect(cookie).toContain("SameSite=Strict;");
  expect(cookie).toContain(`Path=${config.headers.refreshTokenCookiePath};`);
};
