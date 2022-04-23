import express from "express";
import { v1 } from "../../endpoints";
import { authentication } from "../../middleware/authentication";
import { authorization } from "../../middleware/authorization";
import { Flags } from "../../types/Flags";

const router = express.Router();

router.get("/", v1.category.getAll);
router.use(authentication, authorization(Flags.ManageCategories));
router.post("/", v1.category.add);
router.delete("/", v1.category.remove);

export { router as categories };