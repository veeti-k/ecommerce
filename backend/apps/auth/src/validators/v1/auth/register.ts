import Joi from "joi";

export const RegisterRequestBodyValidator = (obj: any) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(obj);
