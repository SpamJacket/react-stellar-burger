import { FC } from "react";
import styles from "./order-view.module.css";

import OrderView from "../../components/order-view/order-view";

const OrderViewPage: FC = () => {
  return (
    <div className={styles.container}>
      <OrderView isPage={true} />
    </div>
  );
};

export default OrderViewPage;
