import { Endpoint, REQ_USER, respondError, respondSuccessNoContent } from "shared";
import { AuthVerifyUserResponse } from "shared2";
import { db } from "../../../../../database";

export const remove: Endpoint = async (req, res) => {
  const addressId = req.params.addressId;
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const result = await db.address.remove(currentUser.userId, addressId);

  if (!result.count)
    return respondError({
      res,
      statusCode: 404,
      message: "Address not found",
    });

  respondSuccessNoContent(res);
};
