import Joi from "joi";
import { Validators } from "shared";

export const create: Validators = {
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
