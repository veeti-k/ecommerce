import Joi from "joi";

export const UpdateMeRequestBodyValidator = (obj: any) =>
  Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
  }).validate(obj);
