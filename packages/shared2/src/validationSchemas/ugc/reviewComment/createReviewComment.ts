import { z } from "zod";

export const createReviewComment = z.object({
  nickname: z.string(),
  title: z.string(),
  content: z.string(),
});

export type ICreateReviewCommentBody = z.infer<typeof createReviewComment>;
