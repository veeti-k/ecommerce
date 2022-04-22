import { db } from "../../../database";
import { Endpoint } from "../../../types/Endpoint";
import { SpecificErrorMessages } from "../../../types/Errors";
import { createRefreshTokenCookie } from "../../../util/cookie";
import { comparePassword } from "../../../util/hash";
import { createAccessToken, createRefreshToken } from "../../../util/jwt";
import { respondError, respondSuccessWithHeaders } from "../../../util/respondWith";
import { LoginRequestBodyValidator } from "../../../validators/v1";

export const login: Endpoint = async (req, res) => {
  const validationResult = LoginRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: SpecificErrorMessages.INVALID_REQUEST_BODY,
    });

  const { email, password } = validationResult.validated;

  const existingUser = await db.user.get.byEmail(email);
  if (!existingUser)
    return respondError({
      res,
      statusCode: 400,
      message: "User not found",
    });

  const validPass = await comparePassword(password, existingUser.password);
  if (!validPass)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid password",
    });

  const createdSession = await db.session.create(existingUser.userId);

  const accessToken = createAccessToken(
    existingUser.userId,
    createdSession.sessionId,
    existingUser.flags
  );
  const refreshToken = createRefreshToken(
    existingUser.userId,
    createdSession.sessionId,
    existingUser.flags
  );

  respondSuccessWithHeaders({
    res,
    statusCode: 200,
    sentInfo: "login success",
    headers: {
      accessToken: accessToken,
      refreshTokenCookie: createRefreshTokenCookie(refreshToken),
    },
  });
};
