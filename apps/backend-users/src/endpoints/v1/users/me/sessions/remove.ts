import { Endpoint, REQ_USER, respondSuccessNoContent } from "shared";
import { AuthVerifyUserResponse } from "shared2";
import { db } from "../../../../../database";

export const remove: Endpoint = async (req, res) => {
  const user = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  await db.session.removeMany(user.userId, req.body?.sessionIds);

  respondSuccessNoContent(res);
};
