import { Middleware } from "../types/ApiThings";
import { respondError } from "../utils/respondWith";
import { z } from "zod";
import { SpecificErrorMessages } from "../types/Errors";

export const validation =
  (bodyValidator?: z.ZodObject<any, any, any, any, any>): Middleware =>
  async (req, res, next) => {
    if (bodyValidator) {
      const validationResult = await bodyValidator.safeParseAsync(req.body);

      if (!validationResult.success)
        return respondError({
          res,
          statusCode: 400,
          message: SpecificErrorMessages.INVALID_REQUEST_BODY,
          errors: validationResult.error,
        });
    }

    next();
  };
