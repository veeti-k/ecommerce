export type ValidationErrors<T> = {
  [key in keyof T]: {};
};

type ValidationResult<T> =
  | {
      isValid: false;
      errors: ValidationErrors<T>;
      validated?: never;
    }
  | {
      isValid: true;
      errors?: never;
      validated: T;
    };

export interface Validator<T> {
  (objectToValidate: any): ValidationResult<T>;
}
