import { ADD_USER, DELETE_USER } from "../../utils/constants.js";

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};
