import { SET_ORDER_INFO } from "../../utils/constants.js";

const initialState = {};

export const orderDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_INFO:
      return action.order;
    default:
      return state;
  }
};
