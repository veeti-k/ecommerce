import { z } from "zod";

export const createCategory = z.object({
  name: z.string(),
  parentId: z.string(),
});

export type ICreateCategoryBody = z.infer<typeof createCategory>;
