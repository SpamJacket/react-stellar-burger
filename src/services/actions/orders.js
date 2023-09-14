import { ORDERS_CONNECT, ORDERS_DISCONNECT } from "../../utils/constants";

export const connect = (url) => ({
  type: ORDERS_CONNECT,
  payload: url,
});

export const disconnect = () => ({
  type: ORDERS_DISCONNECT,
});
