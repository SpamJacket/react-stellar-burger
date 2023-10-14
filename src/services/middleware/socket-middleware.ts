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

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "WebSocket error" });
        };

        socket.onmessage = (e) => {
          const { data } = e;
          const parseData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parseData });
        };

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};

export default socketMiddleware;
