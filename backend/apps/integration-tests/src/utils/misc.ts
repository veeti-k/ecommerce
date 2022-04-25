import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { config } from "config";
import { seededUsers, SeededUsers, CatalogueClient, UsersClient } from "shared";

export const authBaseUrl = "http://test-auth-api:3000/api";
export const usersBaseUrl = `http://test-users-api:3000/api`;
export const catalogueBaseUrl = `http://test-catalogue-api:3000/api`;
export const zincBaseUrl = `http://test-zinc:4080/api`;

export const getRandomEmail = () => Math.random().toString().slice(2, 20) + "@test.test";
export const getRandomString = () => Math.random().toString().slice(2, 20) + "test-name";
export const getRandomInt = () => Math.floor(Math.random() * 1000);
export const getRandomBoolean = () => Math.random() >= 0.5;

export const cataloguePrisma = new CatalogueClient({
  datasources: { db: { url: config.dbUrls.catalogue } },
});
export const usersPrisma = new UsersClient({ datasources: { db: { url: config.dbUrls.users } } });

export class TestClient {
  loginAs: {
    [key in SeededUsers]: () => Promise<{ accessToken: string; refreshToken: string }>;
  };
  axiosInstance: AxiosInstance;

  constructor() {
    // @ts-ignore
    this.loginAs = {};
    this.axiosInstance = axios.create({
      validateStatus: () => true,
    });

    for (const username in seededUsers) {
      const user = seededUsers[username];

      this.loginAs[username as SeededUsers] = async () => {
        const res = await this.axiosInstance.post(`${authBaseUrl}/v1/auth/login`, {
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

  async delete(url: string, config?: AxiosRequestConfig<any>) {
    return this.axiosInstance.delete(url, config);
  }

  async withConfig(config: AxiosRequestConfig<any>) {
    return this.axiosInstance(config);
  }
}
