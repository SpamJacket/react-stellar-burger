import { BASE_URL } from "./constants";
import type { TFetchOptions, TRequest, TUserRefreshRequest } from "./types";

const checkResponse = (res: any): Promise<TRequest> => {
  return res.ok
    ? res.json()
    : res.json().then((err: any): Promise<never> => Promise.reject(err));
};

const checkSuccess = (res: any): Promise<TRequest> => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ответ не success: ${res.message}`);
};

const request = (
  endpoint: string,
  options?: TFetchOptions | { method: string }
): Promise<TRequest> => {
  return fetch(BASE_URL + endpoint, options)
    .then(checkResponse)
    .then(checkSuccess);
};

const refreshToken = (): Promise<TUserRefreshRequest> => {
  return request("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async (
  endpoint: string,
  options: TFetchOptions
): Promise<TRequest> => {
  try {
    return await request(endpoint, options);
  } catch (err: any) {
    if (err.message === "jwt expired" || err.message === "jwt malformed") {
      const refreshData: TUserRefreshRequest = await refreshToken();

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);

      options.headers.authorization = refreshData.accessToken;

      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export default request;
