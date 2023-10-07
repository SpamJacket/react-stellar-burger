import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
} from "../../utils/constants";
import { TOrderDetailsActions } from "../actions/order-details";

type TOrderDetailsState = {
  order: { orderNumber: string } | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TOrderDetailsState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderDetailsActions
): TOrderDetailsState => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      };
    case PLACE_ORDER_FAILED:
      return {
        ...initialState,
        orderFailed: true,
      };
    default:
      return state;
  }
};
