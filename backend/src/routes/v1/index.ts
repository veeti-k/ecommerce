import express from "express";
import { auth } from "./auth";
import { categories } from "./category";

const router = express.Router();

router.use("/auth", auth);
router.use("/categories", categories);

export { router as v1Router };
