import { RegisterRequestBody } from "../../../types/auth";
import { Validator, ValidationErrors } from "../../validator";

export const RegisterRequestBodyValidator: Validator<RegisterRequestBody> = (obj) => {
  const errors = {} as ValidationErrors<RegisterRequestBody>;

  if (!obj.name) {
    errors.name = {
      message: "Name is required",
    };
  } else if (typeof obj.name !== "string") {
    errors.name = {
      message: "Name must be a string",
    };
  }

  if (!obj.email) {
    errors.email = {
      message: "Email is required",
    };
  } else if (typeof obj.email !== "string") {
    errors.email = {
      message: "Email must be a string",
    };
  }

  if (!obj.password) {
    errors.password = {
      message: "Password is required",
    };
  } else if (typeof obj.password !== "string") {
    errors.password = {
      message: "Password must be a string",
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
