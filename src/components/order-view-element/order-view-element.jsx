import styles from "./order-view-element.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderViewElement = () => {
  return (
    <li className={styles.ingredient}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="https://code.s3.yandex.net/react/code/bun-01.png"
          alt="Флюоресцентная булка R2-D3"
        />
      </div>
      <p className={styles.name}>Флюоресцентная булка R2-D3</p>
      <p className={styles.price}>
        <span className={styles.cost}>2 x 20</span>
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
};

export default OrderViewElement;
