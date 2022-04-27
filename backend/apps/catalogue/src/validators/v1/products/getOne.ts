import * as Yup from "yup";
import { Validators, productId } from "shared";

export const getOne: Validators = {
  params: Yup.object({
    productId,
  }).noUnknown(true),
};
