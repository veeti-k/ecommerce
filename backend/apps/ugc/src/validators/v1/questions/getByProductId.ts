import * as Yup from "yup";
import { productId, Validators } from "shared";

export const getByProductId: Validators = {
  params: (obj: any) =>
    Yup.object({
      productId,
    }).validate(obj),
};
