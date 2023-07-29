import { SET_INGREDIENTS_LIST } from "../../utils/constants.js";

const initialState = [];

export const ingredientsList = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_LIST:
      return action.data;
    default:
      return state;
  }
};
