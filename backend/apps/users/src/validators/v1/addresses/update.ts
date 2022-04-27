import * as Yup from "yup";
import { Validators, addressId } from "shared";

export const update: Validators = {
  params: Yup.object({
    addressId,
  }).noUnknown(true),

  body: Yup.object({
    name: Yup.string().required(),
    phoneNumber: Yup.string().required(),
    email: Yup.string().email().required(),
    streetAddress: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.string().required(),
  }).noUnknown(true),
};
