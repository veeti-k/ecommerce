import Joi from "joi";
import { Validators } from "shared";

export const register: Validators = {
  body: (obj: any) =>
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate(obj),
};
