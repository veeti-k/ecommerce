import Joi from "joi";
import { categoryId, Validators } from "shared";

export const update: Validators = {
  params: (obj) =>
    Joi.object({
      categoryId,
    }).validate(obj),

  body: (obj) =>
    Joi.object({
      name: Joi.string().required(),
      parentId: Joi.number().optional(),
    }).validate(obj),
};
