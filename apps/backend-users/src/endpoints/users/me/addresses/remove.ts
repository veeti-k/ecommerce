import { db } from "database";
import { Endpoint, REQ_USER, respondError, respondSuccessNoContent } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const remove: Endpoint = async (req, res) => {
  const addressId = req.params.addressId;
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const result = await db.users.addresses.remove(currentUser._id, addressId);

  if (!result)
    return respondError({
      res,
      statusCode: 404,
      message: "Address not found",
    });

  respondSuccessNoContent(res);
};
