import { Middleware } from "../types/ApiThings";
import { SpecificErrorMessages } from "../types/Errors";
import { Validators } from "../types/Validator";
import { respondError } from "../utils/respondWith";

export const validation =
  (validators: Validators): Middleware =>
  (req, res, next) => {
    if (validators.params) {
      const { error: parameterError } = validators.params(req.params);
      if (parameterError)
        return respondError({
          res,
          statusCode: 400,
          message: SpecificErrorMessages.INVALID_PARAMETERS,
          errors: parameterError.details,
        });
    }

    if (validators.body) {
      const { error: bodyError } = validators.body(req.body);
      if (bodyError)
        return respondError({
          res,
          statusCode: 400,
          message: SpecificErrorMessages.INVALID_REQUEST_BODY,
          errors: bodyError.details,
        });
    }

    next();
  };
