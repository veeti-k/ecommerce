import Joi from "joi";
import { Validators } from "shared";

export const decline: Validators = {
  params: (obj) =>
    Joi.object({
      questionId: Joi.string().uuid().required(),
    }).validate(obj),
};
