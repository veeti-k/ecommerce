import { db } from "database";
import { Endpoint, REQ_USER, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const get: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const addresses = await db.users.addresses.get.byUserId(currentUser._id);

  respondSuccess({
    res,
    statusCode: 200,
    json: addresses,
  });
};
