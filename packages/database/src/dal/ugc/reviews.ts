import { validationSchemas } from "shared2";
import { ReviewModel } from "../../models/ugc/Review";

export const create = (
  productId: string,
  byEmployee: boolean,
  body: validationSchemas.ICreateReviewBody
) => {
  const review = {
    productId,
    byEmployee,
    ...body,
  };

  return new ReviewModel(review).save();
};

export const get = {
  all: (isApproved: boolean) =>
    ReviewModel.find({
      isApproved,
    }).lean(),

  byProductId: (productId: string) =>
    ReviewModel.find({
      productId,
    }).lean(),

  oneById: (reviewId: string) =>
    ReviewModel.findOne({
      _id: reviewId,
    }).lean(),
};

export const approve = (reviewId: string) =>
  ReviewModel.findOneAndUpdate(
    { reviewId },
    {
      isApproved: true,
    },
    { new: true }
  ).lean();

export const remove = (productId: string, reviewId: string) =>
  ReviewModel.deleteOne({ productId, reviewId }).lean();
