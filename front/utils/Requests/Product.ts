import { ProductFormValues } from "../../components/Forms/ProductForm";
import { bulletPoint, imageLink } from "../../types/Product";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteProductRequest = (productId: number) =>
  request({
    path: apiRoutes.products.productRoot(productId),
    method: "DELETE",
  });

export const GetProductRequest = (productId: number) =>
  request({
    path: apiRoutes.products.productRoot(productId),
    method: "GET",
  });

export const UpdateProductRequest = (productId: number, updatedProduct: ProductFormValues) =>
  request({
    path: apiRoutes.products.productRoot(productId),
    method: "PATCH",
    body: updatedProduct,
  });

type AddProductRequestBody = {
  name: string;
  price: number;
  description: string;
  shortDescription: string;

  isDiscounted: boolean;
  discountedPrice: number;
  discountPercent: number;
  discountAmount: number;

  bulletPoints: bulletPoint[];
  imageLinks: imageLink[];

  deepestCategoryId: number;
};

export const AddProductRequest = (newProduct: AddProductRequestBody) =>
  request({
    path: apiRoutes.productsRoot,
    method: "POST",
    body: newProduct,
  });
