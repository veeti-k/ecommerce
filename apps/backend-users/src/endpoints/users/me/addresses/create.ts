import { db } from "database";
import { Endpoint, REQ_USER, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const createdAddress = await db.users.addresses.create(currentUser._id, req.body);

  respondSuccess({
    res,
    statusCode: 201,
    json: { addressId: createdAddress._id },
  });
};
