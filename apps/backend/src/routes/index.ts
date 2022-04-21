import express from "express";
import { v1Router } from "./v1";
const router = express.Router();

const globalPrefix = "/api";

router.use(`${globalPrefix}/v1`, v1Router);

export { router as mainRouter };
