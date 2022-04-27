import * as Yup from "yup";
import { Validators } from "shared";

export const login: Validators = {
  body: Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  }).noUnknown(true),
};
