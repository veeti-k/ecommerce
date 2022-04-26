import Joi from "joi";
import { Validators, PARAM_NUMBER_MAX_SAFE } from "shared";

export const create: Validators = {
  params: (obj) =>
    Joi.object({
      productId: Joi.number().max(PARAM_NUMBER_MAX_SAFE).required(),
    }).validate(obj),

  body: (obj) =>
    Joi.object({
      questionersNickname: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
    }).validate(obj),
};
