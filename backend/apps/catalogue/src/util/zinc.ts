import { product } from "@prisma/client";
import axios from "axios";
import { config } from "../config";

const axiosConfig = {
  auth: {
    username: config.zinc.username,
    password: config.zinc.password,
  },
};

export const createProductsIndex = async () =>
  axios.put(`${config.zinc.baseUrl}/index`, productIndex, axiosConfig);

export const pushProductToZinc = async (product: product) =>
  axios.put(`${config.zinc.baseUrl}/products/document`, product, axiosConfig);

export const updateProductOnZinc = async (newProduct: product) =>
  axios.put(
    `${config.zinc.baseUrl}/products/_doc/${newProduct.productId}`,
    newProduct,
    axiosConfig
  );

const productIndex = {
  name: "products",
  properties: {
    productId: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    name: {
      type: "text",
      store: true,
      sortable: true,
      highlightable: true,
    },
    description: {
      type: "text",
      store: true,
      sortable: true,
      highlightable: true,
    },
    shortDescription: {
      type: "text",
      store: true,
      sortable: true,
      highlightable: true,
    },
    price: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    discountedPrice: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    discountPercent: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    discountAmount: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    isDiscounted: {
      type: "bool",
      store: true,
      sortable: true,
      highlightable: true,
    },
    averageStars: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    reviewCount: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    questionCount: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    deepestCategoryId: {
      type: "numeric",
      store: true,
      sortable: true,
      highlightable: true,
    },
    bulletPoints: {
      type: "text",
      store: true,
      sortable: true,
      highlightable: true,
    },
    imageLinks: {
      type: "text",
      store: true,
      sortable: true,
      highlightable: true,
    },
  },
};
