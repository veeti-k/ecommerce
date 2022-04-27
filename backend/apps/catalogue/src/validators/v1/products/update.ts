import Joi from "joi";
import { productId, Validators } from "shared";

export const update: Validators = {
  params: (obj) =>
    Joi.object({
      productId,
    }).validate(obj),

  body: (obj) =>
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      shortDescription: Joi.string().required(),
      price: Joi.number().required(),
      discountedPrice: Joi.number().required(),
      discountPercent: Joi.number().required(),
      discountAmount: Joi.number().required(),
      isDiscounted: Joi.boolean().required(),
      deepestCategoryId: Joi.number().required(),
      bulletPoints: Joi.array().items(Joi.string().required()).required(),
      imageLinks: Joi.array().items(Joi.string().required()).required(),
    }).validate(obj),
};
