import { config } from "config";
import express from "express";
import { users } from "./users";
const router = express.Router();

router.use(`${config.globalApiPrefix}/v1`, users);

export { router as mainRouter };
