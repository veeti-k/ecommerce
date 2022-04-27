import Joi from "joi";
import { Validators } from "shared";

export const update: Validators = {
  body: (obj) =>
    Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().required(),
    }).validate(obj),
};
