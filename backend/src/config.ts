export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || "",

  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "12"),

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
    refreshTokenCookiePath: process.env.HEADER_REFRESH_TOKEN_PATH || "",
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
