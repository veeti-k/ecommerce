import Joi from "joi";
import { Validators } from "shared";

export const approve: Validators = {
  params: (obj) =>
    Joi.object({
      questionId: Joi.string().uuid().required(),
    }).validate(obj),
};
