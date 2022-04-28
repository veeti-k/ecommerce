import { Validators } from "shared";
import * as Yup from "yup";

export const products: Validators = {
  query: Yup.object({
    query: Yup.string().optional(),
    categoryId: Yup.number().min(1).optional(),
  }).noUnknown(true),
};
