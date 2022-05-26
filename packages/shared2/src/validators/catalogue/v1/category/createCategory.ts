import { z } from "zod";
import { categoryParentIdSchema } from "..";

export const createCategory = z.object({
  name: z.string(),
  parentId: categoryParentIdSchema,
});

export type ICreateCategoryBody = z.infer<typeof createCategory>;
