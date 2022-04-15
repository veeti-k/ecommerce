import { useEffect, useState } from "react";
import { ResolvedCategory, Category } from "../types/Category";
import { logger } from "../utils/logger";
import { GetCategoriesRequest } from "../utils/Requests/Category";

export const useGetCategories = () => {
  const [resolvedCategories, setResolvedCategories] = useState<ResolvedCategory[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    logger.logHook("useGetCategories");

    (async () => {
      setIsLoading(true);

      const res = await GetCategoriesRequest();

      setIsLoading(false);

      if (res) {
        setAllCategories(res.data["allCategories"]);
        setResolvedCategories(res.data["resolvedCategories"]);
      }
    })();
  }, []);

  return {
    resolvedCategories,
    allCategories,
    isLoading,
  };
};
