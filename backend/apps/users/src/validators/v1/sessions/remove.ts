import * as Yup from "yup";
import { Validators } from "shared";

export const remove: Validators = {
  body: (obj) =>
    Yup.object({
      sessionIds: Yup.array().of(Yup.string().uuid()).required(),
    }).validate(obj),
};
