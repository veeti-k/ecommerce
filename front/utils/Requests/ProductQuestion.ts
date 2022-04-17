import { request } from "../requests";
import { apiRoutes } from "../routes";

export const GetNotApprovedProductQuestionsRequest = () =>
  request({
    path: apiRoutes.products.questionsRoot,
    method: "GET",
  });

export const ApproveProductQuestionRequest = (productId: number, questionId: string) =>
  request({
    path: apiRoutes.products.product.questions.questionRoot(productId, questionId),
    method: "PATCH",
  });

export const DeclineProductQuestionRequest = (productId: number, questionId: string) =>
  request({
    path: apiRoutes.products.product.questions.questionRoot(productId, questionId),
    method: "DELETE",
  });
