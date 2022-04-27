import * as Yup from "yup";
import { Validators, addressId } from "shared";

export const update: Validators = {
  params: (obj) =>
    Yup.object({
      addressId,
    }).validate(obj),

  body: (obj) =>
    Yup.object({
      name: Yup.string().required(),
      phoneNumber: Yup.string().required(),
      email: Yup.string().email().required(),
      streetAddress: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip: Yup.string().required(),
    }).validate(obj),
};
