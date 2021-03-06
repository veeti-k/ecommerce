import { z } from "zod";

import { addCategoryFormSchema } from "./AddCategory";

export const editCategoryFormSchema = addCategoryFormSchema;

export const editCategoryInputSchema = editCategoryFormSchema.and(
  z.object({
    categoryId: z.string(),
  })
);

export type EditCategoryFormSchema = z.infer<typeof editCategoryFormSchema>;
