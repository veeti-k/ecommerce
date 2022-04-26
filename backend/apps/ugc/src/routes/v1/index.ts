import express from "express";
import { questions } from "./questions";
import { reviews } from "./reviews";

const router = express.Router();

router.use(reviews);
router.use(questions);

export { router as v1Router };
