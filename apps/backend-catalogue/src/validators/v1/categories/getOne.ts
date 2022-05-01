import * as Yup from "yup";
import { Validators, categoryId } from "shared";

export const getOne: Validators = {
  params: Yup.object({
    categoryId,
  }).noUnknown(true),
};
