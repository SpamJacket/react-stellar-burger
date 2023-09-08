import { SET_USER, SET_AUTH_CHECKED } from "../../utils/constants.js";

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
