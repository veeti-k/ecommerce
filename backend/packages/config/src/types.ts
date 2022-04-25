export interface IConfig {
  ports: {
    catalogue: number;
    users: number;
    auth: number;
  };

  dbUrls: {
    catalogue: string;
    users: string;
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
    auth: string;
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
