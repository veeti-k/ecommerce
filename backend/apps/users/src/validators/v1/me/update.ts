import Joi from "joi";

export const UpdateMeRequestBodyValidator = (obj: any) =>
  Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
  }).validate(obj);
