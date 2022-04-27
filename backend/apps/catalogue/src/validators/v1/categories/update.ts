import * as Yup from "yup";
import { categoryId, Validators } from "shared";

export const update: Validators = {
  params: (obj) =>
    Yup.object({
      categoryId,
    }).validate(obj),

  body: (obj) =>
    Yup.object({
      name: Yup.string().required(),
      parentId: Yup.number().optional(),
    }).validate(obj),
};
