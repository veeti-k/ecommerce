import * as Yup from "yup";
import { Validators } from "shared";

export const remove: Validators = {
  body: Yup.object({
    sessionIds: Yup.array().of(Yup.string().uuid()).required(),
  }).noUnknown(true),
};
