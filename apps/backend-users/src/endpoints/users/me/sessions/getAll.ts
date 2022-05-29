import { db } from "database";
import { Endpoint, REQ_USER, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const getAll: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const sessions = await db.users.sessions.get.byUserId(currentUser._id);

  respondSuccess({
    res,
    statusCode: 200,
    json: sessions,
  });
};
