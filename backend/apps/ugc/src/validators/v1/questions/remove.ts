import * as Yup from "yup";
import { Validators, productId, questionId } from "shared";

export const remove: Validators = {
  params: Yup.object({
    productId,
    questionId,
  }).noUnknown(true),
};
