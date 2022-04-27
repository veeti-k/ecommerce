import { Middleware } from "../types/ApiThings";
import { Validators } from "../types/Validator";
import { respondError } from "../utils/respondWith";
import { capitalize } from "../utils/string";

export const validation =
  (validators: Validators): Middleware =>
  async (req, res, next) => {
    if (validators.params) {
      try {
        await validators.params(req.params);
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
        await validators.body(req.body);
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
