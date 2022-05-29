import { z } from "zod";
import { createProduct } from "./createProduct";

export const updateProduct = createProduct;

export type IUpdateProductBody = z.infer<typeof updateProduct>;
