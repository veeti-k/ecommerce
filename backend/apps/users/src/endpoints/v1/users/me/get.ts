import { AuthVerifyUserResponse, Endpoint, REQ_USER, respondSuccess } from "shared";

export const get: Endpoint = (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse;

  respondSuccess({
    res,
    statusCode: 200,
    json: currentUser,
  });
};
