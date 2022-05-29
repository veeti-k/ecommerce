import { db } from "database";
import { Endpoint, REQ_USER, respondSuccessNoContent } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const remove: Endpoint = async (req, res) => {
  const user = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  await db.users.sessions.revokeMany(user._id, req.body?.sessionIds);

  respondSuccessNoContent(res);
};
