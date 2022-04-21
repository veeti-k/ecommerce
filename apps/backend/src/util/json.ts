import express from "express";
import { RequestHandler } from "../types";
import { respondWithError } from "./respondWith";

export const json: RequestHandler = (req, res, next) => {
  express.json()(req, res, (err: any) => {
    if (err) respondWithError({ res, statusCode: 400, message: "Invalid JSON" });
    else next();
  });
};
