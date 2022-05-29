import { validationSchemas } from "shared2";
import { QuestionModel } from "../../models/ugc/Question";

export const create = (productId: string, body: validationSchemas.ICreateQuestionBody) => {
  const question = {
    productId,
    ...body,
  };

  return new QuestionModel(question).save();
};

export const get = {
  all: (isApproved: boolean) =>
    QuestionModel.find({
      isApproved,
    }).lean(),

  byProductId: (productId: string) =>
    QuestionModel.find({
      productId,
    }).lean(),

  oneById: (productId: string, questionId: string) =>
    QuestionModel.findOne({
      _id: questionId,
      productId,
    }).lean(),
};

export const approve = (questionId: string) =>
  QuestionModel.findOneAndUpdate(
    { questionId },
    {
      isApproved: true,
    },
    { new: true }
  ).lean();

export const remove = (productId: string, questionId: string) =>
  QuestionModel.findOneAndUpdate(
    { productId, questionId },
    {
      isApproved: false,
    },
    { new: true }
  ).lean();
