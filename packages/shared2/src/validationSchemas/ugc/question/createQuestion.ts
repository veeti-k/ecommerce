import { z } from "zod";

export const createQuestion = z.object({
  nickname: z.string(),
  title: z.string(),
  content: z.string(),
});

export type ICreateQuestionBody = z.infer<typeof createQuestion>;
