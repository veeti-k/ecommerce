import express from "express";
import { v1Endpoints } from "../../endpoints";
import { auth, Flags, validation } from "shared";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get("/:productId", validation(v1Validators.products.getOne), v1Endpoints.products.getOne);

router.use(auth({ neededFlags: [Flags.ManageProducts] }));

router.post("/", validation(v1Validators.products.create), v1Endpoints.products.create);
router.patch("/:productId", validation(v1Validators.products.update), v1Endpoints.products.update);
router.delete("/:productId", validation(v1Validators.products.remove), v1Endpoints.products.remove);

export { router as products };
