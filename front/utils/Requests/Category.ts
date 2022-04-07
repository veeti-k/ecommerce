import { Category } from "../../types";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const DeleteCategoryRequest = (categoryId: number) =>
  request({
    path: apiRoutes.categories.category(categoryId),
    method: "DELETE",
  });

export const EditCategoryRequest = (categoryId: number, updatedCategory: Omit<Category, "id">) =>
  request({
    path: apiRoutes.categories.category(categoryId),
    method: "PATCH",
    body: updatedCategory,
  });

export const AddCategoryRequest = (newCategory: Omit<Category, "id">) =>
  request({
    path: apiRoutes.categoriesRoot,
    method: "POST",
    body: newCategory,
  });

export const GetCategoriesRequest = () =>
  request({
    path: apiRoutes.categoriesRoot,
    method: "GET",
  });
