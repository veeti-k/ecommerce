import { z } from "zod";
import { createCategory } from "./createCategory";

export const updateCategory = createCategory;

export type IUpdateCategoryBody = z.infer<typeof updateCategory>;
