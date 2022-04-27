import express from "express";
import { v1 } from "../../endpoints";
import { auth, Flags, validation } from "shared";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get("/", v1.categories.getAll);
router.get("/:categoryId", validation(v1Validators.categories.getOne), v1.categories.getOne);

router.use(auth({ neededFlags: [Flags.ManageCategories] }));

router.post("/", validation(v1Validators.categories.create), v1.categories.create);
router.patch("/:categoryId", validation(v1Validators.categories.update), v1.categories.update);
router.delete("/:categoryId", validation(v1Validators.categories.remove), v1.categories.remove);

export { router as categories };
