import express from "express";
import { v1 } from "../../endpoints";
import { auth, Flags } from "shared";

const router = express.Router();

router.get("/", v1.categories.getAll);
router.get("/:categoryId", v1.categories.getOne);

router.use(auth(Flags.ManageCategories));

router.post("/", v1.categories.create);
router.patch("/:categoryId", v1.categories.update);
router.delete("/:categoryId", v1.categories.remove);

export { router as categories };
