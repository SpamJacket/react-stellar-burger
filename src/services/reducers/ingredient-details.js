import {
  SET_INGREDIENT_INFO,
  CLEAN_INGREDIENT_INFO,
} from "../../utils/constants.js";

const initialState = { ingredient: null };

export const ingredientDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_INFO:
      return { ingredient: action.ingredient };
    case CLEAN_INGREDIENT_INFO:
      return { ingredient: null };
    default:
      return state;
  }
};
