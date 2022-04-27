import Joi from "joi";
import { Validators } from "shared";

export const create: Validators = {
  body: (obj) =>
    Joi.object({
      name: Joi.string().required(),
      parentId: Joi.number().optional(),
    }).validate(obj),
};
