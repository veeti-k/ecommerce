import { Middleware } from "../types/ApiThings";
import { Validators } from "../types/Validator";
import { respondError } from "../utils/respondWith";
import { capitalize } from "../utils/string";

export const validation =
  (validators: Validators): Middleware =>
  async (req, res, next) => {
    if (validators.params) {
      try {
        await validators.params.validate(req.params);
      } catch (err) {
        return respondError({
          res,
          statusCode: 400,
          message: capitalize(err.message),
        });
      }
    }

    if (validators.body) {
      try {
        await validators.body.validate(req.body);
        req.body = validators.body.cast(req.body);
      } catch (err) {
        return respondError({
          res,
          statusCode: 400,
          message: capitalize(err.message),
        });
      }
    }

    next();
  };
