import { useSelector } from "react-redux";

import OrdersList from "../../components/orders-list/orders-list";

import styles from "./feed.module.css";

const FeedPage = () => {
  const { orders, total, totalToday } = useSelector((store) => store.feed);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Лента заказов</h2>
      <OrdersList />
      <div className={styles.info}>
        <div className={styles.status}>
          <h4 className={styles.statusTitle}>Готовы:</h4>
          <ul className={styles.orders}>
            {orders.map(
              (order, index) =>
                order.status === "done" &&
                index < 20 && (
                  <li key={order.number} className={styles.doneNumber}>
                    {`000000${order.number}`.slice(-6)}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={styles.status}>
          <h4 className={styles.statusTitle}>В работе:</h4>
          <ul className={styles.orders}>
            {orders.map(
              (order, index) =>
                order.status === "pending" &&
                index < 20 && (
                  <li key={order.number} className={styles.number}>
                    {`000000${order.number}`.slice(-6)}
                  </li>
                )
            )}
          </ul>
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
    </div>
  );
};

export default FeedPage;
