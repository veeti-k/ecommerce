import { useState, useEffect } from "react";
import { ProductPageProduct } from "../types";
import { logger } from "../utils/logger";
import { GetProductRequest } from "../utils/Requests/Product";

export const useGetProduct = (productId: number) => {
  const [product, setProduct] = useState<ProductPageProduct>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    logger.logHook("useGetProduct");

    (async () => {
      setIsLoading(true);

      const res = await GetProductRequest(productId);

      setIsLoading(false);

      if (res) setProduct(res.data);
    })();
  }, []);

  return {
    product,
    isLoading,
  };
};
