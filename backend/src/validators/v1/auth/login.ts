import { LoginRequestBody } from "../../../types/auth";
import { ValidationErrorCodes } from "../../../types/Errors";
import { Validator, ValidationErrors } from "../../validator";

export const LoginRequestBodyValidator: Validator<LoginRequestBody> = (obj) => {
  const errors = {} as ValidationErrors<LoginRequestBody>;

  if (!obj.email) {
    errors.email = {
      code: ValidationErrorCodes.INVALID_LOGIN,
      message: "email is required",
    };
  } else if (typeof obj.email !== "string") {
    errors.email = {
      code: ValidationErrorCodes.INVALID_LOGIN,
      message: "email must be a string",
    };
  }

  if (!obj.password) {
    errors.password = {
      code: ValidationErrorCodes.INVALID_LOGIN,
      message: "password is required",
    };
  } else if (typeof obj.password !== "string") {
    errors.password = {
      code: ValidationErrorCodes.INVALID_LOGIN,
      message: "password must be a string",
    };
  }

  if (Object.keys(errors).length > 0)
    return {
      isValid: false,
      errors,
    };

  return {
    isValid: true,
    validated: obj as LoginRequestBody,
  };
};
