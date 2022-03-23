import axios, { AxiosResponse, Method } from "axios";
import { apiBase, toastOptions } from "./consts";
import { logger } from "./logger";
import { getToken, saveToken } from "./token";
import { toast } from "react-hot-toast";

type ErrorHandlerOptions = {
  error: any;
  shouldRedirect401?: boolean;
  options: TokenRequestOptions | RequestOptions;
};

const errorHandler = (options: ErrorHandlerOptions) => {
  const { error, shouldRedirect401 = true } = options;

  logger.logRequestError({ ...options.options, error });

  if (error?.response?.status === 401 && shouldRedirect401) {
    logger.log("Redirecting to /login...");
    window.location.href = "/login";
  }
  if (error.response?.status === 500)
    toast.error("Server error, please try again later", toastOptions);
};

type TokenRequestOptions = {
  method: Method;
  path: string;
  body?: any;
};

export const tokenRequest = async (options: TokenRequestOptions) => {
  try {
    logger.logRequesting(options);

    const res = await axios({
      method: options.method,
      url: `${apiBase}${options.path}`,
      data: options.body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    logger.logRequestSuccess(options);
    if (res?.data?.accessToken) saveToken(res.data.accessToken);

    return res;
  } catch (err) {
    errorHandler({ error: err, shouldRedirect401: false, options });
    return null;
  }
};

type RequestOptions = {
  method: Method;
  path: string;
  body?: any;
  shouldRedirect401?: boolean;
  isRetry?: boolean;
};

export const request = async (options: RequestOptions): Promise<AxiosResponse<any> | null> => {
  try {
    logger.logRequesting(options);

    const res = await axios({
      method: options.method,
      url: `${apiBase}${options.path}`,
      data: options.body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    logger.logRequestSuccess(options);

    return res;
  } catch (err) {
    if (!options.isRetry && err?.response && err.response?.status === 401) {
      logger.logRequestError({ ...options, error: err });
      logger.log("Trying to get new tokens and retry...");

      await tokenRequest({
        method: "GET",
        path: "/auth/tokens",
      });

      logger.log("Got new tokens, retrying the original request...");

      return request({ ...options, isRetry: true });
    }

    errorHandler({ error: err, shouldRedirect401: options.shouldRedirect401, options });
    return null;
  }
};
