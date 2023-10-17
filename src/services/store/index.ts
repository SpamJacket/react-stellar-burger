import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import socketMiddleware from "../middleware/socket-middleware";
import { feedSlice } from "../slices/feed";
import { ordersSlice } from "../slices/orders";

const feedMiddleware = socketMiddleware({
  wsConnect: feedSlice.actions.connect,
  wsDisconnect: feedSlice.actions.disconnect,
  wsConnecting: feedSlice.actions.wsConnecting,
  onOpen: feedSlice.actions.wsOpen,
  onClose: feedSlice.actions.wsClose,
  onError: feedSlice.actions.wsError,
  onMessage: feedSlice.actions.wsMessage,
});

const ordersMiddleware = socketMiddleware({
  wsConnect: ordersSlice.actions.connect,
  wsDisconnect: ordersSlice.actions.disconnect,
  wsConnecting: ordersSlice.actions.wsConnecting,
  onOpen: ordersSlice.actions.wsOpen,
  onClose: ordersSlice.actions.wsClose,
  onError: ordersSlice.actions.wsError,
  onMessage: ordersSlice.actions.wsMessage,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(feedMiddleware, ordersMiddleware),
  });
};

export default setupStore;
