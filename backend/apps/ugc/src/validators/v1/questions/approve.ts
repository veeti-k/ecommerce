import * as Yup from "yup";
import { Validators, questionId, productId } from "shared";

export const approve: Validators = {
  params: (obj) =>
    Yup.object({
      productId,
      questionId,
    }).validate(obj),
};
