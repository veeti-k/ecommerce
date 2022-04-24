import express from "express";
import { v1 } from "../../endpoints";
import { auth, Flags } from "shared";

const router = express.Router();

router.get("/:productId", v1.products.getOne);

router.use(auth(Flags.ManageProducts));

router.post("/", v1.products.create);
router.patch("/:productId", v1.products.update);

export { router as products };
