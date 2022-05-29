import { validationSchemas } from "shared2";
import { QuestionAnswerModel } from "../../models/ugc/Question";

export const create = (
  productId: string,
  questionId: string,
  byEmployee: boolean,
  body: validationSchemas.ICreateReviewCommentBody
) => {
  const questionAnswer = {
    productId,
    questionId,
    byEmployee,
    ...body,
  };

  return new QuestionAnswerModel(questionAnswer).save();
};

export const approve = (productId: string, questionId: string, answerId: string) =>
  QuestionAnswerModel.findOneAndUpdate(
    { _id: answerId, productId, questionId },
    {
      isApproved: true,
    },
    { new: true }
  ).lean();

export const remove = (productId: string, questionId: string, answerId: string) =>
  QuestionAnswerModel.deleteOne({ _id: answerId, productId, questionId }).lean();

export const get = {
  all: (isApproved: boolean) =>
    QuestionAnswerModel.find({
      isApproved,
    }).lean(),

  byProductId: (productId: string) =>
    QuestionAnswerModel.find({
      productId,
    }).lean(),

  one: (productId: string, questionId: string, answerId: string) =>
    QuestionAnswerModel.findOne({
      _id: answerId,
      productId,
      questionId,
    }).lean(),
};
