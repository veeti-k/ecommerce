import jwt from "jsonwebtoken";
import { config } from "config";

interface TokenPayload {
  userId: number;
  sessionId: string;
  flags: bigint;
}

type DecodeResult =
  | {
      payload: TokenPayload;
      isValid: true;
    }
  | {
      payload?: never;
      isValid: false;
    };

export const createAccessToken = (userId: number, sessionId: string, flags: bigint) =>
  jwt.sign(
    {
      userId,
      sessionId,
      flags: Number(flags),
    },
    config.jwt.accessToken.secret,
    {
      audience: config.jwt.accessToken.audience,
      issuer: config.jwt.accessToken.issuer,
      expiresIn: "15m",
      algorithm: "HS512",
    }
  );

export const createRefreshToken = (userId: number, sessionId: string, flags: bigint) =>
  jwt.sign(
    {
      userId,
      sessionId,
      flags: Number(flags),
    },
    config.jwt.refreshToken.secret,
    {
      audience: config.jwt.refreshToken.audience,
      issuer: config.jwt.refreshToken.issuer,
      expiresIn: "7d",
      algorithm: "HS512",
    }
  );

export const decodeAccessToken = (token: string): DecodeResult => {
  try {
    const payload = jwt.verify(token, config.jwt.accessToken.secret, {
      audience: config.jwt.accessToken.audience,
      issuer: config.jwt.accessToken.issuer,
      algorithms: ["HS512"],
    }) as TokenPayload;

    return {
      isValid: true,
      payload,
    };
  } catch {
    return {
      isValid: false,
    };
  }
};

export const decodeRefreshToken = (token: string): DecodeResult => {
  try {
    const payload = jwt.verify(token, config.jwt.refreshToken.secret, {
      audience: config.jwt.refreshToken.audience,
      issuer: config.jwt.refreshToken.issuer,
      algorithms: ["HS512"],
    }) as TokenPayload;

    return {
      isValid: true,
      payload: payload,
    };
  } catch {
    return {
      isValid: false,
    };
  }
};
