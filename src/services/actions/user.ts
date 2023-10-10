import { SET_USER, SET_AUTH_CHECKED } from "../../utils/constants";
import request, { fetchWithRefresh } from "../../utils/api";
import { TAppThunk, TInputs, TUser } from "../../utils/types";
import { NavigateFunction } from "react-router-dom";

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly user: TUser | null;
}

export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}

export type TUserActions = ISetUserAction | ISetAuthCheckedAction;

export const setUser = (user: TUser | null): ISetUserAction => {
  return {
    type: SET_USER,
    user,
  };
};

export const setAuthChecked = (value: boolean): ISetAuthCheckedAction => {
  return {
    type: SET_AUTH_CHECKED,
    payload: value,
  };
};

export const loginUser = ({
  email,
  password,
}: TInputs): TAppThunk<Promise<unknown>> => {
  return async (dispatch) => {
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
      .catch(console.error);
  };
};

export const logoutUser = (): TAppThunk<Promise<unknown>> => {
  return async (dispatch) => {
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
      .catch(console.error);
  };
};

export const registerUser = ({
  email,
  password,
  name,
}: TInputs): TAppThunk<Promise<unknown>> => {
  return async (dispatch) => {
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
      .catch(console.error);
  };
};

export const handleForgotPassword = ({
  email,
}: TInputs): TAppThunk<Promise<unknown>> => {
  return async () => {
    await request("/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(() => {
      localStorage.setItem("resetFlag", "true");
      setTimeout(() => localStorage.setItem("resetFlag", "false"), 600000);
    });
  };
};

export const handleResetPassword = ({
  password,
  code,
}: TInputs): TAppThunk<Promise<unknown>> => {
  return async () => {
    await request("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token: code,
      }),
    }).then(() => localStorage.setItem("resetFlag", "false"));
  };
};

export const getUser = (): TAppThunk<Promise<unknown>> => {
  return async (dispatch) => {
    fetchWithRefresh("/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("accessToken")}`,
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

export const updateUser = ({
  name,
  email,
  password,
}: TInputs): TAppThunk<Promise<unknown>> => {
  return async (dispatch) => {
    const body: TInputs =
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
        authorization: `${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => dispatch(setUser(res.user)))
      .catch(console.error);
  };
};
