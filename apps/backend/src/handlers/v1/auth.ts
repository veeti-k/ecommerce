import { RequestHandler } from "../../types";
import { respondWithError, respondWithSuccess } from "../../util/respondWith";
import { RegisterRequestBodyValidator } from "../../validators/v1/auth";
import { ErrorMessages } from "shared";

export const register: RequestHandler = async (req, res) => {
  const validationResult = RegisterRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondWithError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: ErrorMessages.INVALID_REQUEST_BODY,
    });

  respondWithSuccess({
    res,
    statusCode: 201,
    json: {
      message: "test",
    },
  });
};
