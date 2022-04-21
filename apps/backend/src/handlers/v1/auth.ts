import { RequestHandler } from "../../types";
import { respondError, respondSuccessWithHeaders } from "../../util/respondWith";
import { RegisterRequestBodyValidator } from "../../validators/v1/auth";
import { ErrorMessages } from "shared";
import { createAccessToken, createRefreshToken } from "../../util/jwt";
import { createRefreshTokenCookie } from "../../util/cookie";
import { createUser } from "../../database/user";
import { createSession } from "../../database/session";

export const register: RequestHandler = async (req, res) => {
  const validationResult = RegisterRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: ErrorMessages.INVALID_REQUEST_BODY,
    });

  const user = validationResult.validated;

  const createdUser = await createUser(user);

  const createdSession = await createSession(createdUser.userId);

  respondSuccessWithHeaders({
    res,
    statusCode: 201,
    json: { userId: createdUser.userId },
    headers: {
      accessToken: createAccessToken(
        createdUser.userId,
        createdSession.sessionId,
        createdUser.flags
      ),
      refreshTokenCookie: createRefreshTokenCookie(
        createRefreshToken(createdUser.userId, createdSession.sessionId, createdUser.flags)
      ),
    },
    sentInfo: "new user id",
  });
};
