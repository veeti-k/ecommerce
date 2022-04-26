import Joi from "joi";

export const LoginRequestBodyValidator = (obj: any) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(obj);
