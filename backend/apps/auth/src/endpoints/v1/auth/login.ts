import { db } from "../../../database";
import { LoginRequestBodyValidator } from "../../../validators/v1";
import { Endpoint, respondError, respondSuccessWithHeaders, SpecificErrorMessages } from "shared";
import { createRefreshTokenCookie } from "../../../util/cookie";
import { comparePassword } from "../../../util/hash";
import { createAccessToken, createRefreshToken } from "../../../util/jwt";

export const login: Endpoint = async (req, res) => {
  const validationResult = LoginRequestBodyValidator(req.body);
  if (validationResult.value)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.error?.details,
      message: SpecificErrorMessages.INVALID_REQUEST_BODY,
    });

  const { email, password } = validationResult.value;

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
