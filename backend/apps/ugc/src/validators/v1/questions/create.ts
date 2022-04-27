import * as Yup from "yup";
import { Validators, productId } from "shared";

export const create: Validators = {
  params: (obj) =>
    Yup.object({
      productId,
    }).validate(obj),

  body: (obj) =>
    Yup.object({
      questionersNickname: Yup.string().required(),
      title: Yup.string().required(),
      content: Yup.string().required(),
    }).validate(obj),
};
