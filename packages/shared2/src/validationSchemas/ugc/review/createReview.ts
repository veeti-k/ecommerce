import { z } from "zod";

export const createReview = z.object({
  nickname: z.string(),
  title: z.string(),
  content: z.string(),
});

export type ICreateReviewBody = z.infer<typeof createReview>;
