import { config } from "config";
import { REQ_USER } from "../consts";
import { Middleware } from "../types/ApiThings";
import axios from "axios";
import { Response } from "express";
import { respondError } from "./respondWith";

export const auth =
  (...neededFlags: bigint[]): Middleware =>
  async (req, res, next) => {
    const token = getToken(res, req.headers.authorization);

    const result = await axios.post(config.services.authVerify, {
      token,
      neededFlags: neededFlags.map((flag) => Number(flag)),
    });

    if (!result.data.valid) return errorInvalidAccessToken(res);
    if (!result.data.hasAccess) return errorNoAccess(res);

    req.app.set(REQ_USER, result.data.user);

    next();
  };

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

const errorNoAccess = (res: Response) =>
  respondError({
    res,
    statusCode: 403,
    message: "Missing permissions",
  });
