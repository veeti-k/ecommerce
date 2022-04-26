import express from "express";
import { auth, Flags, validation } from "shared";
import { v1 } from "../../endpoints";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get("/products/questions/approved", v1.questions.getAllApproved);
router.get("/products/questions/not-approved", v1.questions.getAllNotApproved);

router.get(
  "/products/:productId/questions",
  validation(v1Validators.questions.getByProductId),
  v1.questions.getByProduct
);

router.post(
  "/products/:productId/questions",
  auth(Flags.None),
  validation(v1Validators.questions.create),
  v1.questions.create
);

router.patch(
  "/products/:productId/questions/:questionId",
  auth(Flags.ManageQuestions),
  validation(v1Validators.questions.approve),
  v1.questions.approve
);

router.delete(
  "/products/:productId/questions/:questionId",
  auth(Flags.ManageQuestions),
  validation(v1Validators.questions.decline),
  v1.questions.decline
);

router.post("/products/:productId/questions/:questionId/answers");
router.patch("/products/:productId/questions/:questionId/answers/:answerId");
router.delete("/products/:productId/questions/:questionId/answers/:answerId");

export { router as questions };
