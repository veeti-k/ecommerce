import { Endpoint, REQ_USER, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";
import { db } from "../../../../../database";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const createdAddress = await db.address.create(currentUser.userId, req.body);

  respondSuccess({
    res,
    statusCode: 201,
    json: { addressId: createdAddress.addressId },
  });
};
