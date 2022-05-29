import { z } from "zod";

export const createQuestionAnswer = z.object({
  nickname: z.string(),
  content: z.string(),
});

export type ICreateQuestionAnswerBody = z.infer<typeof createQuestionAnswer>;
