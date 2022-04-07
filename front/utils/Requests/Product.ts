import { ProductFormValues } from "../../components/Forms/ProductForm";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteProductRequest = (productId: number) =>
  request({
    path: apiRoutes.products.product(productId),
    method: "DELETE",
  });

export const GetProductRequest = (productId: number) =>
  request({
    path: apiRoutes.products.product(productId),
    method: "GET",
  });

export const UpdateProductRequest = (productId: number, updatedProduct: ProductFormValues) =>
  request({
    path: apiRoutes.products.product(productId),
    method: "PATCH",
    body: updatedProduct,
  });
