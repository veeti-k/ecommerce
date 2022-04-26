import express from "express";
import { validation } from "shared";
import { v1 } from "../../endpoints";
import { v1Validators } from "../../validators";

const router = express.Router();

router.get("/products/questions/approved", v1.questions.getAllApproved);
router.get("/products/questions/not-approved", v1.questions.getAllNotApproved);

router.get(
  "/products/:productId/questions",
  validation({
    parameterValidator: v1Validators.questions.getByProductId.params,
  }),
  v1.questions.getByProduct
);
router.post("/products/:productId/questions");
router.patch("/products/:productId/questions/:questionId");
router.delete("/products/:productId/questions/:questionId");

router.post("/products/:productId/questions/:questionId/answers");
router.patch("/products/:productId/questions/:questionId/answers/:answerId");
router.delete("/products/:productId/questions/:questionId/answers/:answerId");

export { router as questions };
