import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { config } from "../../config";
import { SeededUsers, seededUsers } from "../../database/seededUsers";

export const baseUrl = `http://test-backend:${config.port}/api`;

export const getRandomEmail = () => Math.random().toString().slice(2, 20) + "@test.test";
export const getRandomString = () => Math.random().toString().slice(2, 20) + "test-name";

export class TestClient {
  loginAs: {
    [key in SeededUsers]: () => Promise<{ accessToken: string; refreshToken: string }>;
  };
  axiosInstance: AxiosInstance;

  constructor() {
    // @ts-ignore
    this.loginAs = {};
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      validateStatus: () => true,
    });

    for (const username in seededUsers) {
      const user = seededUsers[username];

      this.loginAs[username as SeededUsers] = async () => {
        const res = await this.axiosInstance.post("/v1/auth/login", {
          email: user.email,
          password: user.password,
        });

        const accessToken = res.headers[config.headers.accessTokenHeaderName];
        const refreshToken = res.headers["set-cookie"]![0].split(";")[0].split("=")[1] as string;

        this.axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;

        return {
          accessToken,
          refreshToken,
        };
      };
    }
  }

  async logout() {
    this.axiosInstance.defaults.headers.common["Authorization"] = "";
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return this.axiosInstance.post(url, data, config);
  }

  async get(url: string, config?: AxiosRequestConfig<any>) {
    return this.axiosInstance.get(url, config);
  }

  async patch(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return this.axiosInstance.patch(url, data, config);
  }
}
