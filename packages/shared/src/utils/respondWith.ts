import { Response } from "express";
import { config } from "config";

interface RespondWithOptions {
  res: Response;
  statusCode: number;
}

interface RespondWithSuccessOptions extends RespondWithOptions {
  json?: any;
  sentInfo?: string;
}

interface RespondWithErrorOptions extends RespondWithOptions {
  message: string;
  errors?: any;
}

interface RespondWithError__Body {
  code: number;
  message: string;
  errors?: any;
}

interface RespondWithHeadersOptions extends RespondWithOptions {
  headers: {
    accessToken?: string;
    refreshTokenCookie?: string;
  };
  json?: any;
  sentInfo?: string;
}

interface RespondWithSuccess {
  (options: RespondWithSuccessOptions): void;
}

export const respondSuccess: RespondWithSuccess = ({ res, statusCode, json, sentInfo }) => {
  if (!json) res.status(statusCode).send();
  else res.status(statusCode).json(json);

  if (!sentInfo) res.locals.sentInfo = "json";
  else res.locals.sentInfo = sentInfo;
};

interface RespondSuccessWithHeaders {
  (options: RespondWithHeadersOptions): void;
}

export const respondSuccessWithHeaders: RespondSuccessWithHeaders = ({
  res,
  statusCode,
  json,
  sentInfo,
  headers,
}) => {
  if (headers.refreshTokenCookie) res.setHeader("Set-Cookie", headers.refreshTokenCookie);
  if (headers.accessToken) res.setHeader(config.headers.accessTokenHeaderName, headers.accessToken);

  res.status(statusCode)[json ? "json" : "send"](json || null);

  res.locals.sentInfo = sentInfo || "json";
};

export const respondSuccessNoContent = (res: Response) => {
  res.status(204).send();
  res.locals.sentInfo = "noContent";
};

interface RespondWithError {
  (options: RespondWithErrorOptions): void;
}

export const respondError: RespondWithError = ({ res, statusCode, message, errors }) => {
  const responseBody: RespondWithError__Body = { code: statusCode, message };

  if (errors) responseBody.errors = errors;

  res.status(statusCode).json(responseBody);
  res.locals.sentInfo = { code: statusCode, message };
};
