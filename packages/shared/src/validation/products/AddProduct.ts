import { z } from "zod";

export const addProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  price: z.number(),
  categoryId: z.number(),
  bullets: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .max(5, { message: "Must be at most 5 items" }),
  images: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .max(5, { message: "Must be at most 5 items" }),
});

export const addProductInputSchema = addProductFormSchema;

export type AddProductFormSchema = z.infer<typeof addProductFormSchema>;

export const addProductFormDefaultValues: AddProductFormSchema = {
  name: "",
  description: "",
  shortDescription: "",
  price: NaN,
  categoryId: NaN,
  bullets: [],
  images: [],
};
