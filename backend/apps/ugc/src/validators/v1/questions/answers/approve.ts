import * as Yup from "yup";
import { productId, questionId, answerId, Validators } from "shared";

export const approve: Validators = {
  params: Yup.object({
    productId,
    questionId,
    answerId,
  }).noUnknown(true),
};
