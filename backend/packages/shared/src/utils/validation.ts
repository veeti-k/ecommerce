import Joi from "joi";
import { PARAM_NUMBER_MAX_SAFE } from "../consts";

const number = Joi.number().max(PARAM_NUMBER_MAX_SAFE).required();
const uuid = Joi.string().uuid().required();

export const productId = number;

export const categoryId = number;

export const reviewId = uuid;
export const commentId = uuid;

export const questionId = uuid;
export const answerId = uuid;

export const addressId = uuid;
