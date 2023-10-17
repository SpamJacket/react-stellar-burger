import { BASE_URL } from "./constants";
import type { FetchOptions, Request } from "./types";

const checkResponse = (res: { ok: any; json: () => Promise<any> }) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res: { ok: any; success: boolean; message: string }) => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ответ не success: ${res.message}`);
};

const request = async (
  endpoint: string,
  options?: FetchOptions | { method: string }
) => {
  return (await fetch(BASE_URL + endpoint, options)
    .then(checkResponse)
    .then(checkSuccess)) as Request | never;
};

const refreshToken = () => {
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
  options: FetchOptions
) => {
  try {
    return await request(endpoint, options);
  } catch (err: any) {
    if (err.message === "jwt expired" || err.message === "jwt malformed") {
      const refreshData = await refreshToken();

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
