import axios, { Method } from "axios";
import { apiBase } from "./envs";
import { getToken, saveToken } from "./token";

export const authRequest = async (body: any) => {
  try {
    console.log(apiBase);

    const res = await axios({
      method: "POST",
      url: `${apiBase}/auth/login`,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res?.data?.accessToken) saveToken(res.data.accessToken);

    return res;
  } catch (err) {
    return null;
  }
};

export const request = async (path: string, method: Method, body: any) => {
  try {
    const res = await axios({
      method,
      url: `${apiBase}${path}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return res;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};
