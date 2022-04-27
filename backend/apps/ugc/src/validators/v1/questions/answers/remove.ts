import Joi from "joi";
import { productId, questionId, answerId, Validators } from "shared";

export const remove: Validators = {
  params: (obj) =>
    Joi.object({
      productId,
      questionId,
      answerId,
    }).validate(obj),
};
