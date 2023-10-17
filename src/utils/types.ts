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

export type Location = PreviousPage & { from: { pathname: string } };

export type Inputs = {
  email?: string;
  password?: string;
  name?: string;
  code?: string;
};

export type Ingredient = {
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

export type IngredientWithUuid = Ingredient & { constructorId: string };

export type User = {
  name: string;
  email: string;
};

export type Order = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
};

export type OrderWithId = Order & {
  updatedAt: string;
  _id: string;
};

export type OrderWithOwner = OrderWithId & { owner: string; __v?: string };

export type FetchOptions = {
  method: string;
  headers: { [key: string]: string };
  body?: string;
};

export type UserRequest = {
  success: boolean;
  user: User;
};

export type DataRequest = {
  data: Array<Ingredient>;
  success: boolean;
};

export type UserRefreshRequest = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};

export type UserLoginRequest = UserRefreshRequest & {
  user: User;
};

export type PostOrderRequest = {
  success: boolean;
  name: string;
  order: Order & {
    ingredients: Array<Ingredient>;
    owner: User;
    price: number;
  };
};

export type GetOrderRequest = {
  success: boolean;
  orders: Array<OrderWithOwner>;
};

export type Request = UserRefreshRequest &
  UserLoginRequest &
  DataRequest &
  UserRequest &
  PostOrderRequest &
  GetOrderRequest & { success: boolean; message: string };

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export type WebSocketMiddleware = Middleware<{}, RootState>;

type FeedWsActions = {
  wsConnect: typeof feedSlice.actions.connect;
  wsDisconnect: typeof feedSlice.actions.disconnect;
  wsConnecting: typeof feedSlice.actions.wsConnecting;
  onOpen: typeof feedSlice.actions.wsOpen;
  onClose: typeof feedSlice.actions.wsClose;
  onError: typeof feedSlice.actions.wsError;
  onMessage: typeof feedSlice.actions.wsMessage;
};

type OrdersWsActions = {
  wsConnect: typeof ordersSlice.actions.connect;
  wsDisconnect: typeof ordersSlice.actions.disconnect;
  wsConnecting: typeof ordersSlice.actions.wsConnecting;
  onOpen: typeof ordersSlice.actions.wsOpen;
  onClose: typeof ordersSlice.actions.wsClose;
  onError: typeof ordersSlice.actions.wsError;
  onMessage: typeof ordersSlice.actions.wsMessage;
};

export type WebSocketActions = OrdersWsActions | FeedWsActions;
