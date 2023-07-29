import { SET_INGREDIENTS_LIST } from "../../utils/constants.js";

export const setIngredientsList = (data) => {
  return {
    type: SET_INGREDIENTS_LIST,
    data,
  };
};
