import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteAccountRequest = () =>
  request({
    path: apiRoutes.userRoot("me"),
    method: "DELETE",
  });

type UpdateAccountRequestProps = {
  name: string;
  email: string;
  phoneNumber: string | null;
};
export const UpdateAccountRequest = (account: UpdateAccountRequestProps) =>
  request({
    path: apiRoutes.userRoot("me"),
    method: "PATCH",
    body: account,
  });
