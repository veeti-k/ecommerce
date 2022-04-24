import { RegisterRequestBody, Validator, ValidationErrors } from "shared";

export const RegisterRequestBodyValidator: Validator<RegisterRequestBody> = (obj) => {
  const errors = {} as ValidationErrors<RegisterRequestBody>;

  if (!obj.name) {
    errors.name = {
      message: "'name' is required",
    };
  } else if (typeof obj.name !== "string") {
    errors.name = {
      message: "'name' must be a string",
    };
  }

  if (!obj.email) {
    errors.email = {
      message: "'email' is required",
    };
  } else if (typeof obj.email !== "string") {
    errors.email = {
      message: "email' must be a string",
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
    validated: obj as RegisterRequestBody,
  };
};
