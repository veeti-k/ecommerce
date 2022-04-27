import * as Yup from "yup";
import { productId, questionId, Validators } from "shared";

export const create: Validators = {
  params: Yup.object({
    productId,
    questionId,
  }).noUnknown(true),
};
