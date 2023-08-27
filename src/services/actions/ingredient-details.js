import {
  SET_INGREDIENT_INFO,
  CLEAN_INGREDIENT_INFO,
} from "../../utils/constants.js";

export const setIngredientInfo = (ingredient) => {
  return {
    type: SET_INGREDIENT_INFO,
    ingredient,
  };
};

export const cleanIngredientInfo = () => {
  return {
    type: CLEAN_INGREDIENT_INFO,
  };
};
