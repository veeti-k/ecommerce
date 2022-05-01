export interface IConfig {
  ports: {
    catalogue: number;
    users: number;
    auth: number;
    ugc: number;
    search: number;
  };

  dbUrls: {
    catalogue: string;
    users: string;
    ugc: string;
  };

  jwt: {
    accessToken: {
      secret: string;
      issuer: string;
      audience: string;
    };
    refreshToken: {
      secret: string;
      issuer: string;
      audience: string;
    };
  };

  headers: {
    accessTokenHeaderName: string;
    refreshTokenCookieName: string;
    refreshTokenCookiePath: string;
  };

  services: {
    authVerify: string;
  };

  frontendRevalidation: {
    secret: string;
    baseUrl: string;
  };

  zinc: {
    baseUrl: string;
    username: string;
    password: string;
  };
}
