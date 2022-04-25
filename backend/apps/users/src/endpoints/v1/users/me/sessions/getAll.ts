import { AuthVerifyUserResponse, Endpoint, REQ_USER } from "shared";

export const getAll: Endpoint = (req, res) => {
  req.app.get(REQ_USER) as AuthVerifyUserResponse;
};
