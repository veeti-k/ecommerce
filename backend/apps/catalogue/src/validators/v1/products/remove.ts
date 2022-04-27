import * as Yup from "yup";
import { Validators } from "shared";

export const remove: Validators = {
  params: Yup.object({
    productId: Yup.number().required(),
  }),
};
