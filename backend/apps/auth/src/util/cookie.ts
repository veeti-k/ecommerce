import { config } from "config";

// prettier-ignore
export const createRefreshTokenCookie = (value: string, expired: boolean = false) =>
  `${config.headers.refreshTokenCookieName}=${value}; Path=${config.headers.refreshTokenCookiePath}; HttpOnly; SameSite=Strict; Secure; Max-Age=${expired ? 0 : 604800}`;
