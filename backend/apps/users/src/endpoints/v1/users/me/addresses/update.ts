import {
  AuthVerifyUserResponse,
  Endpoint,
  REQ_USER,
  respondError,
  respondSuccessNoContent,
  SpecificErrorMessages,
} from "shared";
import { db } from "../../../../../database";
import { updateAddressRequestBodyValidator } from "../../../../../validators/v1/addresses/update";

export const update: Endpoint = async (req, res) => {
  const validationResult = updateAddressRequestBodyValidator(req.body);
  if (validationResult.error)
    respondError({
      res,
      statusCode: 400,
      message: SpecificErrorMessages.INVALID_REQUEST_BODY,
      errors: validationResult.error?.details,
    });

  const validatedBody = validationResult.value;
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;
  const addressIdToUpdate = req.params.addressId;

  const existingAddress = await db.address.get.oneById(currentUser.userId, addressIdToUpdate);
  if (!existingAddress)
    respondError({
      res,
      statusCode: 400,
      message: "Address not found",
    });

  await db.address.update(addressIdToUpdate, validatedBody);

  respondSuccessNoContent(res);
};
