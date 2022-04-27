import express from "express";
import { v1 } from "../../endpoints";
import { auth, Flags, validation } from "shared";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get("/:productId", validation(v1Validators.products.getOne), v1.products.getOne);

router.use(auth({ neededFlags: [Flags.ManageProducts] }));

router.post("/", validation(v1Validators.products.create), v1.products.create);
router.patch("/:productId", validation(v1Validators.products.update), v1.products.update);

export { router as products };
