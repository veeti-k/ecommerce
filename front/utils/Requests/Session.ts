import { request } from "../requests";
import { apiRoutes } from "../routes";

export const RevokeSessionRequest = async (sessionId: string) =>
  await request({
    path: apiRoutes.user.sessions.session("me", sessionId),
    method: "DELETE",
  });
