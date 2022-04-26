import Joi from "joi";
import { PARAM_NUMBER_MAX_SAFE, Validators } from "shared";

export const getByProductId: Validators = {
  params: (obj: any) =>
    Joi.object({
      productId: Joi.number().max(PARAM_NUMBER_MAX_SAFE).required(),
    }).validate(obj),
};
