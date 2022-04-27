import Joi from "joi";
import { Validators, productId, questionId } from "shared";

export const remove: Validators = {
  params: (obj) =>
    Joi.object({
      productId,
      questionId,
    }).validate(obj),
};
