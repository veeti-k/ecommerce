import { Middleware } from "../types/ApiThings";
import { SpecificErrorMessages } from "../types/Errors";
import { AtLeastOne } from "../types/Util";
import { Validator } from "../types/Validator";
import { respondError } from "../utils/respondWith";

type Props = AtLeastOne<{
  parameterValidator: Validator;
  bodyValidator: Validator;
}>;

export const validation =
  ({ parameterValidator, bodyValidator }: Props): Middleware =>
  (req, res, next) => {
    if (parameterValidator) {
      const { error: parameterError } = parameterValidator(req.params);
      if (parameterError)
        return respondError({
          res,
          statusCode: 400,
          message: SpecificErrorMessages.INVALID_PARAMETERS,
          errors: parameterError.details,
        });
    }

    if (bodyValidator) {
      const { error: bodyError } = bodyValidator(req.body);
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
