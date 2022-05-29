import { db } from "database";
import { Endpoint, REQ_USER, respondSuccessNoContent } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const update: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  await db.users.users.update(currentUser._id, req.body);

  respondSuccessNoContent(res);
};
