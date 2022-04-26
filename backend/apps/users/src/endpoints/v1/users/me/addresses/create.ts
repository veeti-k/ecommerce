import {
  AuthVerifyUserResponse,
  Endpoint,
  REQ_USER,
  respondError,
  respondSuccess,
  SpecificErrorMessages,
} from "shared";
import { db } from "../../../../../database";
import { createAddressRequestBodyValidator } from "../../../../../validators/v1/addresses/create";

export const create: Endpoint = async (req, res) => {
  const validationResult = createAddressRequestBodyValidator(req.body);
  if (validationResult.error)
    return respondError({
      res,
      statusCode: 400,
      message: SpecificErrorMessages.INVALID_REQUEST_BODY,
      errors: validationResult.error?.details,
    });

  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;
  const validatedBody = validationResult.value;

  const createdAddress = await db.address.create(currentUser.userId, validatedBody);

  respondSuccess({
    res,
    statusCode: 201,
    json: { addressId: createdAddress.addressId },
  });
};
