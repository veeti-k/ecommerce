import * as Yup from "yup";
import { Validators, categoryId } from "shared";

export const getOne: Validators = {
  params: (obj) =>
    Yup.object({
      categoryId,
    }).validate(obj),
};
