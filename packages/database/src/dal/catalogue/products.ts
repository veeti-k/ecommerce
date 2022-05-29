import { validationSchemas } from "shared2";
import { ProductModel } from "../../models/catalogue/Product";

export const create = (body: validationSchemas.ICreateProductBody) => new ProductModel(body).save();

export const update = (productId: string, body: validationSchemas.IUpdateProductBody) =>
  ProductModel.findOneAndUpdate({ _id: productId }, body, { new: true }).lean();

export const get = {
  byId: (productId: string) => ProductModel.findOne({ _id: productId }).lean(),
};

export const remove = (productId: string) =>
  ProductModel.findOneAndDelete({ _id: productId }).lean();
