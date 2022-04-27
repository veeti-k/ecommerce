import Joi from "joi";
import { Validators, productId } from "shared";

export const create: Validators = {
  params: (obj) =>
    Joi.object({
      productId,
    }).validate(obj),

  body: (obj) =>
    Joi.object({
      questionersNickname: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    }).validate(obj),
};
