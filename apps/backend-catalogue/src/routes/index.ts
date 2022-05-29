import express from "express";
import { config } from "config";
import { categories } from "./categories";
import { products } from "./products";

const router = express.Router();

const globalPrefix = config.globalApiPrefix;

router.use(`${globalPrefix}/categories`, categories);
router.use(`${globalPrefix}/products`, products);

export { router as mainRouter };
