import { Response } from "express";
import { Middleware } from "../types/ApiThings";
import { decodeAccessToken } from "../util/jwt";
import { respondError } from "../util/respondWith";
import { db } from "../database";
import { REQ_USER } from "../util/consts";
import { ReqSetUser } from "../types/User";

const errorInvalidAuthHeader = (res: Response) =>
  respondError({
    res,
    statusCode: 401,
    message: "Invalid authorization header",
  });

const errorInvalidAccessToken = (res: Response) =>
  respondError({
    res,
    statusCode: 401,
    message: "Invalid access token",
  });

const getToken = (res: Response, authHeader: string | undefined) => {
  if (!authHeader)
    return respondError({
      res,
      statusCode: 401,
      message: "No authorization header provided",
    });

  if (!authHeader.startsWith("Bearer ")) return errorInvalidAuthHeader(res);

  const split = authHeader.split(" ");

  if (split.length !== 2) return errorInvalidAuthHeader(res);

  const token = split[1];

  if (!token) return errorInvalidAuthHeader(res);

  return token;
};

export const authentication: Middleware = async (req, res, next) => {
  const token = getToken(res, req.headers.authorization);
  if (!token) return;

  const result = decodeAccessToken(token);

  if (!result.isValid) return errorInvalidAccessToken(res);

  const tokenPayload = result.payload;

  const user = await db.user.get.byUserIdWith.sessions(tokenPayload.userId);

  if (!user) return errorInvalidAccessToken(res);

  if (user.flags !== BigInt(tokenPayload.flags)) return errorInvalidAccessToken(res);

  if (!user.sessions.find((s) => s.sessionId === tokenPayload.sessionId))
    return errorInvalidAccessToken(res);

  req.app.set(REQ_USER, {
    userId: user.userId,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    flags: user.flags,
    createdAt: user.createdAt,
  } as ReqSetUser);

  next();
};
