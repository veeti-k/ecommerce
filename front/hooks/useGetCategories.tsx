import { useEffect, useState } from "react";
import { ResolvedCategory, Category } from "../types";
import { logger } from "../utils/logger";
import { request } from "../utils/requests";
import { apiRoutes } from "../utils/routes";

export const useGetCategories = () => {
  const [resolvedCategories, setResolvedCategories] = useState<ResolvedCategory[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    logger.logHook("useGetCategories");

    (async () => {
      setIsLoading(true);

      const res = await request({
        method: "GET",
        path: apiRoutes.categoriesRoot,
      });

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
