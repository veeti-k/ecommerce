import Joi from "joi";

export const createCategoryRequestBodyValidator = (obj: any) =>
  Joi.object({
    name: Joi.string().required(),
    parentId: Joi.number().optional(),
  }).validate(obj);
