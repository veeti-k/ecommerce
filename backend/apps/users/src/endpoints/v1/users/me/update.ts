import { AuthVerifyUserResponse, Endpoint, REQ_USER, respondSuccessNoContent } from "shared";
import { db } from "../../../../database";

export const update: Endpoint = async (req, res) => {
  const { userId } = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  await db.user.update(userId, req.body);

  respondSuccessNoContent(res);
};
