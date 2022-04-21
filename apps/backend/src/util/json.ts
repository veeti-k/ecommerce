import express from "express";
import { RequestHandler } from "../types";
import { respondError } from "./respondWith";

export const json: RequestHandler = (req, res, next) => {
  express.json()(req, res, (err: any) => {
    if (err) respondError({ res, statusCode: 400, message: "Invalid JSON" });
    else next();
  });
};
