import { Actions, MyDispatch } from "../../UserProvider/types";
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

export const GetMe = async (dispatch: MyDispatch) => {
  const res = await request({
    method: "GET",
    path: apiRoutes.userRoot("me"),
  });

  if (!res || !res?.data?_id) return;

  dispatch({ type: Actions.SetUser, payload: res.data });
};
