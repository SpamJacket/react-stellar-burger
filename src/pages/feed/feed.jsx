import OrdersList from "../../components/orders-list/orders-list";

import styles from "./feed.module.css";

const FeedPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Лента заказов</h2>
      <OrdersList />
      <div className={styles.info}>
        <div className={styles.status}>
          <h4 className={styles.statusTitle}>Готовы:</h4>
          <ul className={styles.orders}>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
            <li className={styles.doneNumber}>123456</li>
          </ul>
        </div>
        <div className={styles.status}>
          <h4 className={styles.statusTitle}>В работе:</h4>
          <ul className={styles.orders}>
            <li className={styles.number}>123456</li>
            <li className={styles.number}>123456</li>
            <li className={styles.number}>123456</li>
            <li className={styles.number}>123456</li>
            <li className={styles.number}>123456</li>
          </ul>
        </div>
        <div className={styles.total}>
          <h4 className={styles.totalTitle}>Выполнено за все время:</h4>
          <p className={styles.counter}>28752</p>
        </div>
        <div className={styles.total}>
          <h4 className={styles.totalTitle}>Выполнено за сегодня:</h4>
          <p className={styles.counter}>138</p>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
