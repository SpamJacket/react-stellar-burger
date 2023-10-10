import { FC } from "react";
import { useSelector } from "../../services/hooks/hooks";

import styles from "./order-details.module.css";

import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { orderAcceptBackground } from "../../utils/constants";

const OrderDetails: FC = () => {
  const { order } = useSelector((store) => store.orderDetails);

  return (
    <>
      <h4 className={styles.title}>{order?.orderNumber}</h4>
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
  );
};

export default OrderDetails;
