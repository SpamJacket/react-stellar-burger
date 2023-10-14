import { FC, useEffect, useCallback } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks/hooks";

import styles from "./orders-list.module.css";

import OrderElement from "../order-element/order-element";

import {
  connect as connectOrders,
  disconnect as disconnectOrders,
} from "../../services/actions/orders";
import {
  connect as connectFeed,
  disconnect as disconnectFeed,
} from "../../services/actions/feed";
import { BASE_WS_ORDERS_URL } from "../../utils/constants";

const OrdersList: FC = () => {
  const dispatch = useDispatch();
  const isPrivateList = useMatch("/profile/orders");
  const { orders, status } = useSelector(
    isPrivateList ? (store) => store.orders : (store) => store.feed
  );

  const connect = useCallback(
    isPrivateList
      ? (endpoint: string) =>
          dispatch(connectOrders(BASE_WS_ORDERS_URL + endpoint))
      : (endpoint: string) =>
          dispatch(connectFeed(BASE_WS_ORDERS_URL + endpoint)),
    [dispatch]
  );
  const disconnect = useCallback(
    isPrivateList
      ? () => dispatch(disconnectOrders())
      : () => dispatch(disconnectFeed()),
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
