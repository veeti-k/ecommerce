import Joi from "joi";

export interface Validator {
  (obj: any): Joi.ValidationResult<any>;
}
