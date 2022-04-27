import * as Yup from "yup";
import { Validators } from "shared";

export const update: Validators = {
  body: (obj) =>
    Yup.object({
      name: Yup.string().min(3).required(),
      email: Yup.string().email().required(),
      phoneNumber: Yup.string().required(),
    }).validate(obj),
};
