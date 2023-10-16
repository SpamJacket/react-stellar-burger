import {
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
} from "../../utils/constants";
import { TOrderWithId } from "../../utils/types";

export interface IOrdersConnectAction {
  readonly type: typeof ORDERS_CONNECT;
  readonly payload: string;
}

export interface IOrdersDisconnectAction {
  readonly type: typeof ORDERS_DISCONNECT;
}

export interface IOrderWsConnectingAction {
  readonly type: typeof ORDERS_WS_CONNECTING;
}

export interface IOrderWsOpenAction {
  readonly type: typeof ORDERS_WS_OPEN;
}

export interface IOrderWsCloseAction {
  readonly type: typeof ORDERS_WS_CLOSE;
}

export interface IOrderWsErrorAction {
  readonly type: typeof ORDERS_WS_ERROR;
  readonly payload: string;
}

export interface IOrderWsMessageAction {
  readonly type: typeof ORDERS_WS_MESSAGE;
  readonly payload: {
    orders: Array<TOrderWithId>;
    total: number;
    totalToday: number;
  };
}

export type TOrdersActions =
  | IOrdersConnectAction
  | IOrdersDisconnectAction
  | IOrderWsConnectingAction
  | IOrderWsOpenAction
  | IOrderWsCloseAction
  | IOrderWsErrorAction
  | IOrderWsMessageAction;

export const connect = (url: string): IOrdersConnectAction => ({
  type: ORDERS_CONNECT,
  payload: url,
});

export const disconnect = (): IOrdersDisconnectAction => ({
  type: ORDERS_DISCONNECT,
});
