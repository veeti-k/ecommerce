import express from "express";
import { config } from "config";
import { auth } from "./auth";
const router = express.Router();

const globalPrefix = config.globalApiPrefix;

router.use(`${globalPrefix}/auth`, auth);

export { router as mainRouter };
