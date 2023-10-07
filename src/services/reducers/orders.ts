import {
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
} from "../../utils/constants";
import { TOrderWithStringIngredients } from "../../utils/types";
import { TOrdersActions } from "../actions/orders";

export type TOrdersState = {
  status: string;
  orders: ReadonlyArray<TOrderWithStringIngredients>;
  total: number | null;
  totalToday: number | null;
  error: string;
};

const initialState: TOrdersState = {
  status: "offline",
  orders: [],
  total: null,
  totalToday: null,
  error: "",
};

export const ordersReducer = (
  state = initialState,
  action: TOrdersActions
): TOrdersState => {
  switch (action.type) {
    case ORDERS_WS_CONNECTING:
      return {
        ...state,
        status: "connecting",
      };
    case ORDERS_WS_OPEN:
      return {
        ...state,
        status: "online",
        error: "",
      };
    case ORDERS_WS_CLOSE:
      return {
        ...state,
        status: "offline",
      };
    case ORDERS_WS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ORDERS_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders.reverse(),
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
