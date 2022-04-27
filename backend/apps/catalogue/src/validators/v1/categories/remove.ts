import * as Yup from "yup";
import { Validators, categoryId } from "shared";

export const remove: Validators = {
  params: (obj) =>
    Yup.object({
      categoryId,
    }).validate(obj),
};
