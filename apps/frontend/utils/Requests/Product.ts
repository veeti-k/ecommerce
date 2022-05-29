import { ProductFormValues } from "../../components/Forms/ProductForm";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteProductRequest = (productId: string) =>
  request({
    path: apiRoutes.products.productRoot(productId),
    method: "DELETE",
  });

export const GetProductRequest = (productId: string) =>
  request({
    path: apiRoutes.products.productRoot(productId),
    method: "GET",
  });

export const UpdateProductRequest = (productId: string, updatedProduct: ProductFormValues) =>
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

  bulletPoints: string[];
  imageLinks: string[];

  deepestCategoryId: number;
};

export const AddProductRequest = (newProduct: AddProductRequestBody) =>
  request({
    path: apiRoutes.productsRoot,
    method: "POST",
    body: newProduct,
  });
