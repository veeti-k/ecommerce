import Joi from "joi";
import { Validators } from "shared";

export const login: Validators = {
  body: (obj) =>
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate(obj),
};
