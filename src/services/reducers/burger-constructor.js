import { ADD_TO_CONSTRUCTOR_LIST } from "../../utils/constants.js";

const initialState = {
  bun: null,
  fillings: [],
};

export const constructorList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CONSTRUCTOR_LIST:
      return action.ingredient.type === "bun"
        ? { ...state, bun: action.ingredient }
        : { ...state, fillings: [...state.fillings, action.ingredient] };
    default:
      return state;
  }
};
