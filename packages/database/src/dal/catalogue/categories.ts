import { validationSchemas } from "shared2";
import { CategoryModel } from "../../models/catalogue/Category";

export const create = (body: validationSchemas.ICreateCategoryBody) =>
  new CategoryModel(body).save();

export const update = (categoryId: string, body: validationSchemas.IUpdateCategoryBody) =>
  CategoryModel.findOneAndUpdate({ _id: categoryId }, body, { new: true }).lean();

export const remove = (categoryId: string) =>
  CategoryModel.findOneAndDelete({ _id: categoryId }).lean();

export const get = {
  all: () => CategoryModel.find({}).lean(),
  byId: (categoryId: string) => CategoryModel.findOne({ _id: categoryId }).lean(),
};
