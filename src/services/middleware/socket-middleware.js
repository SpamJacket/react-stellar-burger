const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsDisconnect,
        // wsSendMessage,
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
        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }

        // if (type === wsSendMessage) {
        //   socket.send(JSON.stringify(action.payload));
        // }

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
      }

      next(action);
    };
  };
};

export default socketMiddleware;