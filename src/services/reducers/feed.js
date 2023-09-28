import {
  FEED_WS_CONNECTING,
  FEED_WS_OPEN,
  FEED_WS_CLOSE,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
} from "../../utils/constants";

const initialState = {
  status: "offline",
  orders: [],
  total: null,
  totalToday: null,
  error: "",
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_WS_CONNECTING:
      return {
        ...state,
        status: "connecting",
      };
    case FEED_WS_OPEN:
      return {
        ...state,
        status: "online",
        error: "",
      };
    case FEED_WS_CLOSE:
      return {
        ...state,
        status: "offline",
      };
    case FEED_WS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
