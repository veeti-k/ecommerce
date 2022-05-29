import express from "express";
import { categories } from "../endpoints";
import { auth, validation } from "shared";
import { Flags, validationSchemas } from "shared2";

const router = express.Router();

router.get("/", categories.getAll);
router.get("/:categoryId", categories.getOne);

router.use(auth({ neededFlags: [Flags.ManageCategories] }));

router.post("/", validation(validationSchemas.createCategory), categories.create);
router.patch("/:categoryId", validation(validationSchemas.updateCategory), categories.update);
router.delete("/:categoryId", categories.remove);

export { router as categories };
