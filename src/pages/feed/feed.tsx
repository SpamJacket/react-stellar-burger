import { useMemo, useCallback, FC } from "react";
import { useSelector } from "../../services/hooks/hooks";

import styles from "./feed.module.css";

import OrdersList from "../../components/orders-list/orders-list";

const FeedPage: FC = () => {
  const { orders, status, total, totalToday } = useSelector(
    (store) => store.feed
  );

  const ordersNumberList = useCallback(
    (status: "done" | "pending" | "created") => {
      return orders.map(
        (order, index) =>
          index < 20 &&
          order.status === status && (
            <li
              key={order.number}
              className={status === "done" ? styles.doneNumber : styles.number}
            >
              {`000000${order.number}`.slice(-6)}
            </li>
          )
      );
    },
    [orders]
  );

  const ordersDoneNumberList = useMemo(() => {
    return ordersNumberList("done");
  }, [ordersNumberList]);

  const ordersPendingNumberList = useMemo(() => {
    return ordersNumberList("pending");
  }, [ordersNumberList]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Лента заказов</h2>
      <OrdersList />
      {status === "online" ? (
        <div className={styles.info}>
          <div className={styles.status}>
            <h4 className={styles.statusTitle}>Готовы:</h4>
            <ul className={styles.orders}>{ordersDoneNumberList}</ul>
          </div>
          <div className={styles.status}>
            <h4 className={styles.statusTitle}>В работе:</h4>
            <ul className={styles.orders}>{ordersPendingNumberList}</ul>
          </div>
          <div className={styles.total}>
            <h4 className={styles.totalTitle}>Выполнено за все время:</h4>
            <p className={styles.counter}>{total}</p>
          </div>
          <div className={styles.total}>
            <h4 className={styles.totalTitle}>Выполнено за сегодня:</h4>
            <p className={styles.counter}>{totalToday}</p>
          </div>
        </div>
      ) : (
        <div className={styles.loader}>
          <h2 className={styles.loaderTitle}>Идет подключение, подождите</h2>
          <p className={styles.loaderStatus}>{`Статус: ${status}`}</p>
        </div>
      )}
    </div>
  );
};

export default FeedPage;
