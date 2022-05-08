import * as Yup from "yup";
import { Validators } from "shared";
import { validation } from "shared2";

export const update: Validators = {
  body: Yup.object({
    name: validation.nameSchema,
    email: validation.emailSchema,
    phoneNumber: validation.phoneNumberSchema,
  }).noUnknown(true),
};
