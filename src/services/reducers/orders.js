import {
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
} from "../../utils/constants";

const initialState = {
  status: "offline",
  orders: [],
  error: "",
};

export const ordersReducer = (state = initialState, action) => {
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
        orders: action.payload,
      };
    default:
      return state;
  }
};
