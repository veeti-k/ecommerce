import { db } from "../../../database";
import { RegisterRequestBodyValidator } from "../../../validators/v1";
import { Endpoint, SpecificErrorMessages, respondError, respondSuccessWithHeaders } from "shared";
import { createRefreshTokenCookie } from "../../../util/cookie";
import { hashPassword } from "../../../util/hash";
import { createAccessToken, createRefreshToken } from "../../../util/jwt";

export const register: Endpoint = async (req, res) => {
  const validationResult = RegisterRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: SpecificErrorMessages.INVALID_REQUEST_BODY,
    });

  const validBody = validationResult.validated;

  const existingByEmail = await db.user.get.byEmail(validBody.email);
  if (existingByEmail)
    return respondError({
      res,
      statusCode: 400,
      message: "Email taken",
    });

  const hashedPassword = await hashPassword(validBody.password);

  const result = await db.user.createUserAndSession(validBody, hashedPassword);

  const accessToken = createAccessToken(result.newUserId, result.newSessionId, result.newFlags);
  const refreshToken = createRefreshToken(result.newUserId, result.newSessionId, result.newFlags);

  respondSuccessWithHeaders({
    res,
    statusCode: 201,
    json: { userId: result.newUserId },
    headers: {
      accessToken: accessToken,
      refreshTokenCookie: createRefreshTokenCookie(refreshToken),
    },
    sentInfo: "register success + new user id",
  });
};
