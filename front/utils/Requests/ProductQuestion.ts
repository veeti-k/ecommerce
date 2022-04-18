import { AddProductQuestionRequestBody } from "../../types/ProductQuestion";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const GetNotApprovedProductQuestionsRequest = () =>
  request({
    path: apiRoutes.products.notApprovedQuestionsRoot,
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

export const AddProductQuestionRequest = (
  productId: number,
  question: AddProductQuestionRequestBody
) =>
  request({
    path: apiRoutes.products.product.questionsRoot(productId),
    method: "POST",
    body: question,
  });
