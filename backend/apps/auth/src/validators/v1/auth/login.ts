import * as Yup from "yup";
import { Validators } from "shared";

export const login: Validators = {
  body: (obj: any) =>
    Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }).validate(obj),
};
