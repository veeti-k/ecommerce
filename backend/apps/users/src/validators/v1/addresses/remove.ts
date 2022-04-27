import * as Yup from "yup";
import { Validators, addressId } from "shared";

export const remove: Validators = {
  params: (obj) =>
    Yup.object({
      addressId,
    }).validate(obj),
};
