import { TWebSocketMiddleware, TWebSocketActions } from "../../utils/types";

const socketMiddleware = (
  wsActions: TWebSocketActions
): TWebSocketMiddleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsConnect.type) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        socket.onerror = () => {
          dispatch(onError("WebSocket error"));
        };

        socket.onmessage = (e) => {
          const { data } = e;
          const parseData = JSON.parse(data);

          dispatch(onMessage(parseData));
        };

        if (type === wsDisconnect.type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};

export default socketMiddleware;
