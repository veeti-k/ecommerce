import { Response } from "express";

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

interface RespondWithSuccess {
  (options: RespondWithSuccessOptions): void;
}

interface RespondWithError {
  (options: RespondWithErrorOptions): void;
}

export const respondWithSuccess: RespondWithSuccess = ({ res, statusCode, json, sentInfo }) => {
  if (!json) res.status(statusCode).send();
  else res.status(statusCode).json(json);

  if (!sentInfo) res.locals.sentInfo = "json";
  else res.locals.sentInfo = sentInfo;
};

export const respondWithError: RespondWithError = ({ res, statusCode, message, errors }) => {
  const responseBody: RespondWithError__Body = { code: statusCode, message };

  if (errors) responseBody.errors = errors;

  res.status(statusCode).json(responseBody);
  res.locals.sentInfo = { code: statusCode, message };
};
