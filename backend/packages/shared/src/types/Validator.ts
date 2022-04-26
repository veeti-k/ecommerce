import Joi from "joi";
import { AtLeastOne } from "./Util";

export interface Validator {
  (obj: any): Joi.ValidationResult<any>;
}

export type Validators = AtLeastOne<{
  params: Validator;
  body: Validator;
}>;
