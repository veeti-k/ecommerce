import { AuthVerifyUserResponse, Endpoint, REQ_USER, respondSuccess } from "shared";
import { db } from "../../../../database";

export const get: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const fullUser = await db.user.get.byUserIdWith.sessionsAndAddresses(currentUser.userId);

  respondSuccess({
    res,
    statusCode: 200,
    json: { ...fullUser, flags: Number(fullUser!.flags) },
  });
};
