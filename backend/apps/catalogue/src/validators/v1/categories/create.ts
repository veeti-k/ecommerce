import * as Yup from "yup";
import { Validators } from "shared";

export const create: Validators = {
  body: Yup.object({
    name: Yup.string().required(),
    parentId: Yup.number().optional(),
  }).noUnknown(true),
};
