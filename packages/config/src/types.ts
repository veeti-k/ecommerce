export interface IConfig {
  port: number;

  databaseUrl: string;

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

export interface IConstants {
  accessTokenHeaderName: string;
  refreshTokenCookieName: string;
  refreshTokenCookiePath: string;
  bcryptSaltRounds: number;
}
