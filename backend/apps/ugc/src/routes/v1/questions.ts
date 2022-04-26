import express from "express";

const router = express.Router();

router.get("/products/questions/approved");
router.get("/products/questions/not-approved");

router.get("/products/:productId/questions");
router.post("/products/:productId/questions");
router.patch("/products/:productId/questions/:questionId");
router.delete("/products/:productId/questions/:questionId");

router.post("/products/:productId/questions/:questionId/answers");
router.patch("/products/:productId/questions/:questionId/answers/:answerId");
router.delete("/products/:productId/questions/:questionId/answers/:answerId");

export { router as questions };
