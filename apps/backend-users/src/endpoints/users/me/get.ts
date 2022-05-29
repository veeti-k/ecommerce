import { db } from "database";
import { Endpoint, REQ_USER, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const get: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  const dbSessions = await db.users.sessions.get.byUserId(currentUser._id);
  const dbAddresses = await db.users.addresses.get.byUserId(currentUser._id);

  const sessions: any[] = [...(dbSessions || [])].map((session) => ({
    ...session,
    isCurrentSession: session._id === currentUser.sessionId,
  }));

  const user = {
    ...currentUser,
    sessions,
    addresses: dbAddresses,
  };

  respondSuccess({
    res,
    statusCode: 200,
    json: user,
  });
};
