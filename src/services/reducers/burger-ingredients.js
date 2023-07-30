import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../../utils/constants.js";

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        dataRequest: true,
        dataFailed: false,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        dataRequest: false,
        dataFailed: false,
        data: action.data,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        dataRequest: false,
        dataFailed: true,
      };
    default:
      return state;
  }
};
