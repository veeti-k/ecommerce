import Joi from "joi";
import { Validators, addressId } from "shared";

export const remove: Validators = {
  params: (obj) =>
    Joi.object({
      addressId,
    }).validate(obj),
};
