import { IConfig } from "./types";

export const config: IConfig = {
  ports: {
    catalogue: Number(process.env.CATALOGUE_PORT || 3000),
    users: Number(process.env.USERS_PORT || 3000),
    auth: Number(process.env.AUTH_PORT || 3000),
    ugc: Number(process.env.UGC_PORT || 3000),
    search: Number(process.env.SEARCH_PORT || 3000),
  },

  dbUrls: {
    catalogue: process.env.CATALOGUE_DB_URL || "",
    users: process.env.USERS_DB_URL || "",
    ugc: process.env.UGC_DB_URL || "",
  },

  jwt: {
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET || "JWT_ACCESS_TOKEN_SECRET",
      issuer: process.env.JWT_ACCESS_TOKEN_ISSUER || "JWT_ACCESS_TOKEN_ISSUER",
      audience: process.env.JWT_ACCESS_TOKEN_AUDIENCE || "JWT_ACCESS_TOKEN_AUDIENCE",
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET || "JWT_REFRESH_TOKEN_SECRET",
      issuer: process.env.JWT_REFRESH_TOKEN_ISSUER || "JWT_REFRESH_TOKEN_ISSUER",
      audience: process.env.JWT_REFRESH_TOKEN_AUDIENCE || "JWT_REFRESH_TOKEN_AUDIENCE",
    },
  },

  headers: {
    accessTokenHeaderName: process.env.HEADER_ACCESS_TOKEN_NAME || "access-token",
    refreshTokenCookieName: process.env.HEADER_REFRESH_TOKEN_NAME || "refresh-token",
    refreshTokenCookiePath: process.env.HEADER_REFRESH_TOKEN_PATH || "/api/v1/auth/tokens",
  },

  services: {
    authVerify: process.env.AUTH_VERIFY_URL || "",
  },

  frontendRevalidation: {
    secret: process.env.FRONTEND_REVALIDATION_SECRET || "",
    baseUrl: process.env.FRONTEND_REVALIDATION_BASE_URL || "",
  },

  zinc: {
    baseUrl: process.env.ZINC_BASE_URL || "",
    username: process.env.ZINC_USERNAME || "",
    password: process.env.ZINC_PASSWORD || "",
  },
};