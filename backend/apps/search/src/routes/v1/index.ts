import express from "express";
import { validation } from "shared";
import { v1Endpoints } from "../../endpoints";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get(
  "/search/products",
  validation(v1Validators.search.products),
  v1Endpoints.products.search
);

export { router as v1Router };
