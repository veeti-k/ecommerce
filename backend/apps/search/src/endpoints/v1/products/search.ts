import { Endpoint, respondSuccess } from "shared";

export const search: Endpoint = (req, res) => {
  respondSuccess({
    res,
    statusCode: 200,
    json: { message: "it's working!" },
  });
};
