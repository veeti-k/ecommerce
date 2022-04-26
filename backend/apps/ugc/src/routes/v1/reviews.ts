import express from "express";

const router = express.Router();

router.get("/products/reviews/approved");
router.get("/products/reviews/not-approved");

router.get("/products/:productId/reviews");
router.post("/products/:productId/reviews");
router.patch("/products/:productId/reviews/:reviewId");
router.delete("/products/:productId/reviews/:reviewId");

router.post("/products/:productId/reviews/:reviewId/comments");
router.patch("/products/:productId/reviews/:reviewId/comments/:commentId");
router.delete("/products/:productId/reviews/:reviewId/comments/:commentId");

export { router as reviews };
