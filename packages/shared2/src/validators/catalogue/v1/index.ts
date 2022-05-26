import { z } from "zod";

export const productIdSchema = z.number();

export const categoryIdSchema = z.number();
export const categoryParentIdSchema = z.number().nullable();

export const reviewIdSchema = z.string();
export const commentIdSchema = z.string();
export const questionIdSchema = z.string();
export const answerIdSchema = z.string();

export const addressIdSchema = z.string();
export const nameSchema = z.string().min(3, { message: "Must be at least 3 characters long" });
export const emailSchema = z.string().email();
export const phoneNumberSchema = z.string().optional().nullable();

export const addressPhoneNumberSchema = z.string();
export const streetAddressSchema = z.string();
export const citySchema = z.string();
export const stateSchema = z.string();
export const zipSchema = z.string();

export const passwordSchema = z.string().min(4, { message: "Must be at least 4 characters long" });
