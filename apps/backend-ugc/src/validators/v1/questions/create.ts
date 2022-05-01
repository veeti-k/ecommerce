import * as Yup from "yup";
import { Validators, productId } from "shared";

export const create: Validators = {
  params: Yup.object({
    productId,
  }).noUnknown(true),

  body: Yup.object({
    questionersNickname: Yup.string().required(),
    title: Yup.string().required(),
    content: Yup.string().required(),
  }).noUnknown(true),
};
