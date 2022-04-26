import { AuthVerifyUserResponse, Endpoint, REQ_USER, respondSuccess } from "shared";
import { db } from "../../../../../database";

export const get: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const addresses = await db.address.get.allByUserId(currentUser.userId);

  respondSuccess({
    res,
    statusCode: 200,
    json: addresses,
  });
};
