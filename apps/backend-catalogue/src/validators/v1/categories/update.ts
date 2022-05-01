import * as Yup from "yup";
import { categoryId, Validators } from "shared";

export const update: Validators = {
  params: Yup.object({
    categoryId,
  }).noUnknown(true),

  body: Yup.object({
    name: Yup.string().required(),
    parentId: Yup.number().optional(),
  }).noUnknown(true),
};
