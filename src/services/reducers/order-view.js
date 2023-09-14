import {
  PLACE_ORDER_VIEW_REQUEST,
  SET_ORDER_VIEW,
  PLACE_ORDER_VIEW_FAILED,
  CLEAN_ORDER_VIEW,
} from "../../utils/constants.js";

const initialState = {
  order: null,
  orderViewRequest: false,
  orderViewFailed: false,
};

export const orderViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_VIEW_REQUEST:
      return {
        ...state,
        orderViewRequest: true,
        orderViewFailed: false,
      };
    case PLACE_ORDER_VIEW_FAILED:
      return {
        ...initialState,
        orderViewFailed: true,
      };
    case SET_ORDER_VIEW:
      return {
        ...state,
        orderViewRequest: false,
        orderViewFailed: false,
        order: action.payload,
      };
    case CLEAN_ORDER_VIEW:
      return { ...initialState };
    default:
      return state;
  }
};
