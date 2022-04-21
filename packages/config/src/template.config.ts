import { IConfig } from "./types";

export const config: IConfig = {
  port: 3000,

  databaseUrl: "",

  jwt: {
    accessToken: {
      secret: "",
      issuer: "",
      audience: "",
    },
    refreshToken: {
      secret: "",
      issuer: "",
      audience: "",
    },
  },

  frontendRevalidation: {
    secret: "",
    baseUrl: "",
  },

  zinc: {
    baseUrl: "",
    username: "",
    password: "",
  },
};
