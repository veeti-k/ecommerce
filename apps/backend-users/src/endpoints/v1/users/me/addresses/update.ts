import { Endpoint, REQ_USER, respondError, respondSuccessNoContent } from "shared";
import { AuthVerifyUserResponse } from "shared2";
import { db } from "../../../../../database";

export const update: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;
  const addressIdToUpdate = req.params.addressId;

  const existingAddress = await db.address.get.oneById(currentUser.userId, addressIdToUpdate);
  if (!existingAddress)
    respondError({
      res,
      statusCode: 400,
      message: "Address not found",
    });

  await db.address.update(addressIdToUpdate, req.body);

  respondSuccessNoContent(res);
};
