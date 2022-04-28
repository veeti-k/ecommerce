import axios from "axios";
import { config } from "config";
import { Product, ZincProduct } from "../types/Product";

interface IBuildZincSearchTerm {
  query?: string;
  categoryId?: number;
}

export const buildSearchTerm = ({ query, categoryId }: IBuildZincSearchTerm): string => {
  const searchTerm = [];

  if (query) searchTerm.push(`${query} +${query}*`);
  if (categoryId) searchTerm.push(`+deepestCategoryId:${categoryId}`);

  return searchTerm.join(" ");
};

export const search = async (searchTerm: string): Promise<Product[]> => {
  const res = await axios.post(
    `${config.zinc.baseUrl}/products/_search`,
    {
      search_type: "querystring",
      query: {
        term: searchTerm,
      },
      _source: [],
      max_results: 100_000,
    },
    axiosConfig
  );

  if (!res?.data?.hits?.total?.value) return [];

  return res.data.hits.hits.map((hit: ZincProduct) => hit._source);
};

export const getProductById = async (productId: number): Promise<ZincProduct | null> => {
  const res = await axios.post(
    `${config.zinc.baseUrl}/products/_search`,
    {
      search_type: "querystring",
      query: {
        term: `productId:${productId}`,
      },
      _source: [],
      max_results: 1,
    },
    axiosConfig
  );

  if (!res?.data?.hits?.total?.value) return null;

  return res.data.hits.hits[0];
};

const axiosConfig = {
  auth: {
    username: config.zinc.username,
    password: config.zinc.password,
  },
};

export const addProduct = async (product: Product) =>
  axios.put(`${config.zinc.baseUrl}/products/document`, product, axiosConfig);

export const updateProduct = async (updated: Product) => {
  const product = await getProductById(updated.productId);

  const zincId = product!._id;

  return axios.put(`${config.zinc.baseUrl}/products/_doc/${zincId}`, updated, axiosConfig);
};
