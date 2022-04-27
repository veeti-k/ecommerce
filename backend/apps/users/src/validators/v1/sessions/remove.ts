import Joi from "joi";
import { Validators } from "shared";

export const remove: Validators = {
  body: (obj) =>
    Joi.object({
      sessionIds: Joi.array().items(Joi.string().uuid()).required(),
    }).validate(obj),
};
