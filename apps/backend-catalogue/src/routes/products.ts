import express from "express";
import { auth, validation } from "shared";
import { Flags, validationSchemas } from "shared2";
import { products } from "../endpoints";

const router = express.Router();

router.get("/:productId", products.getOne);

router.use(auth({ neededFlags: [Flags.ManageProducts] }));

router.post("/", validation(validationSchemas.createProduct), products.create);
router.patch("/:productId", validation(validationSchemas.updateProduct), products.update);
router.delete("/:productId", products.remove);

export { router as products };
