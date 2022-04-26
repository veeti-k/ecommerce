import {
  AuthVerifyUserResponse,
  Endpoint,
  REQ_USER,
  respondError,
  respondSuccessNoContent,
} from "shared";
import { db } from "../../../../database";
import { UpdateMeRequestBodyValidator } from "../../../../validators/v1/me/update";

export const update: Endpoint = async (req, res) => {
  const validationResult = UpdateMeRequestBodyValidator(req.body);
  if (validationResult.error)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid request body",
      errors: validationResult.error?.details,
    });

  const validatedBody = validationResult.value;

  const { userId } = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  await db.user.update(userId, validatedBody);

  respondSuccessNoContent(res);
};
