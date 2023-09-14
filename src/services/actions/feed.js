import { FEED_CONNECT, FEED_DISCONNECT } from "../../utils/constants";

export const connect = (url) => ({
  type: FEED_CONNECT,
  payload: url,
});

export const disconnect = () => ({
  type: FEED_DISCONNECT,
});
