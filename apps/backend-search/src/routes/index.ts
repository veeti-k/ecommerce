import express from "express";
import { config } from "config";
import { search } from "../endpoints/search/products";

const router = express.Router();

router.get(`${config.globalApiPrefix}/search/products`, search);

export { router as mainRouter };
