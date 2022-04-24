import express from "express";
import { categories } from "./categories";
import { products } from "./products";

const router = express.Router();

router.use("/categories", categories);
router.use("/products", products);

export { router as v1Router };
