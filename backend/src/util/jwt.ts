import jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../types/User";

interface TokenPayload {
  userId: number;
  sessionId: string;
  flags: bigint;
}

type DecodeResult =
  | {
      payload: TokenPayload;
      valid: true;
    }
  | {
      payload?: never;
      valid: false;
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

export const decodeAccessToken = (token: string, user: User): DecodeResult => {
  try {
    const payload = jwt.verify(token, config.jwt.accessToken.secret, {
      audience: config.jwt.accessToken.audience,
      issuer: config.jwt.accessToken.issuer,
      algorithms: ["HS512"],
    }) as TokenPayload;

    return {
      valid: true,
      payload,
    };
  } catch {
    return {
      valid: false,
    };
  }
};

export const decodeRefreshToken = (token: string, user: User) => {
  try {
    const payload = jwt.verify(token, config.jwt.refreshToken.secret, {
      audience: config.jwt.refreshToken.audience,
      issuer: config.jwt.refreshToken.issuer,
      algorithms: ["HS512"],
    }) as TokenPayload;

    return {
      valid: true,
      payload,
    };
  } catch {
    return {
      valid: false,
    };
  }
};
