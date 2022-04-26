import Joi from "joi";

export const getByProductId = {
  params: (obj: any) =>
    Joi.object({
      productId: Joi.number().max(Number.MAX_SAFE_INTEGER - 2),
    }).validate(obj),
};
