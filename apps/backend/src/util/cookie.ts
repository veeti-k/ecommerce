import { constants } from "config";

// prettier-ignore
export const createRefreshTokenCookie = (value: string, expired: boolean = false) =>
  `${constants.refreshTokenCookieName}=${value}; Path=${constants.refreshTokenCookiePath}; HttpOnly; SameSite=Strict; Secure; Max-Age=${expired ? 0 : 604800}`;
