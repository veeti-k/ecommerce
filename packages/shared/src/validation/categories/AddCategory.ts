import { z } from "zod";

export const addCategoryFormSchema = z.object({
  name: z.string(),
  parentId: z.number().optional(),
});

export const addCategoryInputSchema = addCategoryFormSchema;

export type AddCategoryFormSchema = z.infer<typeof addCategoryFormSchema>;
