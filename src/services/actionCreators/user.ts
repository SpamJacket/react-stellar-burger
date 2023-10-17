import { createAsyncThunk } from "@reduxjs/toolkit";
import request, { fetchWithRefresh } from "../../utils/api";
import type { Inputs } from "../../utils/types";

export const loginUser = createAsyncThunk(
  "loginUser/fetchAll",
  async ({ email, password }: Inputs, thunkAPI) => {
    try {
      return await request("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await fetchWithRefresh("/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("refreshToken"),
        }),
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser/fetchAll",
  async ({ email, password, name }: Inputs, thunkAPI) => {
    try {
      return await request("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const handleForgotPassword = createAsyncThunk(
  "forgotPassword/fetchAll",
  async ({ email }: Inputs, thunkAPI) => {
    try {
      const res = await request("/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const handleResetPassword = createAsyncThunk(
  "resetPassword/fetchAll",
  async ({ password, code }: Inputs, thunkAPI) => {
    try {
      const res = await request("/password-reset/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          token: code,
        }),
      });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetchWithRefresh("/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("accessToken")}`,
        },
      });
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser/fetchAll",
  async ({ name, email, password }: Inputs, thunkAPI) => {
    const body: Inputs =
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
    try {
      const res = await fetchWithRefresh("/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(body),
      });
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
