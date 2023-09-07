import { BASE_URL } from "./constants.js";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(`Ответ не success: ${res.message}`);
};

const request = async (endpoint, options) => {
  return await fetch(BASE_URL + endpoint, options)
    .then(checkResponse)
    .then(checkSuccess);
};

const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    return request(endpoint, options);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);

      options.headers.authorization = refreshData.accessToken;

      return request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export default request;
