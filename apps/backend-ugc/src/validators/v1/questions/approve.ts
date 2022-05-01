import * as Yup from "yup";
import { Validators, questionId, productId } from "shared";

export const approve: Validators = {
  params: Yup.object({
    productId,
    questionId,
  }).noUnknown(true),
};
