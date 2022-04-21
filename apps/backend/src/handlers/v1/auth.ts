import { RequestHandler } from "../../types";
import { respondError, respondSuccessWithHeaders } from "../../util/respondWith";
import { ErrorMessages } from "shared";
import { createAccessToken, createRefreshToken } from "../../util/jwt";
import { createRefreshTokenCookie } from "../../util/cookie";
import { createUser, getUser } from "../../database/user";
import { createSession } from "../../database/session";
import { RegisterRequestBodyValidator, LoginRequestBodyValidator } from "../../validators/v1";
import { comparePassword } from "../../util/hash";

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

export const login: RequestHandler = async (req, res) => {
  const validationResult = LoginRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: ErrorMessages.INVALID_REQUEST_BODY,
    });

  const { email, password } = validationResult.validated;

  const existingUser = await getUser.byEmail(email);
  if (!existingUser)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid email",
    });

  const validPass = await comparePassword(password, existingUser.password);
  if (!validPass)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid password",
    });

  const createdSession = await createSession(existingUser.userId);

  respondSuccessWithHeaders({
    res,
    statusCode: 200,
    sentInfo: "login successful",
    headers: {
      accessToken: createAccessToken(
        existingUser.userId,
        createdSession.sessionId,
        existingUser.flags
      ),
      refreshTokenCookie: createRefreshTokenCookie(
        createRefreshToken(existingUser.userId, createdSession.sessionId, existingUser.flags)
      ),
    },
  });
};
