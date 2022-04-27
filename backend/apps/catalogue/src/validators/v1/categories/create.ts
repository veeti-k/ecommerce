import * as Yup from "yup";
import { Validators } from "shared";

export const create: Validators = {
  body: (obj) =>
    Yup.object({
      name: Yup.string().required(),
      parentId: Yup.number().optional(),
    }).validate(obj),
};
