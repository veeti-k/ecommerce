import { request } from "../requests";
import { apiRoutes } from "../routes";

export const GetNotApprovedProductQuestionsRequest = () =>
  request({
    path: apiRoutes.products.questionsRoot,
    method: "GET",
  });
