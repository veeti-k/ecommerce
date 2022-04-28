import express from "express";

import { products } from "./products/search";

const router = express.Router();

router.get("/products", products);

export { router as v1Router };
