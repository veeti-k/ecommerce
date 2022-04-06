import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteProductRequest = (productId: number) =>
  request({
    path: apiRoutes.products.product(productId),
    method: "DELETE",
  });
