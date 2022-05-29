import express from "express";
import { config } from "config";
import { questions } from "./questions";
import { reviews } from "./reviews";

const router = express.Router();

router.use(`${config.globalApiPrefix}`, reviews);
router.use(`${config.globalApiPrefix}`, questions);

export { router as mainRouter };
