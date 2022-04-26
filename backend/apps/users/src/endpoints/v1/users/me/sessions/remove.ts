import {
  AuthVerifyUserResponse,
  Endpoint,
  REQ_USER,
  respondError,
  respondSuccessNoContent,
} from "shared";
import { db } from "../../../../../database";
import { removeSessionsRequestBodyValidator } from "../../../../../validators/v1/sessions/remove";

export const remove: Endpoint = async (req, res) => {
  const validationResult = removeSessionsRequestBodyValidator(req.body);
  if (validationResult.error)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid request body",
      errors: validationResult.error?.details,
    });

  const validatedBody = validationResult.value;

  const user = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  await db.session.removeMany(user.userId, validatedBody?.sessionIds);

  respondSuccessNoContent(res);
};
