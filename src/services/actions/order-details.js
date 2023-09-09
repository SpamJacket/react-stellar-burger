import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
} from "../../utils/constants.js";
import request from "../../utils/api.js";
import { endpoints } from "../../utils/constants.js";

export const placeOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: PLACE_ORDER_REQUEST,
    });
    request(endpoints.ordersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ ingredients }),
    })
      .then((res) => {
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          order: {
            name: res.name,
            orderId: ("000000" + res.order.number).slice(-6),
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: PLACE_ORDER_FAILED,
        });
        console.log(err);
      });
  };
};
