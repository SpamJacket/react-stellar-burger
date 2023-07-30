import {
  ADD_TO_CONSTRUCTOR_LIST,
  CLEAN_CONSTRUCTOR_LIST,
} from "../../utils/constants.js";

const initialState = {
  bun: null,
  filings: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CONSTRUCTOR_LIST:
      return action.ingredient.type === "bun"
        ? { ...state, bun: action.ingredient }
        : { ...state, filings: [...state.filings, action.ingredient] };
    case CLEAN_CONSTRUCTOR_LIST:
      return {
        bun: null,
        filings: [],
      };
    default:
      return state;
  }
};
