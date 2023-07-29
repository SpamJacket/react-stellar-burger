import { SET_INGREDIENT_INFO } from "../../utils/constants.js";

const initialState = {};

export const ingredientDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_INFO:
      return action.ingredient;
    default:
      return state;
  }
};
