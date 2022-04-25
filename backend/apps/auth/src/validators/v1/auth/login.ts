import { LoginRequestBody, Validator, ValidationErrors } from "shared";

export const LoginRequestBodyValidator: Validator<LoginRequestBody> = (obj) => {
  const errors = {} as ValidationErrors<LoginRequestBody>;

  if (!obj.email) {
    errors.email = {
      message: "'email' is required",
    };
  } else if (typeof obj.email !== "string") {
    errors.email = {
      message: "'email' must be a string",
    };
  }

  if (!obj.password) {
    errors.password = {
      message: "'password' is required",
    };
  } else if (typeof obj.password !== "string") {
    errors.password = {
      message: "'password' must be a string",
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
