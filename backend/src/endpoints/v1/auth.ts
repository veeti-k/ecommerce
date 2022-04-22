import { respondError, respondSuccessWithHeaders } from "../../util/respondWith";
import { createAccessToken, createRefreshToken } from "../../util/jwt";
import { createRefreshTokenCookie } from "../../util/cookie";
import { RegisterRequestBodyValidator, LoginRequestBodyValidator } from "../../validators/v1";
import { comparePassword, hashPassword } from "../../util/hash";
import { db } from "../../database";
import { Endpoint } from "../../types/Endpoint";
import { ErrorMessages } from "../../types/Errors";

export const register: Endpoint = async (req, res) => {
  const validationResult = RegisterRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: ErrorMessages.INVALID_REQUEST_BODY,
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

  respondSuccessWithHeaders({
    res,
    statusCode: 201,
    json: { userId: result.newUserId },
    headers: {
      accessToken: createAccessToken(result.newUserId, result.newSessionId, result.newFlags),
      refreshTokenCookie: createRefreshTokenCookie(
        createRefreshToken(result.newUserId, result.newSessionId, result.newFlags)
      ),
    },
    sentInfo: "register success + new user id",
  });
};

export const login: Endpoint = async (req, res) => {
  const validationResult = LoginRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      errors: validationResult.errors,
      message: ErrorMessages.INVALID_REQUEST_BODY,
    });

  const { email, password } = validationResult.validated;

  const existingUser = await db.user.get.byEmail(email);
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

  const createdSession = await db.session.create(existingUser.userId);

  respondSuccessWithHeaders({
    res,
    statusCode: 200,
    sentInfo: "login success",
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
