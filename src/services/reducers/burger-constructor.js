import {
  ADD_TO_CONSTRUCTOR_LIST,
  DELETE_FROM_CONSTRUCTOR_LIST,
  CLEAN_CONSTRUCTOR_LIST,
  SET_FILINGS,
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
    case DELETE_FROM_CONSTRUCTOR_LIST:
      return {
        ...state,
        filings: state.filings.filter(
          (filing) => filing.constructorId !== action.id
        ),
      };
    case CLEAN_CONSTRUCTOR_LIST:
      return {
        bun: null,
        filings: [],
      };
    case SET_FILINGS:
      return {
        ...state,
        filings: action.filings,
      };
    default:
      return state;
  }
};
