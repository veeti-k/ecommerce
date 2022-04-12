import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteAccountRequest = async () =>
  await request({
    path: apiRoutes.userRoot("me"),
    method: "DELETE",
  });
