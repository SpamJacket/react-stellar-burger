import {
  PLACE_ORDER_VIEW_REQUEST,
  SET_ORDER_VIEW,
  PLACE_ORDER_VIEW_FAILED,
  CLEAN_ORDER_VIEW,
} from "../../utils/constants";

import request from "../../utils/api";
import { TAppThunk, TOrderWithStringIngredients } from "../../utils/types";

export interface IPlaceOrderViewRequestAction {
  readonly type: typeof PLACE_ORDER_VIEW_REQUEST;
}

export interface ISetOrderViewAction {
  readonly type: typeof SET_ORDER_VIEW;
  readonly payload: ReadonlyArray<
    TOrderWithStringIngredients & { owner: string; __v: number }
  >;
}

export interface IPlaceOrderViewFailedAction {
  readonly type: typeof PLACE_ORDER_VIEW_FAILED;
}

export interface ICleanOrderViewAction {
  readonly type: typeof CLEAN_ORDER_VIEW;
}

export type TOrderViewActions =
  | IPlaceOrderViewRequestAction
  | ISetOrderViewAction
  | IPlaceOrderViewFailedAction
  | ICleanOrderViewAction;

export const setOrderView = (number: string): TAppThunk<Promise<unknown>> => {
  return async (dispatch) => {
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
