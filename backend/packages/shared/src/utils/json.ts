import express from "express";
import { Middleware } from "../types/ApiThings";
import { respondError } from "./respondWith";

export const json: Middleware = (req, res, next) => {
  express.json()(req, res, (err: any) => {
    if (err) respondError({ res, statusCode: 400, message: "Invalid JSON" });
    else next();
  });
};
