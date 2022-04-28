import express from "express";
import { v1Endpoints } from "../../endpoints";

const router = express.Router();

router.get("/search/products", v1Endpoints.products.search);

export { router as v1Router };
