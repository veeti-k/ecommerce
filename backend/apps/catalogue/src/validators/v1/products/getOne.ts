import * as Yup from "yup";
import { Validators, productId } from "shared";

export const getOne: Validators = {
  params: (obj) =>
    Yup.object({
      productId,
    }).validate(obj),
};
