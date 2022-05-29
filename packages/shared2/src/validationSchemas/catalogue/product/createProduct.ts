import { z } from "zod";

export const createProduct = z
  .object({
    name: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    price: z.number(),
    categoryId: z.string(),
    bulletPoints: z.array(z.string()).max(5, { message: "Must be at most 5 items" }),
    imageLinks: z.array(z.string()).max(5, { message: "Must be at most 5 items" }),
  })
  .strict();

export type ICreateProductBody = z.infer<typeof createProduct>;
