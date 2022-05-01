import express from "express";
import { auth, Flags, validation } from "shared";
import { v1Endpoints } from "../../endpoints";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get("/products/questions/approved", v1Endpoints.questions.getAllApproved);
router.get("/products/questions/not-approved", v1Endpoints.questions.getAllNotApproved);

router.get(
  "/products/:productId/questions",
  validation(v1Validators.questions.getByProductId),
  v1Endpoints.questions.getByProduct
);

router.post(
  "/products/:productId/questions",
  validation(v1Validators.questions.create),
  v1Endpoints.questions.create
);

router.patch(
  "/products/:productId/questions/:questionId",
  auth({
    neededFlags: [Flags.ManageQuestions],
  }),
  validation(v1Validators.questions.approve),
  v1Endpoints.questions.approve
);

router.delete(
  "/products/:productId/questions/:questionId",
  auth({ neededFlags: [Flags.ManageQuestions] }),
  validation(v1Validators.questions.remove),
  v1Endpoints.questions.remove
);

router.post(
  "/products/:productId/questions/:questionId/answers",
  auth({
    neededFlags: [Flags.None],
    allowUnauthorized: true,
  }),
  validation(v1Validators.questions.answers.create),
  v1Endpoints.questions.answers.create
);
router.patch(
  "/products/:productId/questions/:questionId/answers/:answerId",
  auth({
    neededFlags: [Flags.ManageQuestions],
  }),
  validation(v1Validators.questions.answers.approve),
  v1Endpoints.questions.answers.approve
);
router.delete(
  "/products/:productId/questions/:questionId/answers/:answerId",
  auth({
    neededFlags: [Flags.ManageQuestions],
  }),
  validation(v1Validators.questions.answers.remove)
);

export { router as questions };
