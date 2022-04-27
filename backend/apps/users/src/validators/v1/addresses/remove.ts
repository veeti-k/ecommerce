import * as Yup from "yup";
import { Validators, addressId } from "shared";

export const remove: Validators = {
  params: Yup.object({
    addressId,
  }).noUnknown(true),
};
