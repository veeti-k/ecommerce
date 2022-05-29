import express from "express";
import { auth, validation } from "shared";
import { Flags, validationSchemas } from "shared2";
import { questions } from "../endpoints";

const router = express.Router();

router.get("/products/questions/approved", questions.getAllApproved);
router.get("/products/questions/not-approved", questions.getAllNotApproved);

router.get("/products/:productId/questions", questions.getByProduct);

router.post(
  "/products/:productId/questions",
  validation(validationSchemas.createQuestion),
  questions.create
);

router.patch(
  "/products/:productId/questions/:questionId",
  auth({
    neededFlags: [Flags.ManageQuestions],
  }),
  questions.approve
);

router.delete(
  "/products/:productId/questions/:questionId",
  auth({ neededFlags: [Flags.ManageQuestions] }),
  questions.remove
);

router.post(
  "/products/:productId/questions/:questionId/answers",
  auth({
    neededFlags: [Flags.None],
    allowUnauthorized: true,
  }),
  questions.answers.create
);

router.patch(
  "/products/:productId/questions/:questionId/answers/:answerId",
  auth({
    neededFlags: [Flags.ManageQuestions],
  }),
  questions.answers.approve
);

router.delete(
  "/products/:productId/questions/:questionId/answers/:answerId",
  auth({
    neededFlags: [Flags.ManageQuestions],
  })
);

export { router as questions };
