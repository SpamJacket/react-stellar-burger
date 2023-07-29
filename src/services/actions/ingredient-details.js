import { SET_INGREDIENT_INFO } from "../../utils/constants.js";

export const setIngredientInfo = (ingredient) => {
  return {
    type: SET_INGREDIENT_INFO,
    ingredient,
  };
};
