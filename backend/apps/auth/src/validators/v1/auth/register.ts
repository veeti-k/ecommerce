import * as Yup from "yup";
import { Validators } from "shared";

export const register: Validators = {
  body: Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  }).noUnknown(true),
};
