import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
} from "../../utils/constants.js";

const initialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderDetails = (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      };
    case PLACE_ORDER_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    default:
      return state;
  }
};
