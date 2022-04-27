import Joi from "joi";
import { Validators, categoryId } from "shared";

export const getOne: Validators = {
  params: (obj) =>
    Joi.object({
      categoryId,
    }).validate(obj),
};
