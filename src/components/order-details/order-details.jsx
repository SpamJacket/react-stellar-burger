import styles from "./order-details.module.css";

import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { orderAcceptBackground } from "../../utils/constants.js";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { order } = useSelector((store) => store.orderDetails);

  return (
    <>
      {order && (
        <>
          <h4 className={styles.title}>{order.orderId}</h4>
          <h5 className={styles.subtitle}>идентификатор заказа</h5>
          {/* Не нашел другой способ взять фон для галочки */}
          <div className={styles.icon}>
            <CheckMarkIcon type="primary" />
            {orderAcceptBackground}
          </div>
          <p className={styles.description}>Ваш заказ начали готовить</p>
          <p className={styles.waitInfo}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </>
  );
};

export default OrderDetails;
