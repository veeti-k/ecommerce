import express from "express";
import { v1 } from "../../endpoints";

const router = express.Router();

router.post("/", v1.categories.add);

export { router as categories };
