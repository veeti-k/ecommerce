import express from "express";
import { auth } from "./auth";

const router = express.Router();

router.use("/auth", auth);

export { router as v1Router };
