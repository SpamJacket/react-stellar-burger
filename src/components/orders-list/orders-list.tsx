import { FC, useEffect, useCallback } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks/hooks";

import styles from "./orders-list.module.css";

import OrderElement from "../order-element/order-element";

import { feedSlice } from "../../services/slices/feed";
import { ordersSlice } from "../../services/slices/orders";
import { BASE_WS_ORDERS_URL } from "../../utils/constants";

const OrdersList: FC = () => {
  const dispatch = useDispatch();
  const isPrivateList = useMatch("/react-stellar-burger/profile/orders");
  const { orders, status } = useSelector(
    isPrivateList ? (store) => store.orders : (store) => store.feed
  );

  const connect = useCallback(
    isPrivateList
      ? (endpoint: string) =>
          dispatch(ordersSlice.actions.connect(BASE_WS_ORDERS_URL + endpoint))
      : (endpoint: string) =>
          dispatch(feedSlice.actions.connect(BASE_WS_ORDERS_URL + endpoint)),
    [dispatch]
  );
  const disconnect = useCallback(
    isPrivateList
      ? () => dispatch(ordersSlice.actions.disconnect())
      : () => dispatch(feedSlice.actions.disconnect()),
    [dispatch]
  );

  useEffect(() => {
    const endpoint: string | null = isPrivateList
      ? `?token=${localStorage
          .getItem("accessToken")
          ?.replace(/\bBearer \b/g, "")}`
      : "/all";
    if (endpoint) {
      connect(endpoint);
    }

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <>
      {status === "online" ? (
        <ul className={isPrivateList ? styles.privateList : styles.list}>
          {orders.map((order) => (
            <OrderElement data={order} key={order.number} />
          ))}
        </ul>
      ) : (
        isPrivateList && (
          <div className={styles.loader}>
            <h2 className={styles.title}>Идет подключение, подождите</h2>
            <p className={styles.status}>{`Статус: ${status}`}</p>
          </div>
        )
      )}
    </>
  );
};

export default OrdersList;
