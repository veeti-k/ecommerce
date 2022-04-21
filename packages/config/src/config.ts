import { IConfig } from "./types";

export const config: IConfig = {
  port: 4000,

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
