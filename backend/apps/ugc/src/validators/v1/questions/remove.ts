import * as Yup from "yup";
import { Validators, productId, questionId } from "shared";

export const remove: Validators = {
  params: (obj) =>
    Yup.object({
      productId,
      questionId,
    }).validate(obj),
};
