import {
  PLACE_ORDER_VIEW_REQUEST,
  SET_ORDER_VIEW,
  PLACE_ORDER_VIEW_FAILED,
  CLEAN_ORDER_VIEW,
} from "../../utils/constants.js";

import request from "../../utils/api.js";

export const setOrderView = (number) => {
  return (dispatch) => {
    dispatch({
      type: PLACE_ORDER_VIEW_REQUEST,
    });
    request(`/orders/${number}`, {
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: SET_ORDER_VIEW,
          payload: res.orders,
        });
      })
      .catch((err) => {
        dispatch({
          type: PLACE_ORDER_VIEW_FAILED,
        });
        console.error(err);
      });
  };
};

export const cleanOrderView = () => {
  return {
    type: CLEAN_ORDER_VIEW,
  };
};
