import * as Yup from "yup";
import { productId, questionId, answerId, Validators } from "shared";

export const remove: Validators = {
  params: (obj) =>
    Yup.object({
      productId,
      questionId,
      answerId,
    }).validate(obj),
};
