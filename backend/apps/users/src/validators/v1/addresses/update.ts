import Joi from "joi";
import { Validators, addressId } from "shared";

export const update: Validators = {
  params: (obj) =>
    Joi.object({
      addressId,
    }).validate(obj),

  body: (obj) =>
    Joi.object({
      name: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      email: Joi.string().email().required(),
      streetAddress: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
    }).validate(obj),
};
