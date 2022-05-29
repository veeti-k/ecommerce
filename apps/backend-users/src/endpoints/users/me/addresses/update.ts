import { db } from "database";
import { Endpoint, REQ_USER, respondError, respondSuccessNoContent } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const update: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;
  const addressIdToUpdate = req.params.addressId;

  const existingAddress = await db.users.addresses.get.oneById(currentUser._id, addressIdToUpdate);
  if (!existingAddress)
    respondError({
      res,
      statusCode: 400,
      message: "Address not found",
    });

  await db.users.addresses.update(currentUser._id, addressIdToUpdate, req.body);

  respondSuccessNoContent(res);
};
