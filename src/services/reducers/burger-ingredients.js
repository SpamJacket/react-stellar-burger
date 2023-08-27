import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../../utils/constants.js";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.data,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...initialState,
        ingredientsFailed: true,
      };
    default:
      return state;
  }
};
