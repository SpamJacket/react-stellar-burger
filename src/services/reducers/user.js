import { ADD_USER, DELETE_USER } from "../../utils/constants.js";

const initialState = {
  name: null,
  email: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        name: action.user.name,
        email: action.user.email,
      };
    case DELETE_USER:
      return initialState;
    default:
      return state;
  }
};
