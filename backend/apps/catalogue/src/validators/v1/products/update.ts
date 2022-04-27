import * as Yup from "yup";
import { productId, Validators } from "shared";

export const update: Validators = {
  params: Yup.object({
    productId,
  }),

  body: Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
    shortDescription: Yup.string().required(),
    price: Yup.number().required(),
    discountedPrice: Yup.number().required(),
    discountPercent: Yup.number().required(),
    discountAmount: Yup.number().required(),
    isDiscounted: Yup.boolean().required(),
    deepestCategoryId: Yup.number().required(),
    bulletPoints: Yup.array().of(Yup.string().required()).required(),
    imageLinks: Yup.array().of(Yup.string().required()).required(),
  }).noUnknown(true),
};
