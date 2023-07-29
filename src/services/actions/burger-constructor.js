import { ADD_TO_CONSTRUCTOR_LIST } from "../../utils/constants.js";

export const addToConstructorList = (ingredient) => {
  return {
    type: ADD_TO_CONSTRUCTOR_LIST,
    ingredient,
  };
};
