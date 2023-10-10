import store from "../index";
import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TBurgerIngredientsActions } from "../services/actions/burger-ingredients";
import { TFeedActions } from "../services/actions/feed";
import { TOrderDetailsActions } from "../services/actions/order-details";
import { TOrderViewActions } from "../services/actions/order-view";
import { TOrdersActions } from "../services/actions/orders";
import { TUserActions } from "../services/actions/user";
import { Middleware } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  FEED_CONNECT,
  FEED_DISCONNECT,
  FEED_WS_CONNECTING,
  FEED_WS_OPEN,
  FEED_WS_CLOSE,
  FEED_WS_ERROR,
  FEED_WS_MESSAGE,
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
} from "./constants";

export type TInputs = {
  email?: string;
  password?: string;
  name?: string;
  code?: string;
};

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
};

export type TIngredientWithUuid = TIngredient & { constructorId: string };

export type TUser = {
  name: string;
  email: string;
};

export type TOrder = {
  createdAt: string;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TOrderWithStringIngredients = TOrder & {
  ingredients: Array<string>;
};

export type TFetchOptions = {
  method: string;
  headers: { [key: string]: string };
  body?: string;
};

export type TUserRequest = {
  success: boolean;
  user: TUser;
};

export type TDataRequest = {
  data: Array<TIngredient>;
  success: boolean;
};

export type TUserRefreshRequest = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};

export type TUserLoginRequest = TUserRefreshRequest & {
  user: TUser;
};

export type TPostOrderRequest = {
  success: boolean;
  name: string;
  order: TOrder & {
    ingredients: Array<TIngredient>;
    owner: TUser;
    price: number;
  };
};

export type TGetOrderRequest = {
  success: boolean;
  orders: Array<
    TOrderWithStringIngredients & {
      owner: string;
      __v: number;
    }
  >;
};

export type TRequest = TUserRefreshRequest &
  TUserLoginRequest &
  TDataRequest &
  TUserRequest &
  TPostOrderRequest &
  TGetOrderRequest & { success: boolean; message: string };

export type TRootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TFeedActions
  | TOrderDetailsActions
  | TOrderViewActions
  | TOrdersActions
  | TUserActions;

export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  TApplicationActions
>;

export type TAppDispatch = ThunkDispatch<
  TRootState,
  never,
  TApplicationActions
>;

export type TWebSocketMiddleware = Middleware<{}, TRootState>;

export type TFeedWsActions = {
  wsConnect: typeof FEED_CONNECT;
  wsDisconnect: typeof FEED_DISCONNECT;
  wsConnecting: typeof FEED_WS_CONNECTING;
  onOpen: typeof FEED_WS_OPEN;
  onClose: typeof FEED_WS_CLOSE;
  onError: typeof FEED_WS_ERROR;
  onMessage: typeof FEED_WS_MESSAGE;
};

export type TOrdersWsActions = {
  wsConnect: typeof ORDERS_CONNECT;
  wsDisconnect: typeof ORDERS_DISCONNECT;
  wsConnecting: typeof ORDERS_WS_CONNECTING;
  onOpen: typeof ORDERS_WS_OPEN;
  onClose: typeof ORDERS_WS_CLOSE;
  onError: typeof ORDERS_WS_ERROR;
  onMessage: typeof ORDERS_WS_MESSAGE;
};

export type TWebSocketActions = TOrdersWsActions | TFeedWsActions;
