import { validationSchemas } from "shared2";
import { ReviewCommentModel } from "../../models/ugc/Review";

export const create = (
  productId: string,
  reviewId: string,
  byEmployee: boolean,
  body: validationSchemas.ICreateReviewCommentBody
) => {
  const reviewComment = {
    productId,
    reviewId,
    byEmployee,
    ...body,
  };

  return new ReviewCommentModel(reviewComment).save();
};

export const approve = (productId: string, reviewId: string, commentId: string) =>
  ReviewCommentModel.findOneAndUpdate(
    { _id: commentId, productId, reviewId },
    {
      isApproved: true,
    },
    { new: true }
  ).lean();

export const remove = (productId: string, reviewId: string, commentId: string) =>
  ReviewCommentModel.deleteOne({ _id: commentId, productId, reviewId }).lean();

export const get = {
  all: (isApproved: boolean) =>
    ReviewCommentModel.find({
      isApproved,
    }).lean(),

  byProductId: (productId: string) =>
    ReviewCommentModel.find({
      productId,
    }).lean(),

  oneById: (commentId: string) =>
    ReviewCommentModel.findOne({
      _id: commentId,
    }).lean(),
};
