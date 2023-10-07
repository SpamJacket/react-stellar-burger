import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CONNECTING,
  FEED_WS_OPEN,
  FEED_WS_CLOSE,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
} from "../../utils/constants";
import { TOrderWithStringIngredients } from "../../utils/types";

export interface IFeedConnectAction {
  readonly type: typeof FEED_CONNECT;
  readonly payload: string;
}

export interface IFeedDisconnectAction {
  readonly type: typeof FEED_DISCONNECT;
}

export interface IFeedWsConnectingAction {
  readonly type: typeof FEED_WS_CONNECTING;
}

export interface IFeedWsOpenAction {
  readonly type: typeof FEED_WS_OPEN;
}

export interface IFeedWsCloseAction {
  readonly type: typeof FEED_WS_CLOSE;
}

export interface IFeedWsErrorAction {
  readonly type: typeof FEED_WS_ERROR;
  readonly payload: string;
}

export interface IFeedWsMessageAction {
  readonly type: typeof FEED_WS_MESSAGE;
  readonly payload: {
    orders: ReadonlyArray<TOrderWithStringIngredients>;
    total: number;
    totalToday: number;
  };
}

export type TFeedActions =
  | IFeedWsConnectingAction
  | IFeedWsOpenAction
  | IFeedWsCloseAction
  | IFeedWsErrorAction
  | IFeedWsMessageAction;

export const connect = (url: string): IFeedConnectAction => ({
  type: FEED_CONNECT,
  payload: url,
});

export const disconnect = (): IFeedDisconnectAction => ({
  type: FEED_DISCONNECT,
});
