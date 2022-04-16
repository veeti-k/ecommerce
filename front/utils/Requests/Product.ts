import { ProductFormValues } from "../../components/Forms/ProductForm";
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

export const AddProductRequest = (newProduct: ProductFormValues) =>
  request({
    path: apiRoutes.productsRoot,
    method: "POST",
    body: newProduct,
  });
