import { request } from "../requests";
import { apiRoutes } from "../routes";

export const RevokeSessionRequest = (sessionIds: string[]) =>
  request({
    path: apiRoutes.user.sessionsRoot("me"),
    method: "DELETE",
    body: {
      sessionIds,
    },
  });
