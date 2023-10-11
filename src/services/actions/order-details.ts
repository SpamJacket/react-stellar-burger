import {
  endpoints,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
} from "../../utils/constants";
import { cleanConstructorList } from "./burger-constructor";
import request from "../../utils/api";
import { TAppThunk } from "../../utils/types";

export interface IPlaceOrderRequestAction {
  readonly type: typeof PLACE_ORDER_REQUEST;
}

export interface IPlaceOrderSuccessAction {
  readonly type: typeof PLACE_ORDER_SUCCESS;
  readonly order: { orderNumber: string };
}

export interface IPlaceOrderFailedAction {
  readonly type: typeof PLACE_ORDER_FAILED;
}

export type TOrderDetailsActions =
  | IPlaceOrderRequestAction
  | IPlaceOrderSuccessAction
  | IPlaceOrderFailedAction;

export const placeOrder = (
  ingredients: ReadonlyArray<string>,
  setIsModalOpened: Function
): TAppThunk => {
  return (dispatch) => {
    dispatch({
      type: PLACE_ORDER_REQUEST,
    });
    request(endpoints.ordersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ ingredients }),
    })
      .then((res) => {
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          order: {
            orderNumber: ("000000" + res.order.number).slice(-6),
          },
        });
      })
      .then(() => {
        setIsModalOpened(true);
        dispatch(cleanConstructorList());
      })
      .catch((err) => {
        dispatch({
          type: PLACE_ORDER_FAILED,
        });
        console.error(err);
      });
  };
};
