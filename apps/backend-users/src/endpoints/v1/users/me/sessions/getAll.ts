import { Endpoint, REQ_USER, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";
import { db } from "../../../../../database";

export const getAll: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const sessions = await db.session.get.allByUserId(currentUser.userId);

  respondSuccess({
    res,
    statusCode: 200,
    json: sessions,
  });
};
