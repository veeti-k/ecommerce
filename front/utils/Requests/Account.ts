import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteAccountRequest = async () =>
  await request({
    path: apiRoutes.userRoot("me"),
    method: "DELETE",
  });

type UpdateAccountRequestProps = {
  name: string;
  email: string;
  phoneNumber: string | null;
};
export const UpdateAccountRequest = async (account: UpdateAccountRequestProps) =>
  await request({
    path: apiRoutes.userRoot("me"),
    method: "PATCH",
    body: account,
  });
