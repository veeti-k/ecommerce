import { CreateCategoryRequestBody } from "shared";
import { ValidationErrors, Validator } from "../../validator";

export const createCategoryRequestBodyValidator: Validator<CreateCategoryRequestBody> = (obj) => {
  const errors = {} as ValidationErrors<CreateCategoryRequestBody>;

  if (!obj.name) {
    errors.name = {
      message: "'name' is required",
    };
  } else if (typeof obj.name !== "string") {
    errors.name = {
      message: "'name' must be a string",
    };
  }

  if (!Object.keys(obj).includes("parentId")) {
    errors.parentId = {
      message: "'parentId' is required",
    };
  } else if (typeof obj.parentId !== "number" && obj.parentId !== null) {
    errors.parentId = {
      message: "'parentId' must be a number or null",
    };
  }

  if (Object.keys(errors).length > 0)
    return {
      isValid: false,
      errors,
    };

  return {
    isValid: true,
    validated: obj as CreateCategoryRequestBody,
  };
};