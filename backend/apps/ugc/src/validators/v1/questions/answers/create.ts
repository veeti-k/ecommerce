import * as Yup from "yup";
import { productId, questionId, Validators } from "shared";

export const create: Validators = {
  params: (obj) =>
    Yup.object({
      productId,
      questionId,
    }).validate(obj),
};
