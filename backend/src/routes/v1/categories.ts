import express from "express";
import { v1 } from "../../endpoints";
import { authentication } from "../../middleware/authentication";
import { authorization } from "../../middleware/authorization";
import { Flags } from "../../types/Flags";

const router = express.Router();

router.use(authentication, authorization(Flags.ManageCategories));
router.post("/", v1.categories.add);

export { router as categories };
