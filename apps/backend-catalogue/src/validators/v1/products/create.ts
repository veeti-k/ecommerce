import * as Yup from "yup";
import { Validators } from "shared";
import { z } from "zod";

export const create = {
  body: z
    .object({
      name: z.string(),
      description: z.string(),
      shortDescription: z.string(),
      price: z.number(),
      discountedPrice: z.number(),
      discountPercent: z.number(),
      discountAmount: z.number(),
      isDiscounted: z.boolean(),
      deepestCategoryId: z.number(),
      bulletPoints: z.array(z.string()),
      imageLinks: z.array(z.string()),
    })
    .required(),
};

export type CreateProductBody = z.infer<typeof create.body>;
