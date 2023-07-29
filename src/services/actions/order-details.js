import { SET_ORDER_INFO } from "../../utils/constants.js";

export const setOrderInfo = (order) => {
  return {
    type: SET_ORDER_INFO,
    order,
  };
};
