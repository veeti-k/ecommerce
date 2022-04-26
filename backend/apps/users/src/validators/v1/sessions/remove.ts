import Joi from "joi";

export const removeSessionsRequestBodyValidator = (obj: any) =>
  Joi.object({
    sessionIds: Joi.array().items(Joi.string().uuid()).required(),
  }).validate(obj);
