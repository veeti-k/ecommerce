import { request } from "../requests";
import { apiRoutes } from "../routes";

export const RevokeSessionRequest = (sessionId: string) =>
  request({
    path: apiRoutes.user.sessions.session("me", sessionId),
    method: "DELETE",
  });
