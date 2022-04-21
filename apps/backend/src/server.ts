import express from "express";
import { mainRouter } from "./routes";
import { json } from "./util/json";

export const createServer = () => {
  const app = express();

  app.use(json);
  app.use(mainRouter);

  return app;
};
