import axios from "axios";
import { config } from "../../config";

export const baseUrl = `http://test-backend:${config.port}/api`;

export const getRandomEmail = () => Math.random().toString().slice(2, 20) + "@test.test";
export const getRandomString = () => Math.random().toString().slice(2, 20) + "test-name";

export const testHttpClient = axios.create({ validateStatus: () => true, baseURL: baseUrl });
