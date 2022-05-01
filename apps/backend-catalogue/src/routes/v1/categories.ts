import express from "express";
import { v1Endpoints } from "../../endpoints";
import { auth, Flags, validation } from "shared";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get("/", v1Endpoints.categories.getAll);
router.get(
  "/:categoryId",
  validation(v1Validators.categories.getOne),
  v1Endpoints.categories.getOne
);

router.use(auth({ neededFlags: [Flags.ManageCategories] }));

router.post("/", validation(v1Validators.categories.create), v1Endpoints.categories.create);
router.patch(
  "/:categoryId",
  validation(v1Validators.categories.update),
  v1Endpoints.categories.update
);
router.delete(
  "/:categoryId",
  validation(v1Validators.categories.remove),
  v1Endpoints.categories.remove
);

export { router as categories };
