import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUser, TUserLoginRequest } from "../../utils/types";
import {
  loginUser,
  logoutUser,
  registerUser,
  handleForgotPassword,
  handleResetPassword,
  getUser,
  updateUser,
} from "../actionCreators/user";
import { NavigateFunction } from "react-router-dom";

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: {
    [loginUser.fulfilled.type]: (
      state,
      action: PayloadAction<TUserLoginRequest>
    ) => {
      state.user = action.payload.user;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    [logoutUser.fulfilled.type]: (state) => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      state.user = null;
    },
    [registerUser.fulfilled.type]: (
      state,
      action: PayloadAction<TUserLoginRequest>
    ) => {
      state.user = action.payload.user;
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    [handleForgotPassword.fulfilled.type]: () => {
      localStorage.setItem("resetFlag", "true");
      setTimeout(() => localStorage.setItem("resetFlag", "false"), 600000);
    },
    [handleResetPassword.fulfilled.type]: () => {
      localStorage.setItem("resetFlag", "false");
    },
    [getUser.fulfilled.type]: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    [getUser.rejected.type]: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.user = null;
      state.isAuthChecked = true;
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
