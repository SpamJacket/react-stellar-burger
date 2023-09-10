import { SET_USER, SET_AUTH_CHECKED } from "../../utils/constants.js";
import request, { fetchWithRefresh } from "../../utils/api.js";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setAuthChecked = (value) => {
  return {
    type: SET_AUTH_CHECKED,
    payload: value,
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        dispatch(setUser(res.user));
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
      })
      .catch((err) => Promise.reject(err));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    fetchWithRefresh("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(() => {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        dispatch(setUser(null));
      })
      .catch((err) => Promise.reject(err));
  };
};

export const registerUser = ({ email, password, name }) => {
  return (dispatch) => {
    request("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        dispatch(setUser(res.user));
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
      })
      .catch((err) => Promise.reject(err));
  };
};

export const handleForgotPassword = async ({ email }) => {
  return request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(() => localStorage.setItem("resetFlag", true))
    .catch((err) => Promise.reject(err));
};

export const handleResetPassword = async ({ password, code }) => {
  return fetchWithRefresh("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token: code,
    }),
  })
    .then(() => localStorage.removeItem("resetFlag"))
    .catch((err) => Promise.reject(err));
};

export const getUser = () => {
  return (dispatch) => {
    fetchWithRefresh("/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      })
      .finally(() => dispatch(setAuthChecked(true)));
  };
};

export const updateUser = ({ name, email, password }) => {
  return (dispatch) => {
    const body =
      password === ""
        ? {
            email,
            name,
          }
        : {
            email,
            name,
            password,
          };

    fetchWithRefresh("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => dispatch(setUser(res.user)))
      .catch((err) => Promise.reject(err));
  };
};
