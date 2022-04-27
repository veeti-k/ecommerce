import Joi from "joi";
import { productId, questionId, Validators } from "shared";

export const create: Validators = {
  params: (obj) =>
    Joi.object({
      productId,
      questionId,
    }).validate(obj),
};
