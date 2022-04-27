import Joi from "joi";
import { Validators, questionId, productId } from "shared";

export const approve: Validators = {
  params: (obj) =>
    Joi.object({
      productId,
      questionId,
    }).validate(obj),
};
