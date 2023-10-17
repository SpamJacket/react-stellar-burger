import setupStore from "../services/store/index";
import { Middleware } from "redux";
import { feedSlice } from "../services/slices/feed";
import { ordersSlice } from "../services/slices/orders";
import rootReducer from "../services/store/reducers";

export type PreviousPage = {
  pathname: string;
  search: string;
  hash: string;
  key: string;
  state: null | PreviousPage;
};

export type TLocation = PreviousPage & { from: { pathname: string } };

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
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
};

export type TOrderWithId = TOrder & {
  updatedAt: string;
  _id: string;
};

export type TOrderWithOwner = TOrderWithId & { owner: string; __v?: string };

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
  orders: Array<TOrderWithOwner>;
};

export type TRequest = TUserRefreshRequest &
  TUserLoginRequest &
  TDataRequest &
  TUserRequest &
  TPostOrderRequest &
  TGetOrderRequest & { success: boolean; message: string };

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore["dispatch"];

export type TWebSocketMiddleware = Middleware<{}, TRootState>;

type TFeedWsActions = {
  wsConnect: typeof feedSlice.actions.connect;
  wsDisconnect: typeof feedSlice.actions.disconnect;
  wsConnecting: typeof feedSlice.actions.wsConnecting;
  onOpen: typeof feedSlice.actions.wsOpen;
  onClose: typeof feedSlice.actions.wsClose;
  onError: typeof feedSlice.actions.wsError;
  onMessage: typeof feedSlice.actions.wsMessage;
};

type TOrdersWsActions = {
  wsConnect: typeof ordersSlice.actions.connect;
  wsDisconnect: typeof ordersSlice.actions.disconnect;
  wsConnecting: typeof ordersSlice.actions.wsConnecting;
  onOpen: typeof ordersSlice.actions.wsOpen;
  onClose: typeof ordersSlice.actions.wsClose;
  onError: typeof ordersSlice.actions.wsError;
  onMessage: typeof ordersSlice.actions.wsMessage;
};

export type TWebSocketActions = TOrdersWsActions | TFeedWsActions;
