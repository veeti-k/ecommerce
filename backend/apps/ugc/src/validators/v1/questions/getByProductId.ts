import Joi from "joi";
import { productId, Validators } from "shared";

export const getByProductId: Validators = {
  params: (obj: any) =>
    Joi.object({
      productId,
    }).validate(obj),
};
