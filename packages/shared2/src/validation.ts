import * as Yup from "yup";
import { PARAM_NUMBER_MAX_SAFE } from "./consts";

const number = Yup.number().max(PARAM_NUMBER_MAX_SAFE).required();
const uuid = Yup.string().uuid().required();

export const productId = number;

export const categoryId = number;

export const reviewId = uuid;
export const commentId = uuid;

export const questionId = uuid;
export const answerId = uuid;

export const addressId = uuid;

export const nameSchema = Yup.string().min(3, "Too short!").required("Required");

export const emailSchema = Yup.string().email("Invalid email").required("Required");

export const passwordSchema = Yup.string().min(4, "Too short!").required("Required");
export const passwordAgainSchema = Yup.string()
  .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
  .required("Required");

export const phoneNumberSchema = Yup.string().optional().nullable();

export const streetAddressSchema = Yup.string().required("Required");
export const citySchema = Yup.string().required("Required");
export const stateSchema = Yup.string().required("Required");
export const zipSchema = Yup.string().required("Required");
