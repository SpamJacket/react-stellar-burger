import { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OrderElement from "../../components/order-element/order-element";

import styles from "./orders-list.module.css";

import {
  connect as connectOrders,
  disconnect as disconnectOrders,
} from "../../services/actions/orders";
import {
  connect as connectFeed,
  disconnect as disconnectFeed,
} from "../../services/actions/feed";
import { BASE_WS_ORDERS_URL } from "../../utils/constants";

const OrdersList = () => {
  const dispatch = useDispatch();
  const isPrivateList = useMatch("/profile/orders");
  const { orders } = useSelector(
    isPrivateList ? (store) => store.orders : (store) => store.feed
  );

  const connect = isPrivateList
    ? () =>
        dispatch(
          connectOrders(
            BASE_WS_ORDERS_URL +
              `?token=${localStorage
                .getItem("accessToken")
                .replace(/\bBearer \b/g, "")}`
          )
        )
    : () => dispatch(connectFeed(BASE_WS_ORDERS_URL + "/all"));
  const disconnect = isPrivateList
    ? () => dispatch(disconnectOrders())
    : () => dispatch(disconnectFeed());

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return (
    <>
      <ul className={isPrivateList ? styles.privateList : styles.list}>
        {orders.map((order) => (
          <OrderElement data={order} key={order.number} />
        ))}
      </ul>
    </>
  );
};

export default OrdersList;
