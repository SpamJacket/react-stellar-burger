import styles from "./order-view.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import OrderViewElement from "../order-view-element/order-view-element";

const OrderView = ({ isPage }) => {
  return (
    <div className={styles.container}>
      <h4 className={isPage ? styles.centerNumber : styles.number}>#123456</h4>
      <h3 className={styles.name}>Death Star Starship Main бургер</h3>
      <p className={styles.status}>Выполнен</p>
      <div className={styles.structure}>
        <h5 className={styles.title}>Состав:</h5>
        <ul className={styles.list}>
          <OrderViewElement />
          <OrderViewElement />
          <OrderViewElement />
          <OrderViewElement />
          <OrderViewElement />
        </ul>
      </div>
      <div className={styles.subtitle}>
        <p className={styles.time}>Сегодня, 16:20 i-GMT+3</p>
        <p className={styles.price}>
          <span className={styles.cost}>510</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

OrderView.defaultProps = {
  isPage: false,
};

export default OrderView;
