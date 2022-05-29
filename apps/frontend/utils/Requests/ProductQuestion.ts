import { AddProductQuestionRequestBody } from "../../types/ProductQuestion";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const GetNotApprovedProductQuestionsRequest = () =>
  request({
    path: apiRoutes.products.notApprovedQuestionsRoot,
    method: "GET",
  });

export const ApproveProductQuestionRequest = (productId: string, questionId: string) =>
  request({
    path: apiRoutes.products.product.questions.questionRoot(productId, questionId),
    method: "PATCH",
  });

export const DeclineProductQuestionRequest = (productId: string, questionId: string) =>
  request({
    path: apiRoutes.products.product.questions.questionRoot(productId, questionId),
    method: "DELETE",
  });

export const AddProductQuestionRequest = (
  productId: string,
  question: AddProductQuestionRequestBody
) =>
  request({
    path: apiRoutes.products.product.questionsRoot(productId),
    method: "POST",
    body: question,
  });
