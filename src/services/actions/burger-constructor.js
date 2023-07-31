import {
  ADD_TO_CONSTRUCTOR_LIST,
  DELETE_FROM_CONSTRUCTOR_LIST,
  CLEAN_CONSTRUCTOR_LIST,
} from "../../utils/constants.js";

import { v4 as uuidv4 } from "uuid";

export const addToConstructorList = (ingredient) => {
  return {
    type: ADD_TO_CONSTRUCTOR_LIST,
    ingredient: {
      ...ingredient,
      constructorId: uuidv4(),
    },
  };
};

export const deleteFromConstructorList = (id) => {
  return {
    type: DELETE_FROM_CONSTRUCTOR_LIST,
    id,
  };
};

export const cleanConstructorList = () => {
  return {
    type: CLEAN_CONSTRUCTOR_LIST,
  };
};
