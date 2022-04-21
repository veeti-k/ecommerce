import { logger } from "./logger";

export const saveToken = (token: string) => {
  logger.log(`saveToken, token: ${token?.slice(0, 20)}`);
  localStorage.setItem("token", token);
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  logger.log("getToken");
  return token;
};

export const removeToken = () => {
  logger.log("removeToken");
  localStorage.removeItem("token");
};
