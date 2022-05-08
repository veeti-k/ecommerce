import * as Yup from "yup";
import { Validators } from "shared";
import { validation } from "shared2";

export const update: Validators = {
  params: Yup.object({
    categoryId: validation.categoryId,
  }).noUnknown(true),

  body: Yup.object({
    name: validation.nameSchema,
    parentId: validation.parentIdSchema,
  }).noUnknown(true),
};
