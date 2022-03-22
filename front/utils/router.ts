import { NextRouter } from "next/router";
import { logger } from "./logger";

export const pushUser = (router: NextRouter, path: string, from: string) => {
  logger.log(`Pushing user to ${path} called by ${from}`);
  router.push(path);
};
