import { ValidationErrors, Validator } from "../validator";
import { RegisterRequestBody, ValidationErrorCodes } from "shared";

export const RegisterRequestBodyValidator: Validator<RegisterRequestBody> = (obj) => {
  const errors = {} as ValidationErrors<RegisterRequestBody>;

  if (!obj.name) {
    errors.name = {
      code: ValidationErrorCodes.INVALID_REGISTER,
      message: "name is required",
    };
  } else if (typeof obj.name !== "string") {
    errors.name = {
      code: ValidationErrorCodes.INVALID_REGISTER,
      message: "name must be a string",
    };
  }

  if (!obj.email) {
    errors.email = {
      code: ValidationErrorCodes.INVALID_REGISTER,
      message: "email is required",
    };
  } else if (typeof obj.email !== "string") {
    errors.email = {
      code: ValidationErrorCodes.INVALID_REGISTER,
      message: "email must be a string",
    };
  }

  if (!obj.password) {
    errors.password = {
      code: ValidationErrorCodes.INVALID_REGISTER,
      message: "password is required",
    };
  } else if (typeof obj.password !== "string") {
    errors.password = {
      code: ValidationErrorCodes.INVALID_REGISTER,
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
    validated: obj as RegisterRequestBody,
  };
};
