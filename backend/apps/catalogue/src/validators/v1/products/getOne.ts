import Joi from "joi";
import { Validators, productId } from "shared";

export const getOne: Validators = {
  params: (obj) =>
    Joi.object({
      productId,
    }).validate(obj),
};
